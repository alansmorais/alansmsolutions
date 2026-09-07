import React from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  theme: Theme;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, theme, onClose }) => {
  if (!type) return null;
  const isDark = theme === 'dark';

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
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Ostatnia aktualizacja: Czerwiec 2026</p>
            <p>AlanSM Solutions świadczy usługi tworzenia systemów cyfrowych, stron internetowych, platform DeliveryHub, automatyzacji procesów oraz wdrożeń systemów CRM. Szczegółowy zakres prac jest zawsze potwierdzany w pisemnej umowie lub zleceniu.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>1. Wycena i Zakres Prac</h4>
            <p>Ceny prezentowane na stronie mają charakter orientacyjny. Ostateczna wycena ustalana jest indywidualnie na podstawie specyfikacji technicznej.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>2. Odpowiedzialność i Współpraca</h4>
            <p>Klient zobowiązuje się do dostarczenia niezbędnych materiałów, treści i dostępów w celu terminowej realizacji projektu.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>3. Gwarancja i Dostępność</h4>
            <p>Dostarczamy sprawdzone, nowoczesne rozwiązania zgodne z najlepszymi praktykami inżynierii oprogramowania.</p>
          </div>
        ) : (
          <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Ostatnia aktualizacja: Czerwiec 2026</p>
            <p>AlanSM Solutions / Alan da Silva Morais szanuje Twoją prywatność i dba o bezpieczeństwo przekazywanych danych osobowych.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>1. Gromadzone Dane</h4>
            <p>Dane kontaktowe (imię, adres e-mail, telefon, opis projektu) są zbierane wyłącznie w celu przygotowania oferty i kontaktu w sprawie projektu.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>2. Bezpieczeństwo Danych</h4>
            <p>Twoje dane nie są odsprzedawane ani przekazywane podmiotom trzecim w celach marketingowych.</p>
            <h4 className={`font-bold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>3. Prawa Użytkownika</h4>
            <p>W każdej chwili masz prawo do wglądu, poprawienia lub usunięcia swoich danych kontaktując się na kontakt@alansmsolutions.com.</p>
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
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
