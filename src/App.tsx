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
import { SolutionDetailView } from './components/SolutionDetailView';
import { AdminDashboardModal } from './components/AdminDashboardModal';

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

// Helper to determine initial solution from URL
const getInitialSolution = (): 'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm' | null => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const solutionParam = params.get('solution');
    if (solutionParam === 'website' || solutionParam === 'booking' || solutionParam === 'deliveryhub' || solutionParam === 'restaurant' || solutionParam === 'tracking' || solutionParam === 'crm') {
      return solutionParam;
    }
  }
  return null;
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
    title: 'ASM Solutions | Automatyzacja Biznesu, Systemy Rezerwacji i DeliveryHub Kraków',
    desc: 'ASM Solutions tworzy niezależne systemy rezerwacji online, platformy zamówień DeliveryHub bez prowizji (0%), integracje CRM i automatyzacje dla firm.',
    locale: 'pl_PL',
    canonical: 'https://alansmsolutions.com/',
    ogTitle: 'ASM Solutions | Automatyzacja Biznesu i Systemy Cyfrowe',
    ogDesc: 'Zaoszczędź 20% prowizji. Niezależne systemy rezerwacji wizyt, platformy zamówień gastronomicznych bez pośredników i procesy CRM.'
  },
  en: {
    title: 'ASM Solutions | Business Automation, Booking Systems & DeliveryHub Platforms',
    desc: 'ASM Solutions builds independent online booking calendars, 0% commission DeliveryHub food ordering systems, CRM workflows, and digital solutions.',
    locale: 'en_US',
    canonical: 'https://alansmsolutions.com/?lang=en',
    ogTitle: 'ASM Solutions | Business Automation & Digital Engineering',
    ogDesc: 'Save 20% in marketplace fees. Custom online booking systems, direct food ordering without third parties, and automated CRM pipelines.'
  },
  br: {
    title: 'ASM Solutions | Automação Comercial, Sistemas de Agendamento e DeliveryHub',
    desc: 'ASM Solutions cria sistemas próprios de agendamento online, plataformas DeliveryHub sem comissões (taxa 0%), integrações CRM e automações para negócios.',
    locale: 'pt_BR',
    canonical: 'https://alansmsolutions.com/?lang=br',
    ogTitle: 'ASM Solutions | Automação e Sistemas Digitais',
    ogDesc: 'Economize até 20% em taxas de marketplaces. Sistemas próprios de agendamento, plataformas de delivery direto e automação de processos.'
  },
  es: {
    title: 'ASM Solutions | Automatización de Negocios, Sistemas de Reservas y DeliveryHub',
    desc: 'ASM Solutions desarrolla sistemas privados de reservas online, plataformas de pedidos DeliveryHub sin comisiones (0%), CRM y automatizaciones empresariales.',
    locale: 'es_ES',
    canonical: 'https://alansmsolutions.com/?lang=es',
    ogTitle: 'ASM Solutions | Automatización y Sistemas Digitales',
    ogDesc: 'Ahorre el 20% en comisiones de plataformas intermediarias. Sistemas propios de reservas, pedidos a domicilio directos y automatización CRM.'
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);
  const [activeSolution, setActiveSolution] = useState<'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm' | null>(getInitialSolution);

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('user_theme') as Theme;
    return savedTheme && ['dark', 'light'].includes(savedTheme) ? savedTheme : 'dark';
  });

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ packageName: string; price: string } | null>(null);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  const [zohoEnabled, setZohoEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('zoho_enabled');
    return saved === 'true'; // Default to false (hidden from client)
  });
  const [discountEnabled, setDiscountEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('global_discount_enabled');
    return saved !== 'false'; // Default to true (as it was before)
  });
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Sync discount to storage
  useEffect(() => {
    localStorage.setItem('global_discount_enabled', String(discountEnabled));
  }, [discountEnabled]);

  // Dynamically load/unload Zoho SalesIQ based on admin toggle
  useEffect(() => {
    localStorage.setItem('zoho_enabled', String(zohoEnabled));
    if (zohoEnabled) {
      if (typeof window !== 'undefined') {
        const existing = document.getElementById('zoho-salesiq-script');
        if (!existing) {
          const script = document.createElement('script');
          script.id = 'zoho-salesiq-script';
          script.type = 'text/javascript';
          script.innerHTML = `
            var $zoho=$zoho || {};$zoho.salesiq=$zoho.salesiq||{widgetstatus:"show",values:{},ready:function(){}};
            var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;
            s.src="https://salesiq.zoho.eu/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
          `;
          document.body.appendChild(script);
        } else {
          const $zoho = (window as any).$zoho;
          if ($zoho && $zoho.salesiq && typeof $zoho.salesiq.show === 'function') {
            $zoho.salesiq.show();
          }
        }
      }
    } else {
      if (typeof window !== 'undefined') {
        const $zoho = (window as any).$zoho;
        if ($zoho && $zoho.salesiq && typeof $zoho.salesiq.hide === 'function') {
          $zoho.salesiq.hide();
        }
        const script = document.getElementById('zoho-salesiq-script');
        if (script) script.remove();
        const zsiq = document.getElementById('zsiqscript');
        if (zsiq) zsiq.remove();
        const floatWidget = document.getElementById('zsiq_float');
        if (floatWidget) floatWidget.remove();
      }
    }
  }, [zohoEnabled]);

  // Synchronize dynamic SEO meta tags whenever language, active project or active solution changes
  useEffect(() => {
    let title = '';
    let desc = '';
    const seo = SEO_CONFIG[currentLang] || SEO_CONFIG.pl;

    if (activeSolution) {
      const solutionNames: Record<string, Record<Language, { title: string; desc: string }>> = {
        'website': {
          pl: { title: 'Strony i Portale Biznesowe | ASM Solutions', desc: 'Szybkie strony internetowe, landing page oraz profesjonalne panele klienta o bezkompromisowej szybkości i integracji.' },
          en: { title: 'Business Websites & Portals | ASM Solutions', desc: 'Bespoke high-performance websites, landing pages, and interactive client portals.' },
          br: { title: 'Páginas e Portais de Negócios | ASM Solutions', desc: 'Sites corporativos sob medida, landing pages otimizadas e portais de clientes dinâmicos de carregamento instantâneo.' },
          es: { title: 'Páginas y Portales de Negocios | ASM Solutions', desc: 'Páginas web profesionales a medida, landing pages de alta conversión y portales de clientes integrados.' }
        },
        'booking': {
          pl: { title: 'Prywatny System Rezerwacji | ASM Solutions', desc: 'Dedykowane systemy rezerwacji i kalendarze online bez prowizji pośredników. Pełna automatyzacja i kontrola terminów.' },
          en: { title: 'Private Booking Systems | ASM Solutions', desc: 'Bespoke direct online booking systems and calendars with zero commission fees. Fully automated client scheduling and notifications.' },
          br: { title: 'Sistema Privado de Reservas | ASM Solutions', desc: 'Sistemas próprios de agendamento online e calendários integrados sem comissões de terceiros. Automatize seus horários.' },
          es: { title: 'Sistema Privado de Reservas | ASM Solutions', desc: 'Sistemas propios de reservas online y agendas interactivas sin comisiones de intermediarios. Automatización y control total.' }
        },
        'deliveryhub': {
          pl: { title: 'Platforma DeliveryHub | ASM Solutions', desc: 'Własny system zamówień online i logistyki dostaw bez prowizji portali pośredniczących.' },
          en: { title: 'DeliveryHub Platform | ASM Solutions', desc: 'Your own direct online ordering system and delivery dispatch workflow with zero marketplace commissions.' },
          br: { title: 'Plataforma DeliveryHub | ASM Solutions', desc: 'Sistema próprio de pedidos online e gestão de entregas locais sem tarifas por pedido.' },
          es: { title: 'Plataforma DeliveryHub | ASM Solutions', desc: 'Plataforma propia de pedidos directos a domicilio y despacho de entregas sin comisiones.' }
        },
        'restaurant': {
          pl: { title: 'Systemy dla Gastronomii | ASM Solutions', desc: 'Wielofunkcyjne systemy restauracyjne: cyfrowe menu, zamówienia stolikowe, baza klientów i bezpośrednie płatności.' },
          en: { title: 'Restaurant Systems | ASM Solutions', desc: 'Complete digital ecosystem for restaurants: digital menus, table-side ordering, guest retention, and direct checkouts.' },
          br: { title: 'Sistemas para Restaurantes | ASM Solutions', desc: 'Sistemas completos para alimentação: cardápio QR code, pedidos em mesa, base de clientes própria e pagamentos diretos.' },
          es: { title: 'Sistemas para Restauración | ASM Solutions', desc: 'Sistemas digitales para el sector gastronómico: menú interactivo QR, comandas de mesa, fidelización directa de clientes y pagos directos.' }
        }
      };
      const solSeo = solutionNames[activeSolution]?.[currentLang] || solutionNames[activeSolution]?.pl;
      if (solSeo) {
        title = solSeo.title;
        desc = solSeo.desc;
      } else {
        title = seo.title;
        desc = seo.desc;
      }
    } else {
      title = seo.title;
      desc = seo.desc;
    }

    document.title = title;
    document.documentElement.lang = currentLang === 'br' ? 'pt-BR' : currentLang;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', activeSolution ? title : seo.ogTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', activeSolution ? desc : seo.ogDesc);

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', seo.locale);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(window.location.href);
      canonical.setAttribute('href', url.origin + url.pathname + url.search);
    }
  }, [currentLang, activeSolution]);

  // Synchronize URL query/path and back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentLang(getInitialLanguage());
      setActiveSolution(getInitialSolution());
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
      offer: 'Konsultacja Wdrożeniowa',
      landing_page: 'Prestiżowy Landing Page (Strony i Portale)',
      business_website: 'Pełna Strona Biznesowa (Strony i Portale)',
      enterprise_portal: 'Portal Klienta / Dedykowana Aplikacja'
    };

    setSelectedPackage({
      packageName: pkg ? (packageNamesPl[pkg] || pkg) : 'Zapytanie ogólne',
      price: price || ''
    });
    setContactModalOpen(true);
  };

  const handleSelectSolution = (solutionId: 'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm' | null) => {
    setActiveSolution(solutionId);
    try {
      const url = new URL(window.location.href);
      if (solutionId) {
        url.searchParams.set('solution', solutionId);
        url.searchParams.delete('project');
      } else {
        url.searchParams.delete('solution');
      }
      window.history.pushState({ lang: currentLang, project: null, solution: solutionId }, '', url.toString());
    } catch (e) {
      console.error(e);
    }
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
      window.history.pushState({ lang, project: null, solution: activeSolution }, '', url.toString());
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
        onOpenAdmin={() => setAdminDashboardOpen(true)}
        activeSolution={activeSolution}
        onSelectSolution={handleSelectSolution}
      />

      {/* Main Content */}
      <main className="space-y-6 md:space-y-8 pt-20 sm:pt-22 pb-8">
        {activeSolution ? (
          <SolutionDetailView 
            solutionId={activeSolution}
            currentLang={currentLang}
            theme={theme}
            onBack={() => handleSelectSolution(null)}
            onOpenContact={handleOpenContact}
            discountEnabled={discountEnabled}
          />
        ) : (
          <>
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
              onSelectSolution={handleSelectSolution}
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
          </>
        )}
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
        initialPackage={selectedPackage}
        currentLang={currentLang}
        theme={theme}
      />

      {/* Legal & Privacy Modals */}
      <LegalModals 
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        currentLang={currentLang}
        theme={theme}
      />

      {/* Admin Dashboard Console Modal */}
      <AdminDashboardModal 
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        theme={theme}
        currentLang={currentLang}
        zohoEnabled={zohoEnabled}
        onToggleZoho={setZohoEnabled}
        discountEnabled={discountEnabled}
        onToggleDiscount={setDiscountEnabled}
      />
    </div>
  );
}
