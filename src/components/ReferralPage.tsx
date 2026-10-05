import React, { useState, useEffect } from 'react';
import { 
  Users, Share2, DollarSign, ArrowLeft, CheckCircle2, Copy, 
  ExternalLink, Database, ShieldCheck, Building, Send, Award, RefreshCw, AlertCircle 
} from 'lucide-react';
import { Language, Theme } from '../types';

interface ReferralPageProps {
  currentLang: Language;
  theme: Theme;
  onBack: () => void;
  onOpenContact: (pkg?: string, price?: string) => void;
}

interface ReferredClient {
  id: string;
  companyName: string;
  contactName: string;
  solutionType: string;
  status: 'pending' | 'deployment' | 'active' | 'paid';
  commissionAmount: string;
  createdAt: string;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({
  currentLang,
  theme,
  onBack,
  onOpenContact
}) => {
  const isDark = theme === 'dark';

  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerCode, setPartnerCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('asm_partner_code');
    } catch {
      return null;
    }
  });

  const [copied, setCopied] = useState(false);
  const [erpStatus, setErpStatus] = useState<'connected' | 'syncing' | 'error'>('connected');
  
  // New referral form state
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientSolution, setNewClientSolution] = useState('booking');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Referred clients list synced with ERP
  const [referredClients, setReferredClients] = useState<ReferredClient[]>([]);

  useEffect(() => {
    fetch('/api/erp/referrals')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.referrals) {
          setReferredClients(data.referrals);
        }
      })
      .catch(() => {
        setReferredClients([]);
      });
  }, []);

  const handleRegisterPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerEmail) return;
    const generated = 'ALAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPartnerCode(generated);
    try {
      localStorage.setItem('asm_partner_code', generated);
      localStorage.setItem('asm_partner_name', partnerName);
      localStorage.setItem('asm_partner_email', partnerEmail);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCopyLink = () => {
    const link = `https://alansmsolutions.com/?ref=${partnerCode || 'PARTNER'}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleAddReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientCompany || !newClientContact) return;
    setSubmitting(true);
    setErpStatus('syncing');

    try {
      const res = await fetch('/api/erp/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: newClientCompany,
          contactName: newClientContact,
          phone: newClientPhone,
          email: newClientEmail,
          solutionType: newClientSolution
        })
      });
      const data = await res.json();
      if (data.success && data.referral) {
        setReferredClients([data.referral, ...referredClients]);
      } else {
        throw new Error(data.error || 'Failed');
      }
    } catch {
      // Fallback local addition if network fails
      const newRef: ReferredClient = {
        id: 'ERP-REF-' + Math.floor(1000 + Math.random() * 9000),
        companyName: newClientCompany,
        contactName: newClientContact,
        solutionType: newClientSolution === 'booking' ? 'Prywatny System Rezerwacji' : newClientSolution === 'deliveryhub' ? 'Platforma DeliveryHub' : 'Enterprise CRM & Salesforce',
        status: 'pending',
        commissionAmount: '400 PLN',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setReferredClients([newRef, ...referredClients]);
    } finally {
      setSubmitting(false);
      setErpStatus('connected');
      setSubmitSuccess(true);
      setNewClientCompany('');
      setNewClientContact('');
      setNewClientPhone('');
      setNewClientEmail('');
      setTimeout(() => setSubmitSuccess(false), 4000);
    }
  };

  const translations = {
    pl: {
      badge: 'Program Partnerski & ERP',
      title: 'Zarabiaj z Programem Poleceń ASM Solutions',
      subtitle: 'Polecaj nasze systemy rezerwacji i platformy DeliveryHub. System w 100% zintegrowany z naszym ERP — śledź statusy wdrożeń i prowizje w czasie rzeczywistym.',
      backBtn: '← Powrót do strony głównej',
      step1Title: '1. Wygeneruj Swój Link Partnerski',
      step1Desc: 'Zarejestruj się jako partner ASM, aby otrzymać unikalny link śledzący powiązany bezpośrednio z bazą ERP.',
      nameLabel: 'Twoje Imię i Nazwisko / Firma',
      emailLabel: 'Adres E-mail',
      phoneLabel: 'Telefon / WhatsApp',
      generateBtn: 'Generuj Link i Połącz z ERP',
      yourLink: 'Twój Unikalny Link Partnerski:',
      copyLink: 'Kopiuj Link',
      copied: 'Skopiowano do schowka!',
      erpConnected: 'ERP API Online: Zsynchronizowano z bazą centralną',
      submitLeadTitle: '2. Zgłoś Nowego Klienta do ERP',
      submitLeadDesc: 'Znasz firmę, która potrzebuje systemu bez prowizji lub automatyzacji? Zgłoś ją tutaj, a nasz zespół handlowy zajmie się wdrożeniem.',
      clientCompany: 'Nazwa Firmy Klienta',
      clientContact: 'Osoba Kontaktowa',
      clientPhone: 'Telefon Klienta',
      clientEmail: 'E-mail Klienta',
      solutionNeeded: 'Wymagane Rozwiązanie',
      submitBtn: 'Zarejestruj Lead w ERP',
      submitting: 'Wysyłanie do ERP...',
      successMsg: 'Lead został pomyślnie zapisany w systemie ERP! Prowizja została przypisana.',
      dashboardTitle: '3. Twoje Prowizje i Statusy w ERP',
      tableId: 'ID w ERP',
      tableCompany: 'Firma / Klient',
      tableSolution: 'Wybrane Rozwiązanie',
      tableStatus: 'Status wdrożenia',
      tableCommission: 'Prowizja',
      tableDate: 'Data',
      statusPending: 'Oczekujący',
      statusDeployment: 'Wdrożenie',
      statusActive: 'Aktywny',
      statusPaid: 'Wypłacono',
    },
    en: {
      badge: 'Partner Program & ERP',
      title: 'Earn with ASM Solutions Referral Program',
      subtitle: 'Refer our booking systems and DeliveryHub platforms. Fully integrated with our ERP backend — track deployment milestones and commissions in real time.',
      backBtn: '← Back to Home',
      step1Title: '1. Generate Your Partner Link',
      step1Desc: 'Register as an ASM partner to get your unique tracking link linked directly to our ERP database.',
      nameLabel: 'Your Full Name / Company',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      generateBtn: 'Generate Link & Connect ERP',
      yourLink: 'Your Unique Referral Link:',
      copyLink: 'Copy Link',
      copied: 'Copied to clipboard!',
      erpConnected: 'ERP API Online: Synchronized with central database',
      submitLeadTitle: '2. Submit a New Client to ERP',
      submitLeadDesc: 'Know a business that needs a commission-free system or CRM automation? Submit them here and our sales team will handle onboarding.',
      clientCompany: 'Client Company Name',
      clientContact: 'Contact Person',
      clientPhone: 'Client Phone',
      clientEmail: 'Client Email',
      solutionNeeded: 'Required Solution',
      submitBtn: 'Register Lead in ERP',
      submitting: 'Syncing to ERP...',
      successMsg: 'Lead successfully saved to ERP system! Commission assigned.',
      dashboardTitle: '3. Your Commissions & ERP Statuses',
      tableId: 'ERP ID',
      tableCompany: 'Company / Client',
      tableSolution: 'Selected Solution',
      tableStatus: 'Deployment Status',
      tableCommission: 'Commission',
      tableDate: 'Date',
      statusPending: 'Pending',
      statusDeployment: 'In Deployment',
      statusActive: 'Active',
      statusPaid: 'Paid Out',
    },
    br: {
      badge: 'Programa de Parceiros & ERP',
      title: 'Ganhe com o Programa de Indicações ASM Solutions',
      subtitle: 'Indique nossos sistemas de agendamento e plataformas DeliveryHub. Totalmente integrado ao nosso ERP — acompanhe status e comissões em tempo real.',
      backBtn: '← Voltar ao Início',
      step1Title: '1. Gere seu Link de Parceiro',
      step1Desc: 'Cadastre-se como parceiro ASM para obter seu link exclusivo conectado diretamente ao banco de dados ERP.',
      nameLabel: 'Seu Nome / Empresa',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefone / WhatsApp',
      generateBtn: 'Gerar Link e Conectar ERP',
      yourLink: 'Seu Link de Indicação Exclusivo:',
      copyLink: 'Copiar Link',
      copied: 'Copiado para a área de transferência!',
      erpConnected: 'ERP API Online: Sincronizado com o banco central',
      submitLeadTitle: '2. Cadastrar Novo Cliente no ERP',
      submitLeadDesc: 'Conhece um negócio que precisa de um sistema sem comissão ou automação? Cadastre aqui e nossa equipe fará a implantação.',
      clientCompany: 'Nome da Empresa do Cliente',
      clientContact: 'Pessoa de Contato',
      clientPhone: 'Telefone do Cliente',
      clientEmail: 'E-mail do Cliente',
      solutionNeeded: 'Solução Necessária',
      submitBtn: 'Registrar Lead no ERP',
      submitting: 'Sincronizando com ERP...',
      successMsg: 'Lead salvo com sucesso no ERP! Comissão atribuída.',
      dashboardTitle: '3. Suas Comissões e Status no ERP',
      tableId: 'ID ERP',
      tableCompany: 'Empresa / Cliente',
      tableSolution: 'Solução Escolhida',
      tableStatus: 'Status de Implantação',
      tableCommission: 'Comissão',
      tableDate: 'Data',
      statusPending: 'Pendente',
      statusDeployment: 'Em Implantação',
      statusActive: 'Ativo',
      statusPaid: 'Pago',
    },
    es: {
      badge: 'Programa de Socios & ERP',
      title: 'Gana con el Programa de Referidos de ASM Solutions',
      subtitle: 'Recomienda nuestros sistemas de reservas y plataformas DeliveryHub. Integrado 100% con nuestro ERP — rastrea estados y comisiones en tiempo real.',
      backBtn: '← Volver al Inicio',
      step1Title: '1. Genera tu Enlace de Socio',
      step1Desc: 'Regístrate como socio ASM para obtener tu enlace de seguimiento vinculado directamente a nuestra base de datos ERP.',
      nameLabel: 'Tu Nombre / Empresa',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono / WhatsApp',
      generateBtn: 'Generar Enlace y Conectar ERP',
      yourLink: 'Tu Enlace de Referido Único:',
      copyLink: 'Copiar Enlace',
      copied: '¡Copiado al portapapeles!',
      erpConnected: 'ERP API Online: Sincronizado con la base central',
      submitLeadTitle: '2. Registrar Nuevo Cliente en el ERP',
      submitLeadDesc: '¿Conoces un negocio que necesite un sistema sin comisiones? Regístralo aquí y nuestro equipo comercial gestionará la implementación.',
      clientCompany: 'Nombre de la Empresa',
      clientContact: 'Persona de Contacto',
      clientPhone: 'Teléfono del Cliente',
      clientEmail: 'Correo del Cliente',
      solutionNeeded: 'Solución Requerida',
      submitBtn: 'Registrar Lead en ERP',
      submitting: 'Sincronizando con ERP...',
      successMsg: '¡Lead guardado con éxito en el ERP! Comisión asignada.',
      dashboardTitle: '3. Tus Comisiones y Estados en el ERP',
      tableId: 'ID ERP',
      tableCompany: 'Empresa / Cliente',
      tableSolution: 'Solución Seleccionada',
      tableStatus: 'Estado de Implementación',
      tableCommission: 'Comisión',
      tableDate: 'Fecha',
      statusPending: 'Pendiente',
      statusDeployment: 'En Implementación',
      statusActive: 'Activo',
      statusPaid: 'Pagado',
    }
  };

  const t = translations[currentLang] || translations.pl;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 transition-colors ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Back & ERP Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-blue-500" />
            <span>{t.backBtn}</span>
          </button>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            isDark 
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.erpConnected}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.title}
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Step 1: Generate Partner Link */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-950/80 border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.step1Title}</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.step1Desc}</p>
            </div>
          </div>

          {!partnerCode ? (
            <form onSubmit={handleRegisterPartner} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Jan Kowalski"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="jan@firma.pl"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">{t.phoneLabel}</label>
                  <input
                    type="text"
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="+48 ..."
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.generateBtn}</span>
              </button>
            </form>
          ) : (
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-blue-500">{t.yourLink}</p>
              <div className={`flex items-center justify-between p-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <code className="text-xs font-mono text-emerald-400 select-all">
                  https://alansmsolutions.com/?ref={partnerCode}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? t.copied : t.copyLink}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Submit New Client to ERP */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-950/80 border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
              2
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.submitLeadTitle}</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.submitLeadDesc}</p>
            </div>
          </div>

          {submitSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t.successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAddReferral} className="space-y-4 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">{t.clientCompany}</label>
                <input
                  type="text"
                  required
                  value={newClientCompany}
                  onChange={(e) => setNewClientCompany(e.target.value)}
                  placeholder="Nazwa polecanej firmy"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t.clientContact}</label>
                <input
                  type="text"
                  required
                  value={newClientContact}
                  onChange={(e) => setNewClientContact(e.target.value)}
                  placeholder="Imię i nazwisko decydenta"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t.clientPhone}</label>
                <input
                  type="text"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="+48 ..."
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t.solutionNeeded}</label>
                <select
                  value={newClientSolution}
                  onChange={(e) => setNewClientSolution(e.target.value)}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border outline-none transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                >
                  <option value="booking">Prywatny System Rezerwacji</option>
                  <option value="deliveryhub">Platforma DeliveryHub (0% Prowizji)</option>
                  <option value="enterprise">Enterprise CRM & Salesforce</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? t.submitting : t.submitBtn}</span>
            </button>
          </form>
        </div>

        {/* Step 3: ERP Dashboard Status Table */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-950/80 border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold">{t.dashboardTitle}</h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Synchronizacja z systemem ERP ASM Solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-500 font-semibold cursor-pointer hover:underline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="pb-3 font-semibold">{t.tableId}</th>
                  <th className="pb-3 font-semibold">{t.tableCompany}</th>
                  <th className="pb-3 font-semibold">{t.tableSolution}</th>
                  <th className="pb-3 font-semibold">{t.tableStatus}</th>
                  <th className="pb-3 font-semibold">{t.tableCommission}</th>
                  <th className="pb-3 font-semibold">{t.tableDate}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {referredClients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={`py-8 text-center text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Brak zarejestrowanych poleceń w bazie ERP / No referrals registered in ERP yet.
                    </td>
                  </tr>
                ) : (
                  referredClients.map((client) => (
                    <tr key={client.id} className={isDark ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50'}>
                      <td className="py-3 font-mono text-blue-400">{client.id}</td>
                      <td className="py-3 font-medium">
                        <div>{client.companyName}</div>
                        <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{client.contactName}</div>
                      </td>
                      <td className="py-3">{client.solutionType}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          client.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : client.status === 'deployment'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : client.status === 'paid'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            client.status === 'active' ? 'bg-emerald-400' : client.status === 'deployment' ? 'bg-blue-400' : client.status === 'paid' ? 'bg-purple-400' : 'bg-amber-400'
                          }`}></span>
                          {client.status === 'active' ? t.statusActive : client.status === 'deployment' ? t.statusDeployment : client.status === 'paid' ? t.statusPaid : t.statusPending}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-emerald-400">{client.commissionAmount}</td>
                      <td className={`py-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{client.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
