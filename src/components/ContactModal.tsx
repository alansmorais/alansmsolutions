import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  theme: Theme;
  initialPackage?: { packageName: string; price: string } | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  theme,
  initialPackage
}) => {
  const t = translations[currentLang]?.contactModal || translations.pl.contactModal;
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | 'warning' | ''>('');
  const formStartedAt = React.useRef(Date.now());

  useEffect(() => {
    if (isOpen) {
      formStartedAt.current = Date.now();
      setStatusText('');
      setStatusType('');
      if (initialPackage && initialPackage.packageName) {
        setMessage(prev => prev || `Dzień dobry, interesuje mnie pakiet/usługa: ${initialPackage.packageName} (${initialPackage.price || 'Wycena indywidualna'}). Moje szczegóły...`);
      }
    }
  }, [isOpen, initialPackage]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatusText(t.warnConsent);
      setStatusType('warning');
      return;
    }

    const duration = (Date.now() - formStartedAt.current) / 1000;
    if (duration < 2.5) {
      setStatusText(t.warnWait);
      setStatusType('warning');
      return;
    }

    setSubmitting(true);
    setStatusText('');

    const payload = {
      action: 'createLead',
      key: 'alan_admin_2026',
      nome: name,
      email: email,
      telefone: phone,
      origem: `AlanSM Web (${currentLang}) - ${initialPackage?.packageName || 'Zapytanie'}`,
      notas: `Pakiet: ${initialPackage?.packageName || 'Zapytanie ogólne'} | Szacunek: ${initialPackage?.price || 'Wycena'} | Język: ${currentLang} | Wiadomość: ${message}`,
      packageName: initialPackage?.packageName || 'Zapytanie ogólne',
      estimatedPrice: initialPackage?.price || '',
      message,
      lang: currentLang
    };

    try {
      const scriptUrl = (import.meta as any).env.VITE_CONTACT_API_URL || 'https://script.google.com/macros/s/AKfycbyqSx9ThK0tfEuGeSay0jJATaA_ZiUeoj-Ag_gEtvG94mMNX_s0z_A4H2CI4_Oql2ynDg/exec';
      
      // Save locally first for the dashboard
      const newLead = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        packageName: initialPackage?.packageName || 'Zapytanie ogólne',
        estimatedPrice: initialPackage?.price || '',
        message,
        status: 'new'
      };
      const existingLeads = JSON.parse(localStorage.getItem('website_leads') || '[]');
      localStorage.setItem('website_leads', JSON.stringify([newLead, ...existingLeads]));

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      setStatusText(t.success);
      setStatusType('success');
      setTimeout(() => {
        onClose();
      }, 2400);
    } catch (err) {
      setStatusText(t.error);
      setStatusType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className={`border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`flex justify-between items-center px-5 py-3.5 border-b ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.title}</h3>
            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {initialPackage?.packageName ? `${t.regarding} ${initialPackage.packageName}` : t.subtitle}
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className={`p-1 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className={`block text-[10px] font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.nameLabel}
            </label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`} 
              placeholder={t.namePlaceholder}
            />
          </div>

          <div>
            <label className={`block text-[10px] font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.emailLabel}
            </label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`} 
              placeholder={t.emailPlaceholder}
            />
          </div>

          <div>
            <label className={`block text-[10px] font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.phoneLabel}
            </label>
            <input 
              type="text" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`} 
              placeholder={t.phonePlaceholder}
            />
          </div>

          <div>
            <label className={`block text-[10px] font-semibold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.msgLabel}
            </label>
            <textarea 
              rows={3} 
              required 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 resize-none transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`} 
              placeholder={t.msgPlaceholder}
            />
          </div>

          <label className={`flex items-start gap-2 text-[11px] cursor-pointer ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <input 
              type="checkbox" 
              required 
              checked={consent} 
              onChange={e => setConsent(e.target.checked)}
              className="mt-0.5 accent-blue-600 rounded" 
            />
            <span>{t.consent}</span>
          </label>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
          >
            {submitting ? t.submitting : t.submit}
          </button>

          {statusText && (
            <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
              statusType === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
              statusType === 'warning' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
              'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {statusType === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusText}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
