import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoiCalculator } from './components/RoiCalculator';
import { SolutionsBento } from './components/SolutionsBento';
import { SegmentsSection } from './components/SegmentsSection';
import { ProjectWizard } from './components/ProjectWizard';
import { ClientSuccess } from './components/ClientSuccess';
import { ContactModal } from './components/ContactModal';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

// Helper to determine initial language from URL path or param or storage
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/br') || path.startsWith('/pt')) return 'br';
    if (path.startsWith('/es')) return 'es';
    if (path.startsWith('/pl')) return 'pl';

    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    if (langParam && ['pl', 'en', 'br', 'es'].includes(langParam)) {
      return langParam;
    }

    const saved = localStorage.getItem('user_lang') as Language;
    if (saved && ['pl', 'en', 'br', 'es'].includes(saved)) {
      return saved;
    }
  }
  return 'pl';
};

// Language-specific dynamic SEO titles and meta tags
const SEO_CONFIG: Record<Language, {
  title: string;
  desc: string;
  locale: string;
  canonical: string;
  ogTitle: string;
  ogDesc: string;
}> = {
  pl: {
    title: 'AlanSM Solutions | Automatyzacja Biznesu, Systemy Rezerwacji i DeliveryHub Kraków',
    desc: 'AlanSM Solutions tworzy niezależne systemy rezerwacji online, platformy zamówień DeliveryHub bez prowizji (0%), integracje CRM i automatyzacje dla firm.',
    locale: 'pl_PL',
    canonical: 'https://alansmsolutions.com/',
    ogTitle: 'AlanSM Solutions | Automatyzacja Biznesu i Systemy Cyfrowe',
    ogDesc: 'Zaoszczędź 20% prowizji. Niezależne systemy rezerwacji wizyt, platformy zamówień gastronomicznych bez pośredników i procesy CRM.'
  },
  en: {
    title: 'AlanSM Solutions | Business Automation, Booking Systems & DeliveryHub Platforms',
    desc: 'AlanSM Solutions builds independent online booking calendars, 0% commission DeliveryHub food ordering systems, CRM workflows, and digital solutions.',
    locale: 'en_US',
    canonical: 'https://alansmsolutions.com/?lang=en',
    ogTitle: 'AlanSM Solutions | Business Automation & Digital Engineering',
    ogDesc: 'Save 20% in marketplace fees. Custom online booking systems, direct food ordering without third parties, and automated CRM pipelines.'
  },
  br: {
    title: 'AlanSM Solutions | Automação Comercial, Sistemas de Agendamento e DeliveryHub',
    desc: 'AlanSM Solutions cria sistemas próprios de agendamento online, plataformas DeliveryHub sem comissões (taxa 0%), integrações CRM e automações para negócios.',
    locale: 'pt_BR',
    canonical: 'https://alansmsolutions.com/?lang=br',
    ogTitle: 'AlanSM Solutions | Automação e Sistemas Digitais',
    ogDesc: 'Economize até 20% em taxas de marketplaces. Sistemas próprios de agendamento, plataformas de delivery direto e automação de processos.'
  },
  es: {
    title: 'AlanSM Solutions | Automatización de Negocios, Sistemas de Reservas y DeliveryHub',
    desc: 'AlanSM Solutions desarrolla sistemas privados de reservas online, plataformas de pedidos DeliveryHub sin comisiones (0%), CRM y automatizaciones empresariales.',
    locale: 'es_ES',
    canonical: 'https://alansmsolutions.com/?lang=es',
    ogTitle: 'AlanSM Solutions | Automatización y Sistemas Digitales',
    ogDesc: 'Ahorre el 20% en comisiones de plataformas intermediarias. Sistemas propios de reservas, pedidos a domicilio directos y automatización CRM.'
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('user_theme') as Theme;
    return savedTheme && ['dark', 'light'].includes(savedTheme) ? savedTheme : 'dark';
  });

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ packageName: string; price: string } | null>(null);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Synchronize dynamic SEO meta tags whenever language changes
  useEffect(() => {
    const seo = SEO_CONFIG[currentLang] || SEO_CONFIG.pl;
    document.title = seo.title;
    document.documentElement.lang = currentLang === 'br' ? 'pt-BR' : currentLang;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.desc);
    }

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.ogDesc);

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', seo.locale);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', seo.canonical);
  }, [currentLang]);

  // Synchronize URL query/path and back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentLang(getInitialLanguage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('user_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#090d16';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenContact = (pkg?: string, price?: string) => {
    const packageNamesPl: Record<string, string> = {
      light_booking: 'Prywatny System Rezerwacji',
      deliveryhub: 'Platforma DeliveryHub dla Gastronomii',
      automation: 'Architektura i Automatyzacja Procesów',
      website: 'Strona WWW / Portal Biznesowy',
      enterprise_crm: 'Enterprise CRM & Salesforce',
      offer: 'Konsultacja Wdrożeniowa'
    };

    setSelectedPackage({
      packageName: pkg ? (packageNamesPl[pkg] || pkg) : 'Zapytanie ogólne',
      price: price || ''
    });
    setContactModalOpen(true);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('user_lang', lang);
    
    // Update browser URL without refreshing so search crawlers and share links have dedicated URLs
    try {
      const url = new URL(window.location.href);
      if (lang === 'pl') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.pushState({ lang }, '', url.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-200 ${
      isDark ? 'bg-[#090d16] text-[#f1f5f9]' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Navbar with Theme Toggle, LinkedIn, and Polish default */}
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange} 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={handleOpenContact} 
      />

      {/* Main Content */}
      <main className="space-y-6 md:space-y-8 pt-20 sm:pt-22 pb-8">
        <Hero 
          currentLang={currentLang}
          theme={theme}
          onOpenContact={handleOpenContact}
        />

        <RoiCalculator 
          currentLang={currentLang}
          theme={theme}
          onOpenContact={handleOpenContact}
        />

        <SolutionsBento 
          currentLang={currentLang}
          theme={theme}
          onOpenContact={handleOpenContact}
        />

        <SegmentsSection 
          currentLang={currentLang}
          theme={theme}
        />

        <ProjectWizard 
          currentLang={currentLang}
          theme={theme}
          onOpenContact={handleOpenContact}
        />

        <ClientSuccess 
          currentLang={currentLang}
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer 
        currentLang={currentLang} 
        theme={theme}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenContact={handleOpenContact} 
      />

      {/* Contact & Consultation Modal */}
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        selectedPackage={selectedPackage}
        currentLang={currentLang}
        theme={theme}
      />

      {/* Legal & Privacy Modals */}
      <LegalModals 
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        currentLang={currentLang}
        theme={theme}
      />
    </div>
  );
}
