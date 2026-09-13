import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, X, MessageSquare, Send } from 'lucide-react';
import { Theme, Language } from '../types';

interface FloatingContactProps {
  theme: Theme;
  currentLang: Language;
  onOpenContact: (pkg?: string, price?: string) => void;
  zohoEnabled: boolean;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({
  theme,
  currentLang,
  onOpenContact,
  zohoEnabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const isDark = theme === 'dark';

  // WhatsApp configuration - Uses env variable or placeholder
  const whatsappNumber = (import.meta as any).env.VITE_WHATSAPP_NUMBER || '5512999999999'; 
  const whatsappMessage = currentLang === 'pl' ? 'Cześć! Chciałbym zapytać o ofertę AlanSM Solutions.' : 
                          currentLang === 'br' ? 'Olá! Gostaria de saber mais sobre as soluções da AlanSM.' :
                          currentLang === 'es' ? '¡Hola! Me gustaría saber más sobre las soluciones de AlanSM.' :
                          'Hi! I would like to know more about AlanSM Solutions.';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-3 mb-2 animate-in slide-in-from-bottom-4 duration-300">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}>
              WhatsApp
            </span>
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95">
              <Phone className="w-6 h-6" />
            </div>
          </a>

          {/* Contact Form Button */}
          <button
            onClick={() => {
              onOpenContact();
              setIsOpen(false);
            }}
            className="group flex items-center gap-3"
          >
            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
              isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            }`}>
              {currentLang === 'pl' ? 'Wyślij wiadomość' : currentLang === 'br' ? 'Enviar Mensagem' : 'Send Message'}
            </span>
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95">
              <Send className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <div className="relative">
        {showPulse && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-50">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
          </span>
        )}
        
        {/* Live Indicator */}
        {!isOpen && (
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              {currentLang === 'pl' ? 'Jesteśmy dostępni' : currentLang === 'br' ? 'Estamos online' : 'We are online'}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90' 
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        </button>
      </div>
    </div>
  );
};
