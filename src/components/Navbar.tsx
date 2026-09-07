import React, { useState } from 'react';
import { Menu, X, Globe, ArrowRight, Instagram, Facebook, Linkedin, Mail, MapPin, Sun, Moon } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenContact
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang]?.nav || translations.pl.nav;

  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
      isDark 
        ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800' 
        : 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs'
    }`}>
      {/* Top Info Bar */}
      <div className={`text-[11px] py-1 px-4 sm:px-6 transition-colors border-b ${
        isDark 
          ? 'bg-slate-950 text-slate-400 border-slate-800/80' 
          : 'bg-slate-50 text-slate-600 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-500" /> {t.email}
            </span>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" /> {t.location}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/alandasm" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-1 transition-colors text-[11px] font-medium ${
                isDark ? 'hover:text-blue-400' : 'hover:text-blue-600 text-slate-700'
              }`}
              title="Alan da Silva Morais on LinkedIn"
            >
              <Linkedin className="w-3 h-3 text-[#0a66c2]" /> LinkedIn
            </a>

            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>

            {/* Instagram @alanmoraissss */}
            <a 
              href="https://www.instagram.com/alanmoraissss/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-1 transition-colors text-[11px] font-medium ${
                isDark ? 'hover:text-pink-400' : 'hover:text-pink-600 text-slate-700'
              }`}
              title="@alanmoraissss on Instagram"
            >
              <Instagram className="w-3 h-3 text-pink-500" /> @alanmoraissss
            </a>

            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>

            {/* Facebook Alan Morais */}
            <a 
              href="https://www.facebook.com/alankmorais" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center gap-1 transition-colors text-[11px] font-medium ${
                isDark ? 'hover:text-blue-400' : 'hover:text-blue-600 text-slate-700'
              }`}
              title="Alan Morais on Facebook"
            >
              <Facebook className="w-3 h-3 text-[#1877f2]" /> Alan Morais
            </a>

            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs'
              }`}
              title={isDark ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Jasny</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-slate-700" />
                  <span>Ciemny</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <img 
            src="https://raw.githubusercontent.com/alansmorais/alans.morais/main/images/logo.svg" 
            alt="AlanSM Solutions logo" 
            className={`w-7.5 h-7.5 rounded-full object-cover transition-transform group-hover:scale-105 ${
              isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-300'
            }`} 
          />
          <div className="flex flex-col">
            <span className={`text-sm font-bold tracking-tight transition-colors ${
              isDark ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              AlanSM Solutions
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className={`hidden md:flex items-center gap-5 text-xs font-medium ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <a href="#solutions" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.solutions}</a>
          <a href="#segments" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.segments}</a>
          <a href="#roi" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.roi}</a>
          <a href="#wizard" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.wizard}</a>
          <a href="#work" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.work}</a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className={`hidden sm:flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-2 py-0.75 transition-colors ${
            isDark ? 'bg-slate-900 border border-slate-800 text-slate-400' : 'bg-slate-100 border border-slate-200 text-slate-600'
          }`}>
            <Globe className="w-3 h-3 text-blue-500" />
            <button 
              onClick={() => onLanguageChange('pl')} 
              className={`transition-colors ${currentLang === 'pl' ? 'text-blue-500 font-bold' : isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              PL
            </button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>/</span>
            <button 
              onClick={() => onLanguageChange('en')} 
              className={`transition-colors ${currentLang === 'en' ? 'text-blue-500 font-bold' : isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              EN
            </button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>/</span>
            <button 
              onClick={() => onLanguageChange('br')} 
              className={`transition-colors ${currentLang === 'br' ? 'text-blue-500 font-bold' : isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              BR
            </button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>/</span>
            <button 
              onClick={() => onLanguageChange('es')} 
              className={`transition-colors ${currentLang === 'es' ? 'text-blue-500 font-bold' : isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              ES
            </button>
          </div>

          <button 
            type="button" 
            onClick={() => onOpenContact('offer', 'introductory_offer')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs"
          >
            {t.contact} <ArrowRight className="w-3 h-3" />
          </button>

          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`md:hidden p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-5 py-4 space-y-2.5 transition-colors ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className={`block text-xs font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>{t.solutions}</a>
          <a href="#segments" onClick={() => setMobileMenuOpen(false)} className={`block text-xs font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>{t.segments}</a>
          <a href="#roi" onClick={() => setMobileMenuOpen(false)} className={`block text-xs font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>{t.roi}</a>
          <a href="#wizard" onClick={() => setMobileMenuOpen(false)} className={`block text-xs font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>{t.wizard}</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className={`block text-xs font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'}`}>{t.work}</a>
          
          <div className={`pt-2.5 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button onClick={() => { onLanguageChange('pl'); setMobileMenuOpen(false); }} className={currentLang === 'pl' ? 'text-blue-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>PL</button>
              <button onClick={() => { onLanguageChange('en'); setMobileMenuOpen(false); }} className={currentLang === 'en' ? 'text-blue-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>EN</button>
              <button onClick={() => { onLanguageChange('br'); setMobileMenuOpen(false); }} className={currentLang === 'br' ? 'text-blue-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>BR</button>
              <button onClick={() => { onLanguageChange('es'); setMobileMenuOpen(false); }} className={currentLang === 'es' ? 'text-blue-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>ES</button>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenContact('offer', 'introductory_offer'); }} 
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              {t.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
