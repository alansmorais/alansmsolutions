import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface RoiCalculatorProps {
  currentLang: Language;
  theme: Theme;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ currentLang, theme, onOpenContact }) => {
  const t = translations[currentLang]?.roi || translations.pl.roi;
  const isDark = theme === 'dark';

  // In PLN (zł)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(20000);
  const commissionRate = 0.20; // 20% marketplace commission
  
  const annualLoss = Math.round(monthlyRevenue * commissionRate * 12);
  const monthlyLoss = Math.round(monthlyRevenue * commissionRate);

  const formatPLN = (val: number) => {
    return val.toLocaleString('pl-PL') + ' zł';
  };

  return (
    <section id="roi" className={`py-8 md:py-10 transition-colors border-y ${
      isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-100/70 border-slate-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
            isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            <Calculator className="w-3.5 h-3.5" /> {t.badge}
          </div>
          <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {t.title}
          </h2>
          <p className={`text-xs md:text-sm mt-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.desc}
          </p>
        </div>

        <div className={`rounded-2xl p-5 md:p-6 shadow-xl grid md:grid-cols-2 gap-6 items-center border transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="revenueSlider" className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {t.monthlyRevLabel}
                </label>
                <span className="text-base font-bold text-blue-500">{formatPLN(monthlyRevenue)}</span>
              </div>
              <input 
                id="revenueSlider"
                type="range" 
                min="10000" 
                max="200000" 
                step="5000" 
                value={monthlyRevenue} 
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className={`w-full accent-blue-600 h-2 rounded-lg cursor-pointer ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`} 
              />
              <div className={`flex justify-between text-[10px] mt-1 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <span>10 000 zł/mc</span>
                <span>100 000 zł/mc</span>
                <span>200 000+ zł/mc</span>
              </div>
            </div>

            <div className={`border rounded-xl p-3.5 space-y-1.5 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <span>{t.marketplaceFee}</span>
                <span className="text-red-500 font-semibold">-{formatPLN(monthlyLoss)}/mc</span>
              </div>
              <div className={`flex items-center justify-between text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <span>{t.ourFee}</span>
                <span className="text-emerald-500 font-semibold">{t.zeroCommission}</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-5 text-center flex flex-col justify-between space-y-4 border ${
            isDark 
              ? 'bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border-blue-500/30' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
          }`}>
            <div>
              <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest mb-0.5">
                {t.annualSavings}
              </p>
              <div className={`text-3xl md:text-4xl font-extrabold tracking-tight my-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {formatPLN(annualLoss)}
              </div>
              <p className={`text-[11px] ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t.retained}
              </p>
            </div>

            <button 
              type="button"
              onClick={() => onOpenContact('deliveryhub', `${formatPLN(annualLoss)} rocznych oszczędności`)}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs"
            >
              {t.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
