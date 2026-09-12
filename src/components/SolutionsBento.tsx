import React from 'react';
import { Globe, Calendar, Bike, Utensils, Receipt, Cpu, ArrowRight } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface SolutionsBentoProps {
  currentLang: Language;
  theme: Theme;
  onOpenContact: (pkg?: string, price?: string) => void;
  onSelectSolution?: (solutionId: 'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm') => void;
}

export const SolutionsBento: React.FC<SolutionsBentoProps> = ({ currentLang, theme, onOpenContact, onSelectSolution }) => {
  const t = translations[currentLang]?.solutions || translations.pl.solutions;
  const isDark = theme === 'dark';

  const icons = [Globe, Calendar, Bike, Utensils, Receipt, Cpu];

  const detailsLabels: Record<Language, string> = {
    pl: 'Zobacz ofertę',
    en: 'View offer details',
    br: 'Ver detalhes',
    es: 'Ver detalles'
  };

  
  // High quality relevant visuals for each solution
  const solutionImages = [
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      alt: 'Tworzenie nowoczesnych stron WWW i landing page dla firm',
    },
    {
      url: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=600&auto=format&fit=crop',
      alt: 'System rezerwacji online i kalendarz wizyt',
    },
    {
      url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=600&auto=format&fit=crop',
      alt: 'Platforma DeliveryHub zamówienia jedzenia z dostawą 0% prowizji',
    },
    {
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
      alt: 'Cyfrowe menu QR i systemy restauracyjne',
    },
    {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
      alt: 'Automatyzacja fakturowania i finansów w firmie',
    },
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
      alt: 'Integracja CRM Salesforce i zaawansowane automatyzacje',
    }
  ];

  const colorThemes = [
    { dark: 'text-blue-400 bg-blue-500/10 border-blue-500/20', light: 'text-blue-600 bg-blue-50 border-blue-200' },
    { dark: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', light: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { dark: 'text-orange-400 bg-orange-500/10 border-orange-500/20', light: 'text-orange-600 bg-orange-50 border-orange-200' },
    { dark: 'text-amber-400 bg-amber-500/10 border-amber-500/20', light: 'text-amber-600 bg-amber-50 border-amber-200' },
    { dark: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', light: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { dark: 'text-purple-400 bg-purple-500/10 border-purple-500/20', light: 'text-purple-600 bg-purple-50 border-purple-200' },
  ];

  return (
    <section id="solutions" className="py-6 md:py-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="max-w-xl mb-5">
        <h2 className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-1.5">{t.badge}</h2>
        <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.items.map((item, idx) => {
          const IconComponent = icons[idx] || Globe;
          const colorClass = isDark ? colorThemes[idx].dark : colorThemes[idx].light;
          const imgData = solutionImages[idx];

          return (
            <div 
              key={idx}
              onClick={() => {
                if (onSelectSolution) {
                  if (idx === 0) onSelectSolution('website');
                  else if (idx === 1) onSelectSolution('booking');
                  else if (idx === 2) onSelectSolution('deliveryhub');
                  else if (idx === 3) onSelectSolution('restaurant');
                  else if (idx === 4) onSelectSolution('tracking');
                  else if (idx === 5) onSelectSolution('crm');
                }
              }}
              className={`border rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 group ${
                onSelectSolution ? 'cursor-pointer' : ''
              } ${
                isDark 
                  ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Solution Card Visual Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={imgData?.url} 
                    alt={imgData?.alt || item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-slate-950 via-slate-950/40 to-transparent' : 'from-white via-white/30 to-transparent'
                  }`} />
                  
                  {/* Floating Icon Badge */}
                  <div className={`absolute bottom-2.5 left-3.5 w-8 h-8 rounded-lg border flex items-center justify-center backdrop-blur-md shadow-sm ${colorClass}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 pt-3">
                  <h4 className={`text-base font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4">
                {onSelectSolution ? (
                  <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-850">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (idx === 0) onSelectSolution('website');
                        else if (idx === 1) onSelectSolution('booking');
                        else if (idx === 2) onSelectSolution('deliveryhub');
                        else if (idx === 3) onSelectSolution('restaurant');
                        else if (idx === 4) onSelectSolution('tracking');
                        else if (idx === 5) onSelectSolution('crm');
                      }}
                      className="text-xs font-bold text-blue-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{detailsLabels[currentLang] || detailsLabels.pl}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenContact(item.action, 'custom_quote');
                      }}
                      className={`text-[11px] font-semibold transition-colors ${
                        isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'
                      }`}
                    >
                      {t.inquire}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenContact(item.action, 'custom_quote')}
                    className="w-full text-xs font-semibold text-blue-500 hover:text-blue-600 inline-flex items-center justify-between transition-colors pt-2.5 border-t border-slate-800/40"
                  >
                    <span>{t.inquire}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
