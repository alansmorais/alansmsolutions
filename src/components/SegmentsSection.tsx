import React from 'react';
import { Store, Utensils, Wine, Coffee, ShoppingBag, Laptop } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface SegmentsSectionProps {
  currentLang: Language;
  theme: Theme;
}

export const SegmentsSection: React.FC<SegmentsSectionProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang]?.segments || translations.pl.segments;
  const isDark = theme === 'dark';

  const icons = [Store, Utensils, Wine, Coffee, ShoppingBag, Laptop];

  const segmentImages = [
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop',
      alt: 'Systemy dla sklepów stacjonarnych i handlu detalicznego',
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop',
      alt: 'Systemy zamówień dla restauracji, pizzerii i barów',
    },
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400&auto=format&fit=crop',
      alt: 'Oprogramowanie dla winiarni, adegas i sklepów specjalistycznych',
    },
    {
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&auto=format&fit=crop',
      alt: 'Szybka sprzedaż dla kawiarni i rzemieślniczych piekarni',
    },
    {
      url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=400&auto=format&fit=crop',
      alt: 'Systemy sprzedaży dla sklepów całodobowych convenience',
    },
    {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop',
      alt: 'Kalendarz rezerwacji dla gabinetów, salonów urody i trenerów',
    }
  ];

  return (
    <section id="segments" className={`py-6 md:py-8 max-w-5xl mx-auto px-4 sm:px-6 rounded-2xl border my-4 transition-colors ${
      isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
    }`}>
      <div className="max-w-xl mb-5">
        <h2 className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-1.5">{t.badge}</h2>
        <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {t.items.map((s, idx) => {
          const Icon = icons[idx] || Store;
          const imgData = segmentImages[idx];

          return (
            <div 
              key={idx} 
              className={`border rounded-xl p-3 flex items-center gap-3 transition-colors hover:border-blue-500/40 ${
                isDark 
                  ? 'bg-slate-950/80 border-slate-800/80' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              {/* Segment Industry Photo */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                <img 
                  src={imgData?.url} 
                  alt={imgData?.alt || s.title} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-[2px] ${
                  isDark ? 'bg-slate-950/40 text-blue-400' : 'bg-slate-900/30 text-white'
                }`}>
                  <Icon className="w-5 h-5 drop-shadow-sm" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className={`font-bold text-xs md:text-sm mb-0.5 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </h4>
                <p className={`text-[11px] leading-snug line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
