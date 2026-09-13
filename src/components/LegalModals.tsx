import React from 'react';
import { X } from 'lucide-react';
import { Theme, Language } from '../types';
import { translations } from '../translations';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  theme: Theme;
  onClose: () => void;
  currentLang: Language;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, theme, onClose, currentLang }) => {
  if (!type) return null;
  const isDark = theme === 'dark';
  const t = translations[currentLang]?.legal || translations.pl.legal;

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className={`border rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl p-5 md:p-6 space-y-4 transition-colors ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`flex justify-between items-center border-b pb-3 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {type === 'terms' ? 'Regulamin świadczenia usług (Terms of Service)' : 'Polityka Prywatności (Privacy Notice)'}
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            className={`p-1 rounded-lg ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'terms' ? (
          <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>{t.lastUpdate}</p>
            <p>{t.termsIntro}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.termsSection1Title}</h4>
            <p>{t.termsSection1Content}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.termsSection2Title}</h4>
            <p>{t.termsSection2Content}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.termsSection3Title}</h4>
            <p>{t.termsSection3Content}</p>
          </div>
        ) : (
          <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>{t.lastUpdate}</p>
            <p>{t.privacyIntro}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.privacySection1Title}</h4>
            <p>{t.privacySection1Content}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.privacySection2Title}</h4>
            <p>{t.privacySection2Content}</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.privacySection3Title}</h4>
            <p>{t.privacySection3Content}</p>
          </div>
        )}

        <div className={`pt-3 border-t flex justify-end ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button 
            type="button" 
            onClick={onClose}
            className={`font-semibold px-4 py-1.5 rounded-xl text-xs transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
