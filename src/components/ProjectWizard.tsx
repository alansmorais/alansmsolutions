import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Building2, Utensils, Calendar, Cpu } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface ProjectWizardProps {
  currentLang: Language;
  theme: Theme;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({ currentLang, theme, onOpenContact }) => {
  const t = translations[currentLang]?.wizard || translations.pl.wizard;
  const isDark = theme === 'dark';

  const [step, setStep] = useState<number>(1);
  const [businessType, setBusinessType] = useState<string>('restaurant');
  const [goal, setGoal] = useState<string>('zero_commission');

  const industryIcons: Record<string, React.ElementType> = {
    restaurant: Utensils,
    service: Calendar,
    professional: Building2,
    enterprise: Cpu,
  };

  const handleComplete = () => {
    let pkg = 'website';
    if (businessType === 'restaurant') pkg = 'deliveryhub';
    else if (businessType === 'service') pkg = 'light_booking';
    else if (businessType === 'enterprise') pkg = 'enterprise_crm';

    onOpenContact(pkg, `Kreator: ${businessType} / ${goal}`);
  };

  return (
    <section id="wizard" className="py-8 md:py-10 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${
          isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          <Sparkles className="w-3.5 h-3.5" /> {t.badge}
        </div>
        <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t.title}
        </h2>
        <p className={`text-xs md:text-sm mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.desc}
        </p>
      </div>

      <div className={`border rounded-2xl p-5 md:p-6 shadow-xl max-w-2xl mx-auto transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <div className={`flex items-center justify-between mb-4 pb-2.5 border-b text-xs ${
          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.stepLabel} {step} {t.ofLabel} 2
          </span>
          <span>{step === 1 ? t.step1Name : t.step2Name}</span>
        </div>

        {step === 1 && (
          <div className="space-y-3.5">
            <h3 className={`text-sm font-bold mb-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.step1Title}
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-2.5">
              {t.industries.map((item) => {
                const IconComponent = industryIcons[item.id] || Building2;
                const isSelected = businessType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBusinessType(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-blue-600/10 border-blue-500 text-blue-500' 
                        : isDark 
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-blue-500' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div>
                      <p className={`font-bold text-xs mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</p>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                {t.next} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3.5">
            <h3 className={`text-sm font-bold mb-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.step2Title}
            </h3>
            
            <div className="space-y-2">
              {t.goals.map((item) => {
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-600/10 border-blue-500 text-blue-500' 
                        : isDark 
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className={`font-bold text-xs mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 ml-3" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`text-xs font-medium ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                ← {t.back}
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {t.complete} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
