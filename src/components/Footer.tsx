import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, MapPin } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface FooterProps {
  currentLang: Language;
  theme: Theme;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  theme,
  onOpenLegal,
  onOpenContact
}) => {
  const t = translations[currentLang]?.footer || translations.pl.footer;
  const navT = translations[currentLang]?.nav || translations.pl.nav;
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t text-xs transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <img 
              src="https://raw.githubusercontent.com/alansmorais/alans.morais/main/images/logo.svg" 
              alt="AlanSM Solutions logo" 
              className={`w-7 h-7 rounded-full object-cover ${
                isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-300'
              }`} 
            />
            <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>AlanSM Solutions</span>
          </div>
          <p className={`max-w-sm leading-relaxed text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.about}
          </p>
          <div className="flex items-center gap-3 pt-1">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/alandasm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0a66c2] hover:opacity-80 transition-opacity" 
              aria-label="LinkedIn Alan da Silva Morais" 
              title="LinkedIn: /in/alandasm"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Instagram @alanmoraissss */}
            <a 
              href="https://www.instagram.com/alanmoraissss/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-pink-500 hover:opacity-80 transition-opacity" 
              aria-label="Instagram Alan Morais" 
              title="Instagram: @alanmoraissss"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Facebook Alan Morais */}
            <a 
              href="https://www.facebook.com/alankmorais" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#1877f2] hover:opacity-80 transition-opacity" 
              aria-label="Facebook Alan Morais" 
              title="Facebook: Alan Morais"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* Email */}
            <a 
              href="mailto:kontakt@alansmsolutions.com" 
              className="text-blue-500 hover:opacity-80 transition-opacity" 
              aria-label="Email kontakt@alansmsolutions.com" 
              title="kontakt@alansmsolutions.com"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className={`font-bold text-[11px] uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.navTitle}
          </h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="#solutions" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.solutions}</a></li>
            <li><a href="#segments" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.segments}</a></li>
            <li><a href="#roi" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.roi}</a></li>
            <li><a href="#wizard" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.wizard}</a></li>
            <li><a href="#work" className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.work}</a></li>
            <li><button onClick={() => onOpenContact('offer', 'introductory_offer')} className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>{navT.contact}</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className={`font-bold text-[11px] uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.contactTitle}
          </h4>
          <p className="flex items-center gap-1.5 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" /> {navT.location}
          </p>
          <p className="flex items-center gap-1.5 text-[11px]">
            <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" /> {navT.email}
          </p>
          <div className="pt-1">
            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold border border-emerald-500/20">
              {t.available}
            </span>
          </div>
        </div>
      </div>

      <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] ${
        isDark ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p>© 2026 AlanSM Solutions. {t.rights}</p>
        <div className="flex items-center gap-4">
          <button onClick={() => onOpenLegal('terms')} className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
            {t.terms}
          </button>
          <button onClick={() => onOpenLegal('privacy')} className={isDark ? 'hover:text-white' : 'hover:text-blue-600'}>
            {t.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
};
