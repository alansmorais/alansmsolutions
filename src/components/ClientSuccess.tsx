import React from 'react';
import { ExternalLink, Heart, Sparkles, CheckCircle, Globe } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface ClientSuccessProps {
  currentLang: Language;
  theme: Theme;
}

export const ClientSuccess: React.FC<ClientSuccessProps> = ({ currentLang, theme }) => {
  const t = translations[currentLang]?.work || translations.pl.work;
  const isDark = theme === 'dark';

  // Live real client project screenshots / visual mockups
  const projectVisuals = [
    {
      previewImg: 'https://joannafilek.com/images/joanna.png',
      alt: 'Joanna Filek Psychoterapia Kraków platforma online i rezerwacje',
      tag: 'Psychoterapia & Zdrowie',
    },
    {
      previewImg: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg',
      alt: 'Daniela Torp Intimacy Coach system rezerwacji online',
      tag: 'Prywatny Kalendarz',
    },
    {
      previewImg: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      alt: 'Jessica Franco Nail Designer & Salon portal rezerwacyjny',
      tag: 'Beauty & Portfolio',
    }
  ];

  return (
    <section id="work" className="py-6 md:py-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="max-w-xl mb-5">
        <h2 className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-1.5">{t.badge}</h2>
        <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {t.projects.map((p, idx) => {
          const visual = projectVisuals[idx];

          return (
            <div 
              key={idx}
              className={`border rounded-2xl overflow-hidden flex flex-col justify-between transition-all group ${
                isDark 
                  ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Visual Project Screenshot Header */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img 
                    src={visual?.previewImg} 
                    alt={visual?.alt || `${p.name} - ${p.role}`} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-slate-950 via-slate-950/30 to-transparent' : 'from-white via-white/20 to-transparent'
                  }`} />
                  
                  {/* Category Pill on top of image */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-xs">
                    {visual?.tag}
                  </div>
                </div>

                <div className="p-4 pt-3">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {p.isImageLogo && p.logo ? (
                      <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                        <img 
                          src={p.logo} 
                          alt={`Logo ${p.name}`} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        idx === 1 
                          ? isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-200'
                          : isDark ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-pink-50 text-pink-600 border border-pink-200'
                      }`}>
                        {idx === 1 ? <Heart className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                    )}
                    <div>
                      <h4 className={`font-bold text-sm leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500 mt-1">{p.role}</p>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {p.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <a 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-full inline-flex items-center justify-between text-xs font-semibold transition-colors pt-2.5 border-t ${
                    isDark 
                      ? 'text-slate-300 hover:text-white border-slate-900' 
                      : 'text-slate-600 hover:text-blue-600 border-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-500" /> {t.visit}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
