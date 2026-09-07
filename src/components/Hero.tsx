import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, TrendingUp, Cpu, Smartphone } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface HeroProps {
  currentLang: Language;
  theme: Theme;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, theme, onOpenContact }) => {
  const t = translations[currentLang]?.hero || translations.pl.hero;
  const isDark = theme === 'dark';

  return (
    <section className="relative overflow-hidden pt-2 pb-6 md:pt-4 md:pb-8 text-center max-w-5xl mx-auto px-4 sm:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />

      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 shadow-2xs transition-colors ${
        isDark 
          ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
          : 'bg-blue-50 border border-blue-200 text-blue-700'
      }`}>
        <Sparkles className="w-3.5 h-3.5" /> {t.badge}
      </div>

      <h1 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.14] mb-3 transition-colors ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        {t.title1} <br />
        <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent">
          {t.title2}
        </span>
      </h1>

      <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-5 transition-colors ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {t.desc}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-7">
        <a 
          href="#solutions" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-md shadow-blue-600/20 group"
        >
          {t.exploreBtn} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <button 
          type="button" 
          onClick={() => onOpenContact('offer', 'introductory_offer')}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
            isDark 
              ? 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200' 
              : 'bg-white hover:bg-slate-50 border border-slate-300 text-slate-800'
          }`}
        >
          {t.consultBtn}
        </button>
      </div>

      {/* Visual App Interface Mockup Preview */}
      <div className="relative mx-auto max-w-3xl mb-6">
        <div className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-all ${
          isDark 
            ? 'bg-slate-950 border-slate-800/80 shadow-blue-950/40' 
            : 'bg-white border-slate-200 shadow-slate-300/60'
        }`}>
          {/* Mockup Browser/App Header Bar */}
          <div className={`flex items-center justify-between px-4 py-2 border-b text-[11px] ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-[10px] hidden sm:inline">alansmsolutions.com/dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 0% Prowizji Aktywne
            </div>
          </div>

          {/* Mockup Body Preview */}
          <div className="relative h-56 sm:h-72 md:h-96 w-full overflow-hidden bg-slate-950">
            <img 
              src="https://raw.githubusercontent.com/alansmorais/alans.morais/refs/heads/main/images/clinic_klinika_dashboard_admin.png" 
              alt="AlanSM Solutions Panel Administracyjny i Dashboard Systemu Rezerwacji Kliniki" 
              loading="eager"
              className="w-full h-full object-cover object-top opacity-95 transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isDark ? 'from-[#090d16] via-[#090d16]/20 to-transparent' : 'from-white via-white/10 to-transparent'
            }`} />

            {/* Floating Live Metric Cards on the Image */}
            <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
              <div className={`p-2.5 rounded-xl border backdrop-blur-md flex-1 text-left ${
                isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900 shadow-md'
              }`}>
                <div className="flex items-center gap-1.5 text-blue-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  <TrendingUp className="w-3 h-3" /> Własny DeliveryHub
                </div>
                <div className="text-xs sm:text-sm font-extrabold">+100% Retencji Klientów</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Bez pośredników i prowizji</div>
              </div>

              <div className={`p-2.5 rounded-xl border backdrop-blur-md flex-1 text-left ${
                isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900 shadow-md'
              }`}>
                <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Rezerwacje Online
                </div>
                <div className="text-xs sm:text-sm font-extrabold">24/7 Zapisy Klientów</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Automatyczne SMS & WhatsApp</div>
              </div>

              <div className={`p-2.5 rounded-xl border backdrop-blur-md flex-1 text-left hidden md:block ${
                isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900 shadow-md'
              }`}>
                <div className="flex items-center gap-1.5 text-purple-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  <Cpu className="w-3 h-3" /> CRM & Integracje
                </div>
                <div className="text-xs sm:text-sm font-extrabold">Auto-Synchronizacja</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Płatności i bazy danych</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`pt-4 border-t grid grid-cols-2 md:grid-cols-3 gap-3 text-left max-w-3xl mx-auto ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.stat1Title}</p>
            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.stat1Desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.stat2Title}</p>
            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.stat2Desc}</p>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.stat3Title}</p>
            <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.stat3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
