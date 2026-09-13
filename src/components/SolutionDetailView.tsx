import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, Laptop, Shield, Zap, Layout, Monitor, Sparkles, Database, Mail, Users, BarChart, Gift } from 'lucide-react';
import { Language, Theme } from '../types';
import { InteractiveServiceSandbox } from './InteractiveServiceSandbox';

interface SolutionDetailViewProps {
  solutionId: 'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm';
  currentLang: Language;
  theme: Theme;
  onBack: () => void;
  onOpenContact: (pkg?: string, price?: string) => void;
  discountEnabled: boolean;
}

interface SolutionContent {
  badge: string;
  title: string;
  description: string;
  heroImage: string;
  featuresTitle: string;
  features: {
    title: string;
    desc: string;
    icon: 'speed' | 'seo' | 'portal' | 'security';
  }[];
  processTitle: string;
  processSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  packagesTitle: string;
  packages: {
    name: string;
    desc: string;
    price: string;
    time: string;
    features: string[];
    actionCode: string;
  }[];
  showcaseTitle: string;
  showcaseDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}

const SOLUTION_DATA: Record<string, Record<Language, SolutionContent>> = {
  'website': {
    pl: {
      badge: 'Rozwiązania Cyfrowe',
      title: 'Strony i Portale Biznesowe',
      description: 'Zapewnij swojej firmie bezkompromisowy wizerunek, błyskawiczną prędkość działania i pełną niezależność. Tworzymy dedykowane strony internetowe, zoptymalizowane landing pages oraz interaktywne portale dla klientów zintegrowane bezpośrednio z Twoim biznesem.',
      heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Standard Technologiczny Naszych Stron',
      features: [
        {
          title: 'Zoptymalizowana Szybkość (Core Web Vitals)',
          desc: 'Wyniki PageSpeed Score na poziomie 95-100%. Błyskawiczne ładowanie zwiększa konwersję i poprawia pozycję w wyszukiwarkach.',
          icon: 'speed'
        },
        {
          title: 'Profesjonalne SEO & Schema.org',
          desc: 'Wbudowana struktura mikro-danych, wielojęzyczność (hreflang) oraz meta tagi dopasowane pod wyszukiwanie lokalne i globalne.',
          icon: 'seo'
        },
        {
          title: 'Dedykowane Portale Klienta',
          desc: 'Bezpieczne strefy logowania, panele do pobierania dokumentów, faktur oraz śledzenia statusu zleceń i rezerwacji.',
          icon: 'portal'
        },
        {
          title: 'Niezależność i Integracje z ERP/API',
          desc: 'Bezpośrednia synchronizacja formularzy z Arkuszami Google, systemami CRM (Salesforce), bazami danych i bramkami płatności.',
          icon: 'security'
        }
      ],
      processTitle: 'Jak Wygląda Proces Wdrożenia?',
      processSteps: [
        { step: '01', title: 'Analiza i Architektura', desc: 'Rozmawiamy o celach biznesowych, strukturze informacji i ścieżce konwersji użytkownika.' },
        { step: '02', title: 'Unikalny Projekt i Kodowanie', desc: 'Tworzymy dedykowany, czysty kod w standardzie React/Vite/Next.js bez użycia ociężałych szablonów.' },
        { step: '03', title: 'Integracja i Testy Wydajności', desc: 'Łączymy formularze z bazą danych lub ERP, konfigurujemy SEO oraz testujemy szybkość ładowania.' },
        { step: '04', title: 'Wdrożenie na Chmurze i Wsparcie', desc: 'Uruchamiamy stronę na ultraszybkiej infrastrukturze CDN z certyfikatem SSL i zapewniamy pełną opiekę techniczną.' }
      ],
      packagesTitle: 'Dostępne Warianty i Pakiety',
      packages: [
        {
          name: 'Prestiżowy Landing Page',
          desc: 'Skoncentrowana na jednym celu strona sprzedażowa lub wizytówkowa o ekstremalnej szybkości ładowania.',
          price: 'od 2 400 PLN',
          time: '7-10 dni roboczych',
          features: [
            'Dedykowany projekt graficzny (100% Mobile-First)',
            'PageSpeed Score powyżej 95%',
            'Integracja formularza kontaktowego z Google Sheets / e-mail',
            'Szyfrowany certyfikat SSL i bezpieczny hosting CDN',
            'Zgodność z RODO i polityką prywatności'
          ],
          actionCode: 'landing_page'
        },
        {
          name: 'Pełna Strona Biznesowa',
          desc: 'Kompleksowa obecność online dla firm usługowych lub handlowych. Podstrony, cenniki i blog.',
          price: 'od 4 200 PLN',
          time: '2-3 tygodnie',
          features: [
            'Wszystko z pakietu Landing Page + do 5 podstron tematycznych',
            'Dynamiczny moduł aktualności lub oferty',
            'Zaawansowane pozycjonowanie techniczne SEO oraz Schema.org',
            'Wsparcie dla wielu wersji językowych (Multi-language)',
            'Integracja z kalendarzem rezerwacji lub zewnętrznym API'
          ],
          actionCode: 'business_website'
        },
        {
          name: 'Portal Klienta / Dedykowana Aplikacja',
          desc: 'Zaawansowany system z panelem logowania, bezpieczną strefą klienta i integracją z bazą danych/CRM.',
          price: 'Wycena indywidualna',
          time: 'Od 4 tygodni',
          features: [
            'Bezpieczne uwierzytelnianie użytkowników (Auth)',
            'Interaktywny panel zarządzania plikami i fakturami',
            'Dwukierunkowa integracja z systemami CRM/Salesforce i ERP',
            'Automatyczne powiadomienia e-mail, SMS lub push',
            'Dedykowany serwer bazy danych (Firebase / PostgreSQL)'
          ],
          actionCode: 'enterprise_portal'
        }
      ],
      showcaseTitle: 'Nasze Realizacje w Tej Kategorii',
      showcaseDesc: 'Zobacz, jak te technologie sprawdzają się w praktyce u naszych klientów:',
      ctaTitle: 'Gotowy na nową jakość cyfrową w swojej firmie?',
      ctaDesc: 'Skorzystaj z darmowej, niezobowiązującej konsultacji technicznej. Omówimy Twoje wymagania i dopasujemy optymalną architekturę.',
      ctaBtn: 'Zamów bezpłatną wycenę'
    },
    en: {
      badge: 'Digital Solutions',
      title: 'Business Websites & Portals',
      description: 'Equip your business with an uncompromising digital image, blazing fast speed, and complete independence. We build bespoke high-performance websites, optimized landing pages, and interactive client portals integrated directly into your operational processes.',
      heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'The Technical Standard Of Our Websites',
      features: [
        {
          title: 'Extreme Performance (Core Web Vitals)',
          desc: 'PageSpeed score of 95-100%. Instant loading boosts user conversion, reduces bounce rates, and ranks higher on search engines.',
          icon: 'speed'
        },
        {
          title: 'Advanced SEO & Schema.org Markup',
          desc: 'Fully indexable structures, multilingual (hreflang) capability, and clean semantic tag distribution tailored for local and global search.',
          icon: 'seo'
        },
        {
          title: 'Bespoke Client Portals',
          desc: 'Secure user login areas, custom portals for viewing documents, downloading invoices, and tracking appointment histories.',
          icon: 'portal'
        },
        {
          title: 'ERP, API & Database Integrations',
          desc: 'Direct connection of front-end forms with Google Sheets, CRM platforms (Salesforce), custom backends, and Stripe checkout engines.',
          icon: 'security'
        }
      ],
      processTitle: 'Our Development Process',
      processSteps: [
        { step: '01', title: 'Consultation & UX Flow', desc: 'We deep dive into your business goals, content structures, and preferred customer conversion path.' },
        { step: '02', title: 'Unique Coding & UI Design', desc: 'We hand-craft every module using clean, modern React/Vite/Next.js frameworks with zero bloated page builders.' },
        { step: '03', title: 'Integrations & Audits', desc: 'We bridge inputs with your CRM or Google sheets, fine-tune responsiveness, and perform rigorous speed checks.' },
        { step: '04', title: 'Cloud Deploy & Support', desc: 'We set up your app on lightning-fast edge CDN servers protected by free SSL certificate and provide monthly maintenance.' }
      ],
      packagesTitle: 'Options and Service Tiers',
      packages: [
        {
          name: 'Premium Landing Page',
          desc: 'Goal-driven sales and presentation web application optimized for absolute speed and maximum lead capture.',
          price: 'from $600',
          time: '7-10 business days',
          features: [
            '100% custom mobile-first UI design',
            'Audited PageSpeed score over 95%',
            'Direct integration of contact forms with Google Sheets & secure emails',
            'Encrypted SSL certificate and global CDN cloud distribution',
            'Full GDPR and cookie compliance compliance'
          ],
          actionCode: 'landing_page'
        },
        {
          name: 'Complete Business Website',
          desc: 'Comprehensive multi-page digital presence for service businesses or agencies. Includes subpages, pricing models, and blog.',
          price: 'from $1,050',
          time: '2-3 weeks',
          features: [
            'All features from Landing Page + up to 5 comprehensive subpages',
            'Dynamic news feed or portfolio slider module',
            'Complete local SEO structure and custom Schema.org rich snippets',
            'Full support for multi-language localization parameters',
            'Integration with appointment booking API or CRM databases'
          ],
          actionCode: 'business_website'
        },
        {
          name: 'Client Portal / Custom Web App',
          desc: 'Interactive platform with secure login gates, private user profiles, and seamless backend database integration.',
          price: 'Individual Custom Quote',
          time: 'From 4 weeks',
          features: [
            'Secure user authentication credentials management (Auth)',
            'Interactive client dashboard for documents, downloads, and billing',
            'Bidirectional sync with external ERP or custom CRM APIs',
            'Automated email notifications, WhatsApp triggers, or SMS hooks',
            'Dedicated secure relational database instances (Firebase / PostgreSQL)'
          ],
          actionCode: 'enterprise_portal'
        }
      ],
      showcaseTitle: 'Real Projects Built Under This Standard',
      showcaseDesc: 'Inspect how these technical guidelines are driving business results for our clients:',
      ctaTitle: 'Ready to elevate your company’s online presence?',
      ctaDesc: 'Schedule a free, no-obligation technical strategy call. We will discuss your technical requirements and define the most efficient solution.',
      ctaBtn: 'Request a Free Quote'
    },
    br: {
      badge: 'Soluções Digitais',
      title: 'Páginas e Portais de Negócios',
      description: 'Garante à sua empresa uma imagem impecável, velocidade incomparável e independência técnica absoluta. Desenvolvemos sites sob medida, landing pages otimizadas e portais de clientes dinâmicos, conectados diretamente com as suas operações diárias.',
      heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Padrão Tecnológico das Nossas Páginas',
      features: [
        {
          title: 'Velocidade Extrema (Core Web Vitals)',
          desc: 'Nota de performance entre 95-100% no Google PageSpeed. O carregamento instantâneo melhora a retenção de clientes e o rankeamento orgânico.',
          icon: 'speed'
        },
        {
          title: 'SEO Estruturado & Schema.org',
          desc: 'Estruturação semântica para indexação, suporte multi-idiomas (hreflang) e dados estruturados para otimização de busca local e global.',
          icon: 'seo'
        },
        {
          title: 'Portais de Clientes Exclusivos',
          desc: 'Área segura de login para clientes acessarem faturas, baixarem documentos de serviço e acompanharem status de solicitações em tempo real.',
          icon: 'portal'
        },
        {
          title: 'Integrações Sem Custos com ERP/APIs',
          desc: 'Conectamos formulários diretamente com Planilhas Google, CRM (Salesforce), bancos de dados dedicados e plataformas de pagamento.',
          icon: 'security'
        }
      ],
      processTitle: 'Como Funciona Nosso Processo?',
      processSteps: [
        { step: '01', title: 'Alinhamento & UX', desc: 'Análise de objetivos, estrutura de navegação lógica e estratégia de conversão de público.' },
        { step: '02', title: 'Design & Desenvolvimento', desc: 'Codificação sob medida utilizando React/Next.js de alta performance, sem construtores lentos.' },
        { step: '03', title: 'Integrações & Testes', desc: 'Sincronização com ERP, calibração SEO completa e auditorias rigorosas de velocidade em celulares.' },
        { step: '04', title: 'Hospedagem & Suporte', desc: 'Lançamento em servidores globais CDN de carregamento veloz com SSL ativo e manutenção regular.' }
      ],
      packagesTitle: 'Nossos Planos e Modelos',
      packages: [
        {
          name: 'Landing Page de Alta Conversão',
          desc: 'Página única focada em vendas ou apresentação institucional com carregamento instantâneo.',
          price: 'a partir de R$ 3.000',
          time: '7-10 dias úteis',
          features: [
            'Design exclusivo e Mobile-First (100% responsivo)',
            'PageSpeed Score auditado acima de 95%',
            'Formulários conectados com Google Sheets e e-mails profissionais',
            'Segurança reforçada por certificado SSL grátis e CDN global',
            'Adequação completa a leis de privacidade e cookies (LGPD)'
          ],
          actionCode: 'landing_page'
        },
        {
          name: 'Site Corporativo Completo',
          desc: 'Presença digital abrangente com múltiplas páginas, listagem detalhada de produtos/serviços e área de conteúdo.',
          price: 'a partir de R$ 5.500',
          time: '2-3 semanas',
          features: [
            'Todos os benefícios do Landing Page + até 5 subpáginas dinâmicas',
            'Módulo moderno de blog ou galeria de realizações',
            'SEO técnico local completo e Schema.org configurado',
            'Suporte total a múltiplos idiomas simultâneos (Multi-language)',
            'Pronto para integração com motores de agendamento online'
          ],
          actionCode: 'business_website'
        },
        {
          name: 'Portal do Cliente / Aplicação Customizada',
          desc: 'Aplicação web avançada com painel administrativo seguro, gerenciamento de perfis e banco de dados sob medida.',
          price: 'Orçamento Sob Medida',
          time: 'A partir de 4 semanas',
          features: [
            'Autenticação de usuários segura e criptografada (Auth)',
            'Painel administrativo para controle financeiro, downloads ou arquivos',
            'Sincronização bidirecional com Salesforce CRM ou bancos de dados',
            'Envios de alertas automatizados de e-mail, WhatsApp ou SMS',
            'Banco de dados relacional isolado (Firebase / PostgreSQL)'
          ],
          actionCode: 'enterprise_portal'
        }
      ],
      showcaseTitle: 'Projetos que Utilizam esse Padrão',
      showcaseDesc: 'Confira as métricas reais atingidas pelos nossos clientes com nossa infraestrutura web:',
      ctaTitle: 'Quer modernizar a presença digital da sua marca?',
      ctaDesc: 'Agende uma conversa técnica gratuita, sem compromisso. Vamos detalhar as necessidades da sua empresa e planejar a melhor infraestrutura.',
      ctaBtn: 'Solicitar Orçamento Grátis'
    },
    es: {
      badge: 'Soluciones Digitales',
      title: 'Páginas y Portales de Negocios',
      description: 'Brinde a su negocio un posicionamiento web impecable, velocidad extrema de carga y total autonomía. Desarrollamos portales web a medida, landing pages optimizadas y plataformas interactivas para clientes con integración directa a sus procesos de backend.',
      heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Estándar Técnico de Nuestras Webs',
      features: [
        {
          title: 'Rendimiento Máximo (Core Web Vitals)',
          desc: 'Puntuación PageSpeed de 95-100%. La carga ultrarrápida aumenta la retención, reduce el abandono de usuarios y escala orgánicamente.',
          icon: 'speed'
        },
        {
          title: 'SEO Avanzado y Datos Estructurados',
          desc: 'Configuración técnica lista para indexación, soporte multi-idioma (hreflang) y microdatos Schema.org integrados nativos.',
          icon: 'seo'
        },
        {
          title: 'Portales de Cliente Privados',
          desc: 'Área de inicio de sesión seguro, descarga de facturas y visualización de documentos en la nube de forma ágil y confidencial.',
          icon: 'portal'
        },
        {
          title: 'Integración Directa con ERP y APIs',
          desc: 'Conexión instantánea de formularios con Hojas de cálculo Google, Salesforce CRM, bases de datos SQL y pasarelas de pago.',
          icon: 'security'
        }
      ],
      processTitle: 'Nuestra Metodología de Trabajo',
      processSteps: [
        { step: '01', title: 'Consultoría & UX', desc: 'Definimos objetivos de conversión, mapa de navegación claro y estructura idónea del usuario.' },
        { step: '02', title: 'Diseño & Código', desc: 'Escribimos código nativo React/Next.js optimizado y ligero sin usar plantillas sobrecargadas.' },
        { step: '03', title: 'Integraciones & Testeo', desc: 'Vinculamos el flujo de datos con su ERP o bases de datos, auditando la velocidad en móviles.' },
        { step: '04', title: 'Lanzamiento & Soporte', desc: 'Desplegamos en servidores CDN globales ultrarrápidos con certificado SSL gratuito y soporte continuo.' }
      ],
      packagesTitle: 'Planes y Soluciones Web',
      packages: [
        {
          name: 'Landing Page de Alta Conversión',
          desc: 'Portal de destino enfocado en venta directa o captura de contactos con desempeño de carga récord.',
          price: 'desde €550',
          time: '7-10 días hábiles',
          features: [
            'Diseño visual exclusivo y adaptado al móvil (100% responsivo)',
            'Rendimiento verificado PageSpeed por encima de 95%',
            'Formularios sincronizados con Google Sheets y alertas de email',
            'Hosting CDN de nivel empresarial con encriptación SSL',
            'Cumplimiento de RGPD de protección de datos personales'
          ],
          actionCode: 'landing_page'
        },
        {
          name: 'Sitio Web Corporativo Completo',
          desc: 'Presencia digital robusta para agencias o pymes. Incluye subpáginas, portafolios, precios y sección informativa.',
          price: 'desde €950',
          time: '2-3 semanas',
          features: [
            'Todas las bondades de Landing Page + hasta 5 subpáginas completas',
            'Módulo de catálogo o bitácora de novedades autogestionable',
            'SEO estructurado para búsquedas locales y configuración Schema.org',
            'Soporte multiidioma parametrizado desde URL nativa',
            'Listo para incorporar motores de reserva o cobro avanzados'
          ],
          actionCode: 'business_website'
        },
        {
          name: 'Portal de Cliente / Aplicación Web a Medida',
          desc: 'Ecosistema digital seguro con accesos para clientes, almacenamiento privado de archivos y base de datos relacional.',
          price: 'Cotización Personalizada',
          time: 'Desde 4 semanas',
          features: [
            'Sistema de autenticación y claves robustas (Auth)',
            'Panel de usuario para reportes, descargas o facturaciones',
            'Integraciones bidireccionales con CRM / Salesforce y ERP',
            'Servicios de notificación automática vía WhatsApp, email o SMS',
            'Bases de datos seguras dedicadas (Firebase / PostgreSQL)'
          ],
          actionCode: 'enterprise_portal'
        }
      ],
      showcaseTitle: 'Casos Reales con esta Infraestructura',
      showcaseDesc: 'Conozca la forma en que nuestras soluciones web impulsan las métricas clave de nuestros socios comerciales:',
      ctaTitle: '¿Desea optimizar la vitrina digital de su empresa?',
      ctaDesc: 'Reserve una sesión técnica gratuita de asesoramiento sin ningún compromiso. Analizaremos sus procesos actuales y propondremos la arquitectura web más ágil.',
      ctaBtn: 'Solicitar Cotización Gratuita'
    }
  },
  'booking': {
    pl: {
      badge: "Niezależne Rezerwacje",
      title: "Prywatny System Rezerwacji",
      description: "Odzyskaj pełną kontrolę nad swoim kalendarzem, wyeliminuj prowizje portali i zaoferuj swoim klientom luksusowe doświadczenie rezerwacji bezpośrednich. Budujemy szyte na miarę systemy rezerwacji online zintegrowane z powiadomieniami SMS/WhatsApp, płatnościami online i bezpieczną bazą danych.",
      heroImage: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Standard Technologiczny Systemu Rezerwacji",
      features: [
        {
          title: "Błyskawiczne Działanie na Mobilnych",
          desc: "PageSpeed Score >95%. Klienci zapisują się w 15 sekund z dowolnego telefonu.",
          icon: "speed"
        },
        {
          title: "Wyszukiwanie Lokalne i SEO",
          desc: "Precyzyjna optymalizacja pod Google Maps i lokalne zapytania, zwiększająca ruch bez płatnych reklam.",
          icon: "seo"
        },
        {
          title: "Dedykowany Panel Klienta",
          desc: "Klienci mogą bezpiecznie zarządzać swoimi rezerwacjami, pobierać materiały i przeglądać historię.",
          icon: "portal"
        },
        {
          title: "0% Prowizji i Bezpieczeństwo",
          desc: "Płatności bezpośrednio na Twoje konto Stripe/Przelewy24. Dane klientów są zaszyfrowane i w 100% Twoją własnością.",
          icon: "security"
        }
      ],
      processTitle: "Droga Do Własnego Systemu Zapisu",
      processSteps: [
        { step: "01", title: "Analiza Ścieżki Klienta", desc: "Analizujemy Twoje usługi, cennik i procedury rezerwacyjne, aby dopasować UX." },
        { step: "02", title: "Projekt i Integracja Bramki", desc: "Projektujemy unikalny kalendarz i łączymy go z systemami płatności (Stripe/PayPal)." },
        { step: "03", title: "Automatyzacja SMS i WhatsApp", desc: "Konfigurujemy natychmiastowe przypomnienia o wizytach, redukując nieobecności klientów o 90%." },
        { step: "04", title: "Wdrożenie i Szkolenie", desc: "Uruchamiamy Twój niezależny system na chmurze i przekazujemy prosty panel zarządzania." }
      ],
      packagesTitle: "Warianty Wdrożenia Systemu",
      packages: [
        {
          name: "Pakiet Light Booking",
          desc: "Idealny dla pojedynczych specjalistów (gabinety, trenerzy, doradcy) szukających automatyzacji.",
          price: "od 2 900 PLN",
          time: "10-14 dni roboczych",
          features: [
            "Kalendarz online zintegrowany ze Stripe",
            "Automatyczne powiadomienia e-mail i SMS",
            "100% responsywny design mobilny",
            "Brak miesięcznych opłat abonamentowych",
            "0% prowizji od rezerwacji"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Pakiet Salon Pro",
          desc: "Kompleksowy system dla salonów i klinik z wieloma pracownikami i grafikami.",
          price: "od 4 900 PLN",
          time: "3-4 tygodnie",
          features: [
            "Zarządzanie grafikami wielu pracowników",
            "Zaawansowany panel administratora i statystyki",
            "System zaliczek i mikropłatności online",
            "Integracja z kalendarzami Google/Outlook",
            "Baza danych klientów (CRM)"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Indywidualny Portal",
          desc: "Szyte na miarę oprogramowanie rezerwacyjne z dedykowanymi integracjami API i CRM.",
          price: "Indywidualna Wycena",
          time: "Od 5 tygodni",
          features: [
            "Integracja z zewnętrznymi bazami danych i ERP",
            "Dedykowane aplikacje mobilne PWA",
            "Niestandardowe logowanie i uwierzytelnianie",
            "Integracja z Salesforce (partnerstwo SOUBLOX)",
            "Pełne wsparcie powdrożeniowe i SLA"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Udane Wdrożenia ASM Solutions",
      showcaseDesc: "Zobacz, jak nasze prywatne systemy rezerwacji napędzają rozwój marek:",
      ctaTitle: "Chcesz przestać płacić prowizje za zapisy?",
      ctaDesc: "Zadzwoń lub napisz. Zaprojektujemy dla Ciebie system rezerwacji, który zwróci się w kilka miesięcy.",
      ctaBtn: "Zbuduj swój system zapisów"
    },
    en: {
      badge: "Direct Reservations",
      title: "Private Booking System",
      description: "Regain absolute control of your schedule, eliminate high commission portals, and offer your clients a premium direct booking experience. We engineer custom online booking calendars integrated with automated SMS/WhatsApp reminders, direct checkouts, and secure CRM tools.",
      heroImage: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Technical Standards of Our Booking System",
      features: [
        {
          title: "Mobile-First Fluidity",
          desc: "PageSpeed Score over 95%. Clients book in 15 seconds from any smartphone.",
          icon: "speed"
        },
        {
          title: "Local Discovery Optimization",
          desc: "Built-in SEO structural markup to drive traffic from Google searches directly to your book button.",
          icon: "seo"
        },
        {
          title: "Interactive Client Cabinet",
          desc: "Secure area for clients to manage active bookings, view invoices, and reschedule on their own.",
          icon: "portal"
        },
        {
          title: "0% Commissions, High Privacy",
          desc: "Funds flow directly to your Stripe account. Client data is stored in secure encrypted buckets under your control.",
          icon: "security"
        }
      ],
      processTitle: "Implementation Roadmap",
      processSteps: [
        { step: "01", title: "UX Strategy & Mapping", desc: "We analyze your service structure, cancellation policy, and client journey." },
        { step: "02", title: "Calendar Engineering", desc: "We build your custom direct booking calendar and integrate safe payment processors." },
        { step: "03", title: "Messaging Automation", desc: "We configure SMS & email triggers to reduce no-shows by up to 90%." },
        { step: "04", title: "Launch & Empowerment", desc: "We deploy the platform to lightning-fast cloud servers and train you on managing it." }
      ],
      packagesTitle: "Flexible Implementation Plans",
      packages: [
        {
          name: "Light Booking Tier",
          desc: "Perfect for single practitioners (therapists, consultants, coaches) seeking automated booking.",
          price: "from $750",
          time: "10-14 business days",
          features: [
            "Custom booking flow with Stripe checkout",
            "Automated email and SMS confirmations",
            "100% responsive mobile-first UI",
            "No recurring subscription fees",
            "0% commission per reservation"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Salon Pro Tier",
          desc: "Complete business scheduler for salons or clinics with multiple staff schedules.",
          price: "from $1,250",
          time: "3-4 weeks",
          features: [
            "Multi-staff schedules and roster management",
            "Advanced dashboard and analytics metrics",
            "Deposit payment triggers and micro-transactions",
            "Google/Outlook calendars bidirectional sync",
            "Integrated customer CRM database"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Enterprise Portal",
          desc: "Fully tailored booking portal for larger organizations with custom API requirements.",
          price: "Custom Quote",
          time: "From 5 weeks",
          features: [
            "Sync with custom backoffice ERP systems",
            "PWA mobile-app installation prompts",
            "Advanced custom secure credentials login",
            "Salesforce CRM cloud architecture integration",
            "Full priority SLA service contract"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Success Stories Under This Standard",
      showcaseDesc: "Explore how our direct reservation engines are maximizing efficiency:",
      ctaTitle: "Ready to reclaim 100% of your booking revenue?",
      ctaDesc: "Schedule a technical consultation to scope out your custom Direct Reservation portal.",
      ctaBtn: "Build Your Booking System"
    },
    br: {
      badge: "Reservas Diretas",
      title: "Sistema Privado de Reservas",
      description: "Recupere o controle total da sua agenda, elimine as comissões de aplicativos intermediários e ofereça aos seus clientes uma experiência VIP de agendamento direto. Desenvolvemos motores de reservas online sob medida, com notificações automáticas via WhatsApp/SMS, checkout de pagamento integrado e banco de dados seguro.",
      heroImage: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Diferenciais Técnicos do Nosso Sistema de Reservas",
      features: [
        {
          title: "Fluidez Mobile-First",
          desc: "Pontuação PageSpeed acima de 95%. Agendamentos rápidos em apenas 15 segundos no celular.",
          icon: "speed"
        },
        {
          title: "SEO Local de Alta Performance",
          desc: "Otimização semântica focada no Google Maps para atrair clientes locais organicamente.",
          icon: "seo"
        },
        {
          title: "Área do Cliente Interativa",
          desc: "Espaço exclusivo para clientes gerenciarem agendamentos, verem históricos e efetuarem pagamentos.",
          icon: "portal"
        },
        {
          title: "Taxa Zero e Segurança Estrita",
          desc: "Dinheiro cai direto na sua conta Stripe ou ASAAS. Sem intermediários abocanhando seus lucros.",
          icon: "security"
        }
      ],
      processTitle: "Passo a Passo da Implementação",
      processSteps: [
        { step: "01", title: "Mapeamento e Fluxo", desc: "Analisamos seus serviços, regras de cancelamento e jornada de conversão do cliente." },
        { step: "02", title: "Desenvolvimento e Pagamentos", desc: "Construímos o calendário personalizado e integramos gateway de pagamentos seguro." },
        { step: "03", title: "Automação WhatsApp/SMS", desc: "Disparamos lembretes automáticos pré-agendados para reduzir faltas em até 90%." },
        { step: "04", title: "Lançamento e Painel", desc: "Ativamos sua plataforma na nuvem rápida CDN e entregamos painel administrativo intuitivo." }
      ],
      packagesTitle: "Opções de Implementação",
      packages: [
        {
          name: "Plano Profissional Individual",
          desc: "Ideal para especialistas autônomos (médicos, terapeutas, consultores) automatizarem sua agenda.",
          price: "a partir de R$ 3.500",
          time: "10-14 dias úteis",
          features: [
            "Calendário integrado com Stripe/ASAAS",
            "Lembretes automáticos por WhatsApp e e-mail",
            "Design responsivo adaptado para celulares",
            "Sem taxas recorrentes por agendamento",
            "Comissão zero (0%) nas reservas"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Plano Clínicas & Salões",
          desc: "Sistema completo para salões ou clínicas que possuem múltiplos profissionais e agendas independentes.",
          price: "a partir de R$ 5.900",
          time: "3-4 semanas",
          features: [
            "Múltiplos profissionais com agendas e comissões",
            "Painel administrativo avançado de relatórios",
            "Sistema de cobrança de sinal/garantia de reserva",
            "Sincronização com Google Calendar/Outlook",
            "Banco de dados integrado de clientes (CRM)"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Portal Corporativo Custom",
          desc: "Solução robusta e totalmente customizável via API para grandes operações e franquias.",
          price: "Sob Consulta",
          time: "A partir de 5 semanas",
          features: [
            "Sincronização nativa com ERP de retaguarda",
            "Instalabilidade de Aplicativo Móvel PWA",
            "Autenticação segura customizada de nível bancário",
            "Integração com Salesforce CRM Cloud",
            "Acordo de Nível de Serviço (SLA) prioritário"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Casos de Sucesso ASM Solutions",
      showcaseDesc: "Veja como nossos sistemas de agendamento estão gerando faturamento real:",
      ctaTitle: "Pronto para zerar as comissões de terceiros?",
      ctaDesc: "Agende uma sessão estratégica gratuita para desenharmos o seu fluxo de reservas diretas.",
      ctaBtn: "Criar Meu Sistema de Reservas"
    },
    es: {
      badge: "Reservas Directas",
      title: "Sistema Privado de Reservas",
      description: "Recupera el control absoluto de tu agenda, elimina las altas comisiones de las aplicaciones intermediarias y ofrece a tus clientes una experiencia de reservas directa y prémium. Diseñamos sistemas de reserva online a medida integrados con recordatorios automatizados de WhatsApp/SMS, pasarelas de pago y base de datos privada.",
      heroImage: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Características de Nuestro Sistema de Reservas",
      features: [
        {
          title: "Velocidad Fluida Móvil",
          desc: "Puntuación PageSpeed por encima del 95%. Reservas rápidas en 15 segundos desde cualquier teléfono.",
          icon: "speed"
        },
        {
          title: "SEO Local e Integración Google Maps",
          desc: "Código estructurado semánticamente para destacar en búsquedas locales y atraer tráfico cualificado.",
          icon: "seo"
        },
        {
          title: "Área Privada del Cliente",
          desc: "Panel interactivo donde los clientes pueden gestionar sus citas, ver facturas y reprogramar de forma autónoma.",
          icon: "portal"
        },
        {
          title: "0% Comisiones e Independencia",
          desc: "Los pagos se procesan directamente a tu Stripe. Los datos de tus clientes te pertenecen de forma exclusiva.",
          icon: "security"
        }
      ],
      processTitle: "Hoja de Ruta de Implementación",
      processSteps: [
        { step: "01", title: "Análisis de Experiencia (UX)", desc: "Analizamos tu cartera de servicios, horarios y políticas de cancelación para un diseño óptimo." },
        { step: "02", title: "Estructuración y Pagos", desc: "Diseñamos el calendario interactivo a medida e integramos pasarelas de pago seguras." },
        { step: "03", title: "Automatización SMS/WhatsApp", desc: "Configuramos alertas de proximidad automáticas para reducir el absentismo en un 90%." },
        { step: "04", title: "Puesta en Marcha", desc: "Instalamos tu sistema en servidores CDN hiperrápidos y te formamos en su administración sencilla." }
      ],
      packagesTitle: "Planes Disponibles",
      packages: [
        {
          name: "Plan Profesional Autónomo",
          desc: "Ideal para expertos individuales (terapeutas, consultores, instructores) que buscan automatizar citas.",
          price: "desde 790 €",
          time: "10-14 días laborables",
          features: [
            "Calendario interactivo integrado con Stripe",
            "Mensajes automáticos por email y recordatorios",
            "Diseño optimizado 100% para dispositivos móviles",
            "Sin cuotas de suscripción obligatorias",
            "Cero comisiones por cada reserva"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Plan Clínicas & Salones",
          desc: "Sistema completo para salones, centros de estética o clínicas con múltiples profesionales y turnos.",
          price: "desde 1.290 €",
          time: "3-4 semanas",
          features: [
            "Gestión de múltiples agendas y empleados",
            "Panel administrativo con métricas e informes",
            "Cobro de señas de garantía de forma online",
            "Sincronización con Google Calendar y Outlook",
            "Registro privado de clientes y fichas de historial"
          ],
          actionCode: "light_booking"
        },
        {
          name: "Portal de Reservas VIP",
          desc: "Plataforma de alta gama para grandes volúmenes, franquicias o requisitos de integración API avanzados.",
          price: "Presupuesto a Medida",
          time: "Desde 5 semanas",
          features: [
            "Sincronización nativa con ERP corporativo",
            "Instalación de aplicación móvil nativa PWA",
            "Acceso ultra-seguro mediante enlaces mágicos",
            "Integración Salesforce CRM Cloud Enterprise",
            "Contrato de soporte y mantenimiento prioritario SLA"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Casos de Éxito ASM Solutions",
      showcaseDesc: "Explora cómo nuestros sistemas de reserva directa están optimizando el día a día:",
      ctaTitle: "¿Quieres librarte del 20% de comisión de los portales?",
      ctaDesc: "Reserva una sesión de consultoría técnica gratuita para planificar tu propio sistema de citas privadas.",
      ctaBtn: "Crear Mi Sistema de Citas"
    }
  },
  'deliveryhub': {
    pl: {
      badge: "Dostawy Bez Prowizji",
      title: "Plataforma DeliveryHub",
      description: "Twój własny system zamówień online i logistyki dostaw bezpośrednich bez pośredników. Oszczędzaj tysiące złotych miesięcznie na prowizjach UberEats/Volt/Pyszne, buduj lojalną bazę klientów i zarządzaj zamówieniami z poziomu jednego szybkiego panelu.",
      heroImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Dedykowane Rozwiązania Logistyczne DeliveryHub",
      features: [
        {
          title: "Szybkie Zamówienia (Instalacja PWA)",
          desc: "Wyjątkowo lekki proces zamówień. Możliwość dodania ikony platformy na ekran główny telefonu klienta.",
          icon: "speed"
        },
        {
          title: "Wyszukiwanie i Kupony SEO",
          desc: "Integracja z kampaniami reklamowymi, systemy kuponów zniżkowych i programów partnerskich.",
          icon: "seo"
        },
        {
          title: "Inteligentne Strefy Dostaw",
          desc: "Precyzyjne wyznaczanie stref dostaw na mapie na podstawie kodu pocztowego lub promienia km z dynamiczną ceną.",
          icon: "portal"
        },
        {
          title: "Bezpieczne Płatności i Brak Prowizji",
          desc: "0% prowizji od transakcji. Pieniądze bezpośrednio trafiają na Twoje konto bankowe w czasie rzeczywistym.",
          icon: "security"
        }
      ],
      processTitle: "Jak Uruchamiamy DeliveryHub?",
      processSteps: [
        { step: "01", title: "Projektowanie Menu i Cen", desc: "Definiujemy menu, modyfikatory potraw, strefy dostaw i ceny transportu." },
        { step: "02", title: "Wdrożenie Platformy Online", desc: "Konfigurujemy ultraszybki portal zamówień z koszykiem zakupowym i płatnościami online." },
        { step: "03", title: "Instalacja Panelu Operacyjnego", desc: "Uruchamiamy terminal dla Twoich kurierów lub obsługi restauracji/sklepu." },
        { step: "04", title: "Szkolenie i Start", desc: "Podłączamy bramki płatnicze, testujemy proces i uruchamiamy pierwszą sprzedaż." }
      ],
      packagesTitle: "Warianty Wdrożenia DeliveryHub",
      packages: [
        {
          name: "DeliveryHub Starter",
          desc: "Niezależny kanał zamówień online dla małych lokali gastronomicznych lub sklepów lokalnych.",
          price: "od 3 400 PLN",
          time: "10-14 dni roboczych",
          features: [
            "Strona zamówień online zintegrowana ze Stripe",
            "Zarządzanie strefami dostaw i kosztem transportu",
            "Panel odbioru zamówień na tablecie lub telefonie",
            "Moduł kodów rabatowych i promocji",
            "Brak prowizji i abonamentów od sprzedaży"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Premium",
          desc: "Pełna platforma z automatyczną logistyką, modułem dla kurierów i geofencingiem.",
          price: "od 5 900 PLN",
          time: "3-4 tygodnie",
          features: [
            "Wszystkie funkcje Starter + dedykowany panel kuriera",
            "Automatyczne rozdzielanie zleceń na mapie",
            "Moduł powiadomień SMS o statusie dostawy",
            "Obsługa płatności mobilnych (Blik, Apple/Google Pay)",
            "Zaawansowane raporty i statystyki sprzedaży"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Multi-Outlet",
          desc: "Zaawansowana sieć logistyczna dla sieci restauracji, dark kitchen lub franczyz.",
          price: "Indywidualna Wycena",
          time: "Od 6 tygodni",
          features: [
            "Obsługa wielu lokalizacji pod jedną domeną",
            "Inteligentne przekazywanie zamówień do najbliższego punktu",
            "Dedykowana aplikacja mobilna dla klientów",
            "Integracja z systemami POS i oprogramowaniem ERP",
            "Rozbudowany system lojalnościowy dla klientów"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Realizacje Wykorzystujące Standard DeliveryHub",
      showcaseDesc: "Sprawdź, jak nasi partnerzy budują dochodowe dowozy bez pośredników:",
      ctaTitle: "Zacznij zarabiać więcej na każdym dowozie",
      ctaDesc: "Zadzwoń do nas. Obliczymy, o ile wzrośnie Twoja marża po rezygnacji z prowizji platform pośredniczących.",
      ctaBtn: "Skonfiguruj swój DeliveryHub"
    },
    en: {
      badge: "Commission-Free Delivery",
      title: "DeliveryHub Platform",
      description: "Your own direct online ordering system and delivery dispatch workflow with zero marketplace commissions. Save thousands monthly, own your customer relationships, and control your restaurant or shop delivery system from a unified high-speed console.",
      heroImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Dedicated DeliveryHub Logistics Solutions",
      features: [
        {
          title: "Speedy Checkouts (PWA App Options)",
          desc: "Super-light ordering pipeline. Prompt customers to add your DeliveryHub directly to their homescreen.",
          icon: "speed"
        },
        {
          title: "SEO campaigns & Coupon Systems",
          desc: "Full integration with ad tags, flexible discount codes, dynamic promotional campaigns and social campaigns.",
          icon: "seo"
        },
        {
          title: "Smart Delivery Geofencing",
          desc: "Define custom polygons on maps by zip codes or kilometer radii with tiered pricing for delivery distance.",
          icon: "portal"
        },
        {
          title: "Safe Realtime Payouts",
          desc: "0% commission fees on sales. Revenue is sent instantly to your connected bank account via direct gateways.",
          icon: "security"
        }
      ],
      processTitle: "How We Deploy DeliveryHub",
      processSteps: [
        { step: "01", title: "Menu & Fee Structuring", desc: "We structure your digital menu, customization options, delivery grids, and delivery pricing." },
        { step: "02", title: "Portal Implementation", desc: "We deploy the fast digital storefront with modern checkout and payment gateways." },
        { step: "03", title: "Tablet Console Setup", desc: "We install the operations dashboard for your staff to manage incoming dispatches." },
        { step: "04", title: "Live Launch & Training", desc: "We connect active payments, test dispatches, and go live for your audience." }
      ],
      packagesTitle: "DeliveryHub Configurations",
      packages: [
        {
          name: "DeliveryHub Starter",
          desc: "Independent online ordering channel for small eateries, local bakers, or specialty shops.",
          price: "from $890",
          time: "10-14 business days",
          features: [
            "High-speed digital ordering menu with Stripe",
            "Delivery zone configurations and fee tiering",
            "Inbound order console accessible from any tablet",
            "Promotional discounts and coupons engine",
            "Zero sales commission fees forever"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Premium",
          desc: "Fully automated fleet coordinator with dedicated driver interfaces and automated route dispatching.",
          price: "from $1,550",
          time: "3-4 weeks",
          features: [
            "All Starter features + dedicated driver dashboard",
            "Automated order routing on live maps",
            "Automated SMS/WhatsApp status updates for customers",
            "Mobile payment integrations (Apple/Google Pay)",
            "Advanced sales reports and delivery driver analytics"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Multi-Outlet",
          desc: "Scale-ready dispatch network for franchise systems, ghost kitchens, or multiple brands.",
          price: "Custom Quote",
          time: "From 6 weeks",
          features: [
            "Multi-location mapping under a unified system",
            "Auto-routing to closest kitchen outlet",
            "Bespoke branded mobile apps for clients",
            "POS and ERP cloud database syncing",
            "Advanced loyalty tiers and client retention"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Projects Leveraging DeliveryHub Core",
      showcaseDesc: "See how our partners are scaling profitable direct home-delivery fleets:",
      ctaTitle: "Maximize profit on every single home delivery",
      ctaDesc: "Contact our team to estimate how much margin you will reclaim by dropping third-party app aggregators.",
      ctaBtn: "Deploy Your DeliveryHub"
    },
    br: {
      badge: "Delivery Sem Taxas",
      title: "Plataforma DeliveryHub",
      description: "Seu sistema próprio de pedidos online e gestão de entregas locais sem tarifas abusivas de aplicativos corporativos. Economize milhares de reais mensais em taxas de comissão, possua os dados de seus clientes e controle toda a logística em um painel unificado e rápido.",
      heroImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Diferenciais de Logística do DeliveryHub",
      features: [
        {
          title: "Pedido Expresso (Aplicativo PWA)",
          desc: "Jornada de pedido ultrarrápida. Permita que os clientes instalem seu DeliveryHub diretamente na tela inicial do smartphone.",
          icon: "speed"
        },
        {
          title: "Marketing e Cupons de Desconto",
          desc: "Integração nativa com campanhas de anúncios, cupons flexíveis e promoções de atração direta.",
          icon: "seo"
        },
        {
          title: "Zonas de Entrega por Raio",
          desc: "Desenhe raios de quilometragem e CEPs diretamente no mapa com custos de entrega dinâmicos por distância.",
          icon: "portal"
        },
        {
          title: "Pagamentos Diretos e Seguros",
          desc: "Zero taxas de comissão. As vendas caem na sua conta bancária sem prazos abusivos ou intermediários.",
          icon: "security"
        }
      ],
      processTitle: "Processo de Implantação",
      processSteps: [
        { step: "01", title: "Cardápio e Configurações", desc: "Estruturamos seu cardápio, complementos, taxas de entrega e bairros atendidos." },
        { step: "02", title: "Publicação do Portal", desc: "Ativamos seu canal de vendas com checkout direto de carregamento instantâneo." },
        { step: "03", title: "Terminal do Estabelecimento", desc: "Instalamos o dashboard operacional para que sua equipe receba e gerencie os pedidos." },
        { step: "04", title: "Start Operacional", desc: "Configuramos pagamentos online seguros (Pix/Cartão) e iniciamos as vendas diretas." }
      ],
      packagesTitle: "Modelos DeliveryHub",
      packages: [
        {
          name: "DeliveryHub Starter",
          desc: "Canal de vendas direto e independente para restaurantes, docerias ou lojas de nicho.",
          price: "a partir de R$ 4.200",
          time: "10-14 dias úteis",
          features: [
            "Cardápio digital de alto desempenho integrado com Pix/Stripe",
            "Zonas de frete customizadas por distância ou bairro",
            "Painel de recepção de pedidos para celular ou tablet",
            "Gerador de cupons de desconto e campanhas promocionais",
            "Sem mensalidade obrigatória ou cobrança por venda"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Premium",
          desc: "Sistema logístico automatizado com terminal para entregadores, rotas inteligentes e notificações.",
          price: "a partir de R$ 6.900",
          time: "3-4 semanas",
          features: [
            "Todos os recursos do Starter + aplicativo do entregador",
            "Roteamento otimizado de despacho de entregas no mapa",
            "Notificação em tempo real de status do pedido para o cliente",
            "Integração nativa de cartões e carteiras digitais no app",
            "Painel completo de analytics e produtividade de frota"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Multi-Estabelecimento",
          desc: "Estrutura avançada de delivery unificado para redes de franquias, dark kitchens ou multimarcas.",
          price: "Sob Consulta",
          time: "A partir de 6 semanas",
          features: [
            "Catálogo integrado com geolocalização de múltiplas lojas",
            "Despacho automatizado para a cozinha mais próxima",
            "Aplicativo nativo exclusivo publicado para clientes",
            "Sincronização bidirecional com sistemas POS/ERP",
            "Módulos avançados de cashback e fidelização"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Projetos Ativos com DeliveryHub",
      showcaseDesc: "Veja como nossos parceiros faturam mais vendendo sem taxas de delivery corporativo:",
      ctaTitle: "Turbine a margem de lucro de suas entregas hoje",
      ctaDesc: "Fale conosco. Analisaremos seu volume de pedidos e provaremos o ROI da sua plataforma de entregas diretas.",
      ctaBtn: "Criar Meu DeliveryHub"
    },
    es: {
      badge: "Pedidos a Domicilio",
      title: "Plataforma DeliveryHub",
      description: "Plataforma propia de pedidos directos a domicilio y despacho de entregas sin comisiones de intermediarios. Ahorra miles de euros mensuales en cuotas abusivas de agregadores, mantén el control de tus clientes y gestiona todo el flujo desde una consola ágil.",
      heroImage: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Soluciones de Logística Avanzada DeliveryHub",
      features: [
        {
          title: "Compra Rápida Móvil (Instalación PWA)",
          desc: "Carrito optimizado. Facilita que tus clientes fijos agreguen tu DeliveryHub como acceso directo.",
          icon: "speed"
        },
        {
          title: "Marketing Local y Fidelización",
          desc: "Perfecta integración con píxeles publicitarios, campañas de fidelidad y códigos de descuento dinámicos.",
          icon: "seo"
        },
        {
          title: "Zonas de Envío Inteligentes",
          desc: "Dibuja límites de reparto por códigos postales o radios de kilómetros con precios de envío por franjas.",
          icon: "portal"
        },
        {
          title: "Pasarela Directa de Pagos Seguros",
          desc: "0% comisiones en las transacciones de venta. Dinero disponible al instante en tu banco sin retrasos.",
          icon: "security"
        }
      ],
      processTitle: "Cómo Lanzamos Tu DeliveryHub",
      processSteps: [
        { step: "01", title: "Menú y Tarifas de Envío", desc: "Definimos categorías del menú, modificadores de productos, precios y áreas de reparto." },
        { step: "02", title: "Publicación del Portal", desc: "Activamos tu escaparate digital con un checkout ágil y pasarelas de pago seguras." },
        { step: "03", title: "Instalación del Panel", desc: "Configuramos el monitor de recepción de pedidos en local para agilizar la preparación." },
        { step: "04", title: "Pruebas de Reparto y Éxito", desc: "Conectamos los flujos de cobro, realizamos despachos de prueba y lanzamos el canal." }
      ],
      packagesTitle: "Planes de Configuración",
      packages: [
        {
          name: "DeliveryHub Starter",
          desc: "Canal independiente de pedidos a domicilio para pequeños restaurantes, pastelerías o tiendas locales.",
          price: "desde 950 €",
          time: "10-14 días laborables",
          features: [
            "Menú digital de pedidos rápidos integrado con Stripe",
            "Gestión flexible de zonas de reparto y precio de transporte",
            "Panel de recepción de pedidos en local para tablet o móvil",
            "Generador de promociones y cupones de descuento",
            "Sin comisiones por ventas ni cargos obligatorios mensuales"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Premium",
          desc: "Ecosistema automatizado de envío con panel de repartidores, rutas en mapa y alertas de proximidad.",
          price: "desde 1.590 €",
          time: "3-4 semanas",
          features: [
            "Todo lo del plan Starter + panel de repartidores móvil",
            "Asignación y optimización de rutas en mapa interactivo",
            "Envío automático de notificaciones de estado (WhatsApp / SMS)",
            "Integración de pagos móviles (Apple Pay / Google Pay)",
            "Panel administrativo completo de análisis y tiempos de entrega"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "DeliveryHub Multi-Local",
          desc: "Estructura logística avanzada para cadenas de restauración, franquicias o cocinas fantasma.",
          price: "Presupuesto a Medida",
          time: "Desde 6 semanas",
          features: [
            "Múltiples sucursales bajo una misma plataforma inteligente",
            "Derivación automática al local más cercano",
            "Aplicación móvil corporativa publicada para tus clientes",
            "Sincronización bidireccional con software POS y ERP",
            "Sistemas personalizados de cashback y fidelización premium"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Casos de Éxito con DeliveryHub",
      showcaseDesc: "Mira cómo nuestros clientes operan repartos directos sin perder márgenes en apps agregadoras:",
      ctaTitle: "Recupera los márgenes perdidos en el reparto a domicilio",
      ctaDesc: "Contacta con nosotros. Evaluaremos tu modelo y estimaremos el retorno de tu propio canal DeliveryHub.",
      ctaBtn: "Implementar Mi DeliveryHub"
    }
  },
  'restaurant': {
    pl: {
      badge: "Nowoczesna Gastronomia",
      title: "Sistemas dla Restauracji",
      description: "Wielofunkcyjne systemy cyfrowe dla sektora restauracyjnego i kawiarni. Wdrażamy ekosystemy obejmujące cyfrowe menu QR przy stolikach, bezobsługowe zamawianie i płatności bezpośrednio przy stoliku, panele kuchenne (KDS) oraz systemy budujące bezpośrednie bazy lojalnych klientów bez prowizji.",
      heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Standard Technologiczny Systemów Gastronomicznych",
      features: [
        {
          title: "Szybkie Menu QR na Stolikach",
          desc: "Bez pobierania aplikacji, gość skanuje kod QR na stoliku, przegląda menu w ułamku sekundy i składa zamówienie.",
          icon: "speed"
        },
        {
          title: "Automatyczna Lojalność i Powracalność",
          desc: "System automatycznie zbiera kontakty do gości, oferując kupony i programy lojalnościowe zachęcające do powrotu.",
          icon: "seo"
        },
        {
          title: "Integracja z Kuchnią (KDS)",
          desc: "Zamówienia ze stolików natychmiast trafiają na ekrany kucharzy, eliminując błędy kelnerskie i przyspieszając obsługę o 30%.",
          icon: "portal"
        },
        {
          title: "Płatności Przy Stoliku (Stripe/Blik)",
          desc: "Goście mogą dzielić rachunki i opłacać je bezpośrednio ze swoich telefonów przy użyciu bezpiecznych bramek płatności.",
          icon: "security"
        }
      ],
      processTitle: "Droga Do Cyfryzacji Twojego Lokalu",
      processSteps: [
        { step: "01", title: "Audyt i Mapa Stołów", desc: "Analizujemy rozkład Twojej restauracji, strukturę menu i procedury obsługi kelnerskiej." },
        { step: "02", title: "Tworzenie Cyfrowego Ekosystemu", desc: "Zaprojektujemy unikalne, interaktywne menu QR, dopasowane do identyfikacji wizualnej Twojej marki." },
        { step: "03", title: "Uruchomienie Bramki i Powiadomień", desc: "Wdrażamy bezpieczne i szybkie płatności mobilne zintegrowane z powiadomieniami dla kelnerów." },
        { step: "04", title: "Testy i Szkolenie Zespołu", desc: "Szkolimy kelnerów i kucharzy, dostarczamy gotowe kody QR na stoły i uruchamiamy system." }
      ],
      packagesTitle: "Warianty Wdrożenia Systemów Gastronomicznych",
      packages: [
        {
          name: "Digital QR Menu",
          desc: "Interaktywne cyfrowe menu na stołach, które odciąża kelnerów i pozwala na natychmostowe zmiany dań i cen.",
          price: "od 1 900 PLN",
          time: "7-10 dni roboczych",
          features: [
            "Interaktywne menu QR z podziałem na kategorie",
            "Nielimitowane zmiany potraw, cen i opisów w czasie rzeczywistym",
            "Optymalizacja pod kątem zdjęć dań i alergenów",
            "Zgodność z urządzeniami mobilnymi iOS/Android",
            "Brak abonamentów i opłat prowizyjnych"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Smart Dining Pro",
          desc: "Pełny system zamówień bezpośrednio ze stolików z płatnościami mobilnymi i powiadomieniami.",
          price: "od 4 500 PLN",
          time: "2-3 tygodnie",
          features: [
            "Wszystkie korzyści Digital QR Menu",
            "Zamawianie bezpośrednio przy stolikach z przypisaniem numeru stołu",
            "Szybkie płatności online (Blik, Apple Pay, Google Pay, Stripe)",
            "Dedykowany panel obsługi kelnerskiej i KDS dla kuchni",
            "Moduł zbierania napiwków i opinii gości"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Enterprise Restaurant",
          desc: "Szyty na miarę, kompletny ekosystem dla sieci franczyzowych i dużych restauracji.",
          price: "Indywidualna Wycena",
          time: "Od 5 tygodni",
          features: [
            "Pełna, dwukierunkowa integracja z POS (np. POSbistro, Gastro)",
            "Niestandardowe aplikacje lojalnościowe i kuponowe PWA",
            "Rozbudowany moduł raportów analitycznych i sprzedaży",
            "Niezależny serwer i dedykowana baza danych gości",
            "Menedżer konta i wsparcie techniczne 24/7 (SLA)"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Restauracje Rozwijające Się Dzięki ASM Solutions",
      showcaseDesc: "Zobacz, jak cyfrowe innowacje zwiększają obroty i skracają czas obsługi w lokalach naszych partnerów:",
      ctaTitle: "Zwiększ rotację stolików o 20% i odciąż swoich kelnerów",
      ctaDesc: "Skontaktuj się z nami. Pokażemy Ci, jak technologia ASM podnosi średnią wartość rachunku i zadowolenie gości.",
      ctaBtn: "Wdróż inteligentną gastronomię"
    },
    en: {
      badge: "Smart Dining",
      title: "Restaurant Systems",
      description: "Comprehensive digital software ecosystems for restaurants, cafés, and gastropubs. We deploy interlinked tools including table-side interactive QR menus, seamless self-ordering checkout, kitchen display systems (KDS), and independent customer retention databases.",
      heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Technical Capabilities of Our Restaurant Ecosystem",
      features: [
        {
          title: "High-Speed QR Menus",
          desc: "No app downloads needed. Diners scan, browse high-res culinary images, and order in under 10 seconds.",
          icon: "speed"
        },
        {
          title: "Direct Loyalty Capture",
          desc: "Capture secure contact details, offer rewards, and drive direct repeat business.",
          icon: "seo"
        },
        {
          title: "Kitchen display screen sync",
          desc: "Orders route instantly to kitchen monitors, cutting out waiter delays and saving up to 30% service time.",
          icon: "portal"
        },
        {
          title: "Table-side Split Checkout",
          desc: "Empower guests to divide, pay, and tip safely using Apple Pay, Google Pay, or direct cards.",
          icon: "security"
        }
      ],
      processTitle: "Modernization Lifecycle",
      processSteps: [
        { step: "01", title: "Audit & Dining Plan", desc: "We review your seating configuration, menu constraints, and staff service patterns." },
        { step: "02", title: "Custom Branding Assets", desc: "We style your dynamic digital catalog to match your hospitality brand's aesthetic." },
        { step: "03", title: "Mobile Billing Sync", desc: "We connect fast mobile checkout with instant ticket notifications for floor staff." },
        { step: "04", title: "Floor Go-Live & Test", desc: "We train staff, distribute custom table codes, and go live during active dining." }
      ],
      packagesTitle: "Restaurant Configurations",
      packages: [
        {
          name: "Digital QR Menu",
          desc: "Sleek table menus that free up floor staff and support real-time changes to dishes and pricing.",
          price: "from $490",
          time: "7-10 business days",
          features: [
            "Category-structured visual QR menu",
            "Unlimited real-time updates for items, availability, and prices",
            "Optimized for high-res food images and allergy specs",
            "100% compatible with all iOS and android smartphone browsers",
            "No ongoing monthly subscriptions or commission percentages"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Smart Dining Pro",
          desc: "Interactive self-ordering direct from tables with integrated credit cards checkout.",
          price: "from $1,150",
          time: "2-3 weeks",
          features: [
            "All Digital QR Menu advantages + table order routing",
            "Self-ordering with auto-mapping to table numbers",
            "Secure online transactions (Stripe, Apple Pay, Google Pay)",
            "Server dispatch screen + kitchen display system (KDS) console",
            "In-app gratuity, reviews, and floor feedback capture"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Enterprise Restaurant",
          desc: "Fully customized hospitality software for multi-brand groups or franchise structures.",
          price: "Custom Quote",
          time: "From 5 weeks",
          features: [
            "Complete bidirectional syncing with POS hardware (e.g., Gastro, Pos)",
            "Bespoke branded mobile web apps with loyalty discounts",
            "Comprehensive analytics dashboards and export metrics",
            "Dedicated private database with standalone hosting servers",
            "24/7 dedicated support representative and custom SLA"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Restaurants Scaling with ASM Solutions",
      showcaseDesc: "See how digital innovations are shortening turnaround times and boosting checks:",
      ctaTitle: "Speed up table turnovers and support your waiters",
      ctaDesc: "Contact our team. We'll show you how smart tech increases the average basket size by up to 18%.",
      ctaBtn: "Modernize Your Dining Experience"
    },
    br: {
      badge: "Tecnologia para Restaurantes",
      title: "Sistemas para Restaurantes",
      description: "Sistemas digitais integrados para restaurantes, cafeterias e bares. Implementamos cardápio interativo via QR Code, pedidos diretos da mesa sem atendente, telas de produção para cozinha (KDS) e estratégias de fidelização direta sem comissão por prato.",
      heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Diferenciais Tecnológicos Gastronômicos",
      features: [
        {
          title: "Cardápio QR Code de Alta Velocidade",
          desc: "Sem necessidade de baixar aplicativo. O cliente lê o QR Code, navega e faz o pedido em segundos.",
          icon: "speed"
        },
        {
          title: "Captação Ativa de Clientes",
          desc: "Construa uma base de contatos própria para enviar novidades e reter clientes fiéis.",
          icon: "seo"
        },
        {
          title: "Sincronização com Cozinha (KDS)",
          desc: "Os pedidos feitos na mesa aparecem instantaneamente na cozinha, reduzindo erros de garçom e economizando tempo.",
          icon: "portal"
        },
        {
          title: "Checkout e Divisão na Mesa",
          desc: "O cliente pode pagar e dividir a conta diretamente no celular via Pix ou Cartão com segurança.",
          icon: "security"
        }
      ],
      processTitle: "Etapas da Implantação",
      processSteps: [
        { step: "01", title: "Mapeamento das Mesas", desc: "Avaliamos o layout físico das mesas, estrutura de atendimento e categorias do menu." },
        { step: "02", title: "Criação do Cardápio Digital", desc: "Personalizamos o cardápio interativo com fotos de alta qualidade e identidade da marca." },
        { step: "03", title: "Ativação de Pagamentos", desc: "Habilitamos checkout rápido Pix na mesa com notificações de pedido preparadas." },
        { step: "04", title: "Entrega e Treinamento", desc: "Instalamos os códigos QR definitivos nas mesas e treinamos a equipe de salão e cozinha." }
      ],
      packagesTitle: "Nossos Planos para Alimentação",
      packages: [
        {
          name: "Digital QR Menu",
          desc: "Cardápio digital moderno nas mesas para visualização rápida. Atualize itens e preços em tempo real.",
          price: "a partir de R$ 2.500",
          time: "7-10 dias úteis",
          features: [
            "Cardápio visual QR Code dividido por seções e categorias",
            "Atualizações instantâneas de pratos, preços e fotos na hora",
            "Otimizado com imagens ricas e indicação de alergênicos",
            "Compatibilidade universal com navegadores de smartphone",
            "Sem mensalidade ou comissão sobre os pratos exibidos"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Smart Dining Pro",
          desc: "Pedidos automatizados diretamente da mesa integrados a pagamentos online.",
          price: "a partir de R$ 5.500",
          time: "2-3 semanas",
          features: [
            "Vantagens do Digital QR Menu + fechamento de pedidos",
            "Pedido por QR Code mapeado individualmente por mesa",
            "Checkout digital integrado Pix e Cartões (Stripe)",
            "Tela de visualização de pedidos para salão e tela KDS para cozinha",
            "Gestão integrada de gorjetas virtuais e avaliações"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Enterprise Restaurant",
          desc: "Plataforma avançada sob medida para grupos gastronômicos e franquias de larga escala.",
          price: "Sob Consulta",
          time: "A partir de 5 semanas",
          features: [
            "Integração bidirecional com sistemas POS físicos homologados",
            "Aplicativo PWA customizado exclusivo com clube de fidelidade",
            "Dashboard analítico centralizado de vendas e BI",
            "Servidor na nuvem e banco de dados de clientes dedicados",
            "Suporte prioritário personalizado com contrato SLA 24/7"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Restaurantes que crescem com a ASM Solutions",
      showcaseDesc: "Veja o impacto real da inovação no tempo de mesa e no ticket médio:",
      ctaTitle: "Gire suas mesas mais rápido e apoie seus garçons",
      ctaDesc: "Fale conosco. Mostraremos como nossa tecnologia eleva o ticket médio das mesas em até 18%.",
      ctaBtn: "Modernizar Meu Restaurante"
    },
    es: {
      badge: "Sistemas de Restauración",
      title: "Sistemas para Restauración",
      description: "Ecosistemas digitales integrales para hostelería, restaurantes y cafeterías. Implementamos herramientas interconectadas que incluyen menús interactivos QR por mesa, autopedido directo, pantallas de cocina (KDS) y bases de datos propias para fidelización sin comisiones.",
      heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
      featuresTitle: "Ecosistema Tecnológico para Hostelería",
      features: [
        {
          title: "Menús QR de Alta Velocidad",
          desc: "Sin descargar aplicaciones. El comensal escanea, ve fotos en alta resolución y pide en menos de 10 segundos.",
          icon: "speed"
        },
        {
          title: "Captación y Fidelización Directa",
          desc: "Registra datos de contacto de tus clientes fijos, ofrece recompensas y fomenta el retorno directo sin comisiones.",
          icon: "seo"
        },
        {
          title: "Pantallas de Cocina Sincronizadas (KDS)",
          desc: "Los pedidos llegan al instante a la pantalla de la cocina, eliminando errores de comandas y ganando un 30% de tiempo.",
          icon: "portal"
        },
        {
          title: "Pago en Mesa y División de Cuenta",
          desc: "Los comensales pueden pagar y dividir la cuenta desde sus móviles mediante pasarelas ultra-seguras.",
          icon: "security"
        }
      ],
      processTitle: "Modernización de Tu Local",
      processSteps: [
        { step: "01", title: "Auditoría de Sala y Mesas", desc: "Estudiamos la distribución de mesas, el flujo de servicio y la estructura de tu menú." },
        { step: "02", title: "Diseño del Catálogo Digital", desc: "Personalizamos tu menú interactivo QR adaptándolo a la imagen corporativa de tu marca." },
        { step: "03", title: "Integración de Cobro Móvil", desc: "Habilitamos el cobro seguro instantáneo desde la mesa con avisos en tiempo real para camareros." },
        { step: "04", title: "Pruebas de Sala y Formación", desc: "Formamos a tu equipo de cocina y sala, colocamos los códigos QR en mesa y abrimos comandas." }
      ],
      packagesTitle: "Planes Disponibles",
      packages: [
        {
          name: "Digital QR Menu",
          desc: "Carta QR dinámica y visual por mesa. Actualiza precios e ingredientes en tiempo real y agiliza la sala.",
          price: "desde 590 €",
          time: "7-10 días laborables",
          features: [
            "Menú QR estructurado por secciones y platos",
            "Modificaciones de platos, fotos y precios en tiempo real",
            "Optimizado para fotografías ricas e indicaciones de alérgenos",
            "Perfectamente compatible con todos los navegadores móviles",
            "Sin comisiones por ventas ni cargos obligatorios mensuales"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Smart Dining Pro",
          desc: "Pedidos directos desde la mesa con cobro por móvil integrado para acelerar turnos.",
          price: "desde 1.190 €",
          time: "2-3 semanas",
          features: [
            "Todas las ventajas de Digital QR Menu + envío de comandas",
            "Pedido por QR mapeado de forma internacional por mesa",
            "Pasarela de pago segura en mesa (Stripe, tarjetas, Apple/Google Pay)",
            "Pantalla de camareros y monitor KDS para cocina incluidos",
            "Gestión integrada de propinas, valoraciones y feedback directo"
          ],
          actionCode: "deliveryhub"
        },
        {
          name: "Enterprise Restaurant",
          desc: "Ecosistema integral a medida para grandes restaurantes, marcas y cadenas de franquicias.",
          price: "Presupuesto a Medida",
          time: "Desde 5 semanas",
          features: [
            "Integración de dos vías con el POS local",
            "Aplicación exclusiva PWA con club de fidelización y ventajas",
            "Panel administrativo centralizado con informes analíticos y de venta",
            "Servidor en la nube dedicado y base de datos propia de comensales",
            "Gestor de cuenta exclusivo y soporte premium 24/7 con SLA"
          ],
          actionCode: "enterprise_portal"
        }
      ],
      showcaseTitle: "Casos de Éxito ASM Solutions",
      showcaseDesc: "Mira el impacto de la digitalización en la facturación media y los tiempos de espera:",
      ctaTitle: "Optimiza la rotación de mesas y apoya a tu equipo de sala",
      ctaDesc: "Contacta con nosotros. Te mostraremos cómo la tecnología aumenta el ticket medio de las mesas en un 18%.",
      ctaBtn: "Digitalizar Mi Restaurante"
    }
  },
  'tracking': {
    pl: {
      badge: 'Zlecenia i Serwis',
      title: 'Śledzenie Statusu Napraw i Zleceń',
      description: 'Wycisz zbędne telefony od klientów dopytujących o stan realizacji naprawy. ASM Solutions buduje dedykowane systemy śledzenia statusu napraw, zleceń i logistyki operacyjnej dla serwisów, warsztatów, firm logistycznych i zespołów serwisowych z automatycznymi powiadomieniami SMS/WhatsApp.',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Architektura Śledzenia i Logistyki',
      features: [
        {
          title: 'Szybki Portal Statusów',
          desc: 'Klienci sprawdzają stan zlecenia wpisując kod lub numer rejestracyjny. Bez logowania, haseł i skomplikowanych procedur.',
          icon: 'speed'
        },
        {
          title: 'Automatyzacja Powiadomień',
          desc: 'Błyskawiczna zmiana statusu w panelu automatycznie wysyła spersonalizowany SMS lub e-mail z podsumowaniem i wyceną.',
          icon: 'seo'
        },
        {
          title: 'Wewnętrzny Panel Serwisanta',
          desc: 'Prosty tabletowy interfejs dla techników do odznaczania etapów, robienia zdjęć usterek i dodawania części zamiennych.',
          icon: 'portal'
        },
        {
          title: 'Integracja z Fakturowaniem',
          desc: 'System automatycznie generuje protokół odbioru PDF, dolicza koszt części i wystawia fakturę VAT po kliknięciu "Gotowe".',
          icon: 'security'
        }
      ],
      processTitle: 'Jak Wygląda Proces Wdrożenia?',
      processSteps: [
        { step: '01', title: 'Struktura Statusów', desc: 'Mapujemy etapy Twojego serwisu (np. przyjęcie, diagnoza, naprawa, kontrola jakości, gotowe).' },
        { step: '02', title: 'Projekt Portalu i Panelu', desc: 'Budujemy intuicyjną wyszukiwarkę dla klienta oraz wygodny system odznaczania prac dla serwisantów.' },
        { step: '03', title: 'Integracja SMS i API', desc: 'Konfigurujemy bramki SMS (SMSAPI) oraz systemy fakturowania i płatności online za części.' },
        { step: '04', title: 'Szkolenie i Launch', desc: 'Wdrażamy system w Twoim serwisie, instalujemy na urządzeniach i uruchamiamy bezpieczną bazę danych.' }
      ],
      packagesTitle: 'Dostępne Pakiety Wdrożeniowe',
      packages: [
        {
          name: 'Szybki Portal Statusów',
          desc: 'Niezależny system wyszukiwania i sprawdzania statusów napraw online zintegrowany z podstawowym SMS.',
          price: 'od 2 900 PLN',
          time: '7-12 dni roboczych',
          features: [
            'Wyszukiwanie zlecenia po kodzie lub numerze telefonu',
            'Dynamiczny pasek postępu (3-5 etapów)',
            'Powiadomienia SMS i E-mail o statusie "Gotowe"',
            'Baza danych zleceń (do 1 000 aktywnych kart rocznie)',
            'Pełne dostosowanie do logo i kolorów Twojej firmy'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Serwis Operacyjny Pro',
          desc: 'Kompleksowy system ERP dla serwisu. Karty pracy, przypisywanie mechaników, kontrola magazynu i części.',
          price: 'od 4 900 PLN',
          time: '3-4 tygodnie',
          features: [
            'Wszystko z portalu statusów + nielimitowane zlecenia',
            'Dedykowane konta dla mechaników / techników z różnymi uprawnieniami',
            'Magazyn części i automatyczne doliczanie cen do zlecenia',
            'Integracja z systemem fakturowania i płatnościami online',
            'Generowanie raportów PDF i wysyłka faktur na e-mail'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Zwiększ Wydajność i Zaufanie Klientów",
      showcaseDesc: "Przejrzysta informacja o statusie zlecenia skraca czas rozmów telefonicznych o 68% i buduje reputację nowoczesnej marki.",
      ctaTitle: "Odzyskaj czas i uporządkuj pracę swojego serwisu",
      ctaDesc: "Skontaktuj się z nami. Pokażemy Ci, jak wdrożenie cyfrowego systemu śledzenia przyspieszy obieg dokumentów i zleceń.",
      ctaBtn: "Uruchom Cyfrowy Serwis"
    },
    en: {
      badge: 'Operational Efficiency',
      title: 'Service Order & Repair Tracking Systems',
      description: 'Eliminate repetitive customer calls asking "is my device ready?". ASM Solutions builds independent, real-time service tracking portals and team dashboards with automated SMS/email alerts for repair shops, logistics centers, and service teams.',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Operational Clarity Platform',
      features: [
        {
          title: 'Express Status Lookup',
          desc: 'Clients check repair status instantly by typing their order number or car plates. No log-ins or passwords needed.',
          icon: 'speed'
        },
        {
          title: 'Automated Status Alerts',
          desc: 'Updating status in the technician panel triggers instant, personalized SMS / Email updates with payment links.',
          icon: 'seo'
        },
        {
          title: 'Technician Command Board',
          desc: 'Clean, tablet-friendly interface for engineers to record repair diagnostics, upload photos, and list replaced parts.',
          icon: 'portal'
        },
        {
          title: 'Billing Integration',
          desc: 'Generates secure PDF service protocols, estimates, and tax invoices instantly upon repair completion.',
          icon: 'security'
        }
      ],
      processTitle: 'The Implementation Process',
      processSteps: [
        { step: '01', title: 'Workflow Setup', desc: 'We structure the precise stages of your technical pipeline.' },
        { step: '02', title: 'Panel Development', desc: 'We construct both the client tracking view and the internal technician logs.' },
        { step: '03', title: 'Integrations', desc: 'We bridge automated SMS gateways and invoicing tools.' },
        { step: '04', title: 'Deployment', desc: 'We push the system live, integrate with tablets, and secure the data pipeline.' }
      ],
      packagesTitle: 'Available Service Packages',
      packages: [
        {
          name: 'Standard Tracking Portal',
          desc: 'Independent tracking lookup interface for clients integrated with automated status triggers.',
          price: 'from $750',
          time: '7-12 business days',
          features: [
            'Search order by tracking ID or phone number',
            'Interactive progress bar with custom milestones',
            'Instant SMS & Email notifications on completion',
            'Secure database support (up to 1,000 cases/year)',
            'Fully branded with your corporate color scheme'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Service Command Pro',
          desc: 'Full-featured operational ERP. Digital timesheets, tech assignments, inventory management, and automated checkout.',
          price: 'from $1,250',
          time: '3-4 weeks',
          features: [
            'All Tracking features + unlimited orders',
            'Individual technician portals with access levels',
            'Internal spare parts inventory and pricing calculator',
            'Direct connection to invoicing systems and online checkouts',
            'Automated PDF protocols sent straight to client email'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Maximize Team Velocity & Client Trust",
      showcaseDesc: "Transparency in repairs cuts support phone overhead by 68% and positions your business as a digital industry leader.",
      ctaTitle: "Bring structure and speed to your service team",
      ctaDesc: "Contact us today. Let's build a dedicated, automated service platform that makes manual status tracking a thing of the past.",
      ctaBtn: "Launch My Service Hub"
    },
    br: {
      badge: 'Clareza Operacional',
      title: 'Rastreamento de Ordens de Serviço (O.S.)',
      description: 'Zere as ligações repetitivas de clientes perguntando se o serviço está pronto. A ASM Solutions cria portais próprios de rastreamento de ordens de serviço e manutenção em tempo real com alertas automáticos via WhatsApp/SMS.',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Tecnologia Aplicada à Sua Operação',
      features: [
        {
          title: 'Busca Rápida de Status',
          desc: 'Seu cliente digita o código da O.S. ou placa do veículo e acompanha as etapas sem precisar de senhas.',
          icon: 'speed'
        },
        {
          title: 'Notificações Automáticas',
          desc: 'Ao avançar a etapa no painel técnico, o sistema envia na hora um WhatsApp/SMS informando o status.',
          icon: 'seo'
        },
        {
          title: 'Painel do Técnico',
          desc: 'Plataforma leve para uso em tablets na oficina, permitindo registrar fotos de peças e tempo gasto.',
          icon: 'portal'
        },
        {
          title: 'Faturamento Automatizado',
          desc: 'Criação do PDF de diagnóstico, soma de peças e emissão de cobrança integrada ao Pix.',
          icon: 'security'
        }
      ],
      processTitle: 'Como Funciona o Processo de Criação?',
      processSteps: [
        { step: '01', title: 'Mapeamento das Etapas', desc: 'Definimos as fases da sua O.S. (ex: recebido, diagnóstico, peças, manutenção, teste).' },
        { step: '02', title: 'Interface e Código', desc: 'Codificamos a tela externa do cliente e a mesa interna de controle da sua equipe.' },
        { step: '03', title: 'Conexão WhatsApp e Pix', desc: 'Ativamos as rotas de envio de mensagens e gateway para pagamentos remotos de orçamentos.' },
        { step: '04', title: 'Lançamento e Suporte', desc: 'Instalamos o sistema na nuvem dedicado para a sua empresa e prestamos total suporte.' }
      ],
      packagesTitle: 'Planos de Implantação',
      packages: [
        {
          name: 'Portal de Status Expresso',
          desc: 'Painel simplificado de acompanhamento de ordens de serviço com notificações por mensagens de texto.',
          price: 'a partir de R$ 3.500',
          time: '7-12 dias úteis',
          features: [
            'Pesquisa de O.S. por código único ou celular',
            'Barra de progresso visual interativa (até 5 fases)',
            'Disparos de mensagens automáticas de conclusão',
            'Armazenamento seguro (até 1.000 O.S. por ano)',
            'Cores e logotipo personalizados da sua marca'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Operação de Serviço Pro',
          desc: 'Sistema ERP completo para oficinas e assistências. Controle de técnicos, peças, faturamento e relatórios.',
          price: 'a partir de R$ 5.900',
          time: '3-4 semanas',
          features: [
            'Tudo do Portal Expresso + ordens ilimitadas',
            'Acesso individualizado de técnicos por nível de permissão',
            'Estoque integrado de peças com soma automática no orçamento',
            'Checkout online para aprovação instantânea de reparos',
            'Geração automática de protocolo PDF e envio ao cliente'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Potencialize a Produtividade da Sua Equipe",
      showcaseDesc: "Informar o status em tempo real poupa até 68% do tempo gasto em ligações e aumenta em 30% a indicação da sua marca.",
      ctaTitle: "Elimine o papel e profesionalize sua assistência técnica",
      ctaDesc: "Fale conosco. Demonstraremos como a nossa estrutura digital otimiza o fluxo de ordens e faturamento.",
      ctaBtn: "Começar Minha Transformação"
    },
    es: {
      badge: 'Eficiencia Operativa',
      title: 'Seguimiento de Órdenes de Servicio',
      description: 'Diga adiós a las llamadas constantes preguntando "¿ya está listo mi aparato?". ASM Solutions desarrolla portales independientes para el seguimiento de órdenes de servicio, diagnósticos y reparaciones en tiempo real con alertas automatizadas.',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Estructura Tecnológica para Servicios',
      features: [
        {
          title: 'Buscador de Status Express',
          desc: 'Los clientes consultan el estado ingresando su número de orden o matrícula, sin necesidad de registro.',
          icon: 'speed'
        },
        {
          title: 'Alertas Automatizadas',
          desc: 'Cada cambio de estado en el panel de mecánicos genera un SMS / Email automático para el cliente.',
          icon: 'seo'
        },
        {
          title: 'Panel Interno del Técnico',
          desc: 'Plataforma para tabletas que facilita al equipo marcar las reparaciones realizadas y añadir repuestos.',
          icon: 'portal'
        },
        {
          title: 'Facturación Integrada',
          desc: 'Generación automática de protocolos de entrega PDF y envío inmediato de enlaces de pago.',
          icon: 'security'
        }
      ],
      processTitle: 'Fases del Proyecto',
      processSteps: [
        { step: '01', title: 'Diseño del Flujo', desc: 'Definimos los estados del servicio (ej: recibido, diagnóstico, reparación, control, listo).' },
        { step: '02', title: 'Desarrollo del Portal', desc: 'Codificamos el portal de cara al cliente y el tablero interno para los técnicos.' },
        { step: '03', title: 'Canales de Alertas', desc: 'Configuramos las integraciones de mensajería rápida y pasarelas de pago online.' },
        { step: '04', title: 'Puesta en Marcha', desc: 'Aseguramos la base de datos dedicada, realizamos pruebas de carga y lo activamos.' }
      ],
      packagesTitle: 'Opciones de Contratación',
      packages: [
        {
          name: 'Portal de Status Express',
          desc: 'Portal independiente de consulta de reparaciones online integrado con alertas automáticas de finalización.',
          price: 'desde 790 €',
          time: '7-12 días laborables',
          features: [
            'Búsqueda de orden por código o número telefónico',
            'Barra de progreso visual y descriptiva (hasta 5 etapas)',
            'Envío automático de notificaciones de finalización',
            'Almacenamiento seguro en la nube (hasta 1.000 registros/año)',
            'Diseño y colores adaptados a la identidad de su negocio'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Gestión de Servicio Pro',
          desc: 'ERP de servicio completo. Gestión de técnicos, control de piezas, facturación directa y reportes.',
          price: 'desde 1.290 €',
          time: '3-4 semanas',
          features: [
            'Todo lo del Portal Express + órdenes ilimitadas',
            'Cuentas exclusivas para técnicos con accesos restringidos',
            'Control de stock de piezas con cálculo automático de costos',
            'Enlace directo de pago online para aprobación de repuestos',
            'Generación e impresión de protocolos y facturas PDF'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Incremente la Confianza y Reduzca Tiempos",
      showcaseDesc: "Informar en tiempo real reduce las consultas telefónicas en un 68% y eleva la lealtad del cliente final.",
      ctaTitle: "Profesionalice y digitalice el flujo de su taller o servicio",
      ctaDesc: "Contáctenos hoy. Diseñaremos un portal a la medida de su negocio para acelerar la entrega de órdenes.",
      ctaBtn: "Digitalizar Mi Taller"
    }
  },
  'crm': {
    pl: {
      badge: 'Salesforce i CRM',
      title: 'Automatyzacja Salesforce i CRM',
      description: 'Zbuduj nowoczesne lejki sprzedaży i połącz silosy informacyjne w swojej firmie. ASM Solutions projektuje i programuje zaawansowane automatyzacje procesów, integrując Salesforce, HubSpot, Zoho CRM z narzędziami fakturowania, bazami danych i komunikatorami przy użyciu autorskich wtyczek i bezpiecznych łączników SOUBLOX.',
      heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Architektura Integracji i SOUBLOX Blocks',
      features: [
        {
          title: 'Bezszwowe Przepływy Danych',
          desc: 'Pobieranie leadów ze stron WWW bezpośrednio do Salesforce w mniej niż sekundę bez utraty danych.',
          icon: 'speed'
        },
        {
          title: 'Wyzwalacze Zdarzeń (Triggers)',
          desc: 'Automatyczna zmiana statusu w CRM może wywołać wygenerowanie faktury, powiadomienie na Slacku oraz wysyłkę e-maila.',
          icon: 'seo'
        },
        {
          title: 'Panele Analityczne (Dashboards)',
          desc: 'Tworzenie przejrzystych raportów KPI i lejków sprzedaży w czasie rzeczywistym dla managerów i zarządu.',
          icon: 'portal'
        },
        {
          title: 'Bezpieczeństwo API i RODO',
          desc: 'Autoryzacja za pomocą bezpiecznych protokołów OAuth. Pełna szyfracja wrażliwych danych klientów.',
          icon: 'security'
        }
      ],
      processTitle: 'Jak Wygląda Proces Wdrożenia?',
      processSteps: [
        { step: '01', title: 'Audyt Procesów', desc: 'Mapujemy ścieżkę klienta, Twoje obecne bazy danych i odnajdujemy manualne wąskie gardła.' },
        { step: '02', title: 'Architektura Automatyzacji', desc: 'Projektujemy schemat przepływu danych SOUBLOX, łączący CRM z systemami księgowymi.' },
        { step: '03', title: 'Budowa Integracji i Skryptów', desc: 'Piszemy dedykowane integracje API, skrypty synchronizujące i uruchamiamy filtry danych.' },
        { step: '04', title: 'Testy i Optymalizacja', desc: 'Symulujemy obciążenie, sprawdzamy spójność baz danych i uruchamiamy automatyzację w tle.' }
      ],
      packagesTitle: 'Warianty Integracji i Automatyzacji',
      packages: [
        {
          name: 'Konfiguracja CRM Pilot',
          desc: 'Szybkie wdrożenie i dopasowanie systemu CRM (HubSpot/Zoho) do lejków sprzedaży z integracją z formularzem na stronie.',
          price: 'od 3 400 PLN',
          time: '7-12 dni roboczych',
          features: [
            'Konfiguracja do 3 niestandardowych lejków sprzedaży (pipelines)',
            'Połączenie formularzy na stronie z CRM w czasie rzeczywistym',
            'Uruchomienie automatycznych e-maili powitalnych po wypełnieniu formularza',
            'Konfiguracja do 5 spersonalizowanych pól i widoków',
            'Szkolenie zespołu z obsługi i wprowadzania szans sprzedaży'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Enterprise CRM Workflow',
          desc: 'Zaawansowana architektura Salesforce lub HubSpot z głębokimi integracjami API (SOUBLOX) i automatyzacją operacji.',
          price: 'od 5 900 PLN',
          time: '4-5 tygodni',
          features: [
            'Wszystko z pakietu Pilot + integracja z Salesforce Enterprise',
            'Dedykowane wtyczki SOUBLOX łączące CRM z systemami fakturowania',
            'Dwukierunkowa automatyczna synchronizacja baz danych',
            'System alertów na Slacku, Teams i SMS o statusach transakcji',
            'Interaktywne wykresy, raporty i panele analityczne w czasie rzeczywistym'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Zautomatyzuj Swoją Sprzedaż i Oszczędzaj Czas",
      showcaseDesc: "Przejście z arkuszy kalkulacyjnych na nowoczesny, automatyczny CRM podnosi zamykalność sprzedaży o 27% i oszczędza 15 godzin pracy tygodniowo.",
      ctaTitle: "Wprowadź ład i automatyzację w procesach sprzedażowych",
      ctaDesc: "Skontaktuj się z nami. Stworzymy dla Twojej firmy dedykowany schemat automatyzacji łączący wszystkie systemy.",
      ctaBtn: "Uruchom Automatyzację CRM"
    },
    en: {
      badge: 'Salesforce & CRM',
      title: 'Salesforce & CRM Workflows',
      description: 'Break down data silos and turn manual processes into high-speed sales pipelines. ASM Solutions architects and programs bespoke database integrations, connecting Salesforce, HubSpot, and Zoho CRM with billing systems and team messengers using custom API connectors and secure SOUBLOX integration blocks.',
      heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Integration & SOUBLOX Architecture',
      features: [
        {
          title: 'Frictionless Data Streams',
          desc: 'Feed website leads directly into Salesforce in sub-second speed with zero data loss or duplicates.',
          icon: 'speed'
        },
        {
          title: 'Event-Driven Triggers',
          desc: 'A stage transition in CRM can auto-generate a tax invoice, alert a Slack channel, and dispatch custom emails.',
          icon: 'seo'
        },
        {
          title: 'Real-Time Sales Dashboards',
          desc: 'Bespoke, visual KPI dashboards showing pipelines, conversion rates, and financial metrics at a glance.',
          icon: 'portal'
        },
        {
          title: 'Secure API Gateways',
          desc: 'Fully authorized API endpoints backed by OAuth protocols and enterprise-grade encryption layers.',
          icon: 'security'
        }
      ],
      processTitle: 'The Workflow Setup Journey',
      processSteps: [
        { step: '01', title: 'Process Audit', desc: 'We audit your customer journey, map existing database records, and locate manual friction points.' },
        { step: '02', title: 'Architecture Blueprint', desc: 'We design a visual SOUBLOX data layout that securely bridges your CRM with your financial tools.' },
        { step: '03', title: 'API Integration Build', desc: 'We write secure API connectors, automated synchronizers, and validation filters.' },
        { step: '04', title: 'Stress Tests & Launch', desc: 'We simulate heavy traffic, ensure complete database synchronization, and launch the pipeline.' }
      ],
      packagesTitle: 'CRM Integration Alternatives',
      packages: [
        {
          name: 'CRM Implementation Pilot',
          desc: 'Quick deployment and optimization of sales pipelines (HubSpot/Zoho) hooked to your website lead channels.',
          price: 'from $890',
          time: '7-12 business days',
          features: [
            'Setup of up to 3 customized sales pipelines',
            'Real-time connection between website forms and CRM',
            'Automated personalized welcome emails on lead creation',
            'Configuration of up to 5 custom fields and pipeline views',
            'Team training and quick-start tutorials on CRM management'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Enterprise CRM Workflow',
          desc: 'Advanced Salesforce or HubSpot custom architecture with custom SOUBLOX API blocks and back-office triggers.',
          price: 'from $1,550',
          time: '4-5 weeks',
          features: [
            'All Pilot features + Salesforce Enterprise setup',
            'Custom SOUBLOX middleware connecting CRM to invoicing databases',
            'Two-way real-time data sync across independent portals',
            'Slack, Microsoft Teams, and SMS alerts for deal events',
            'Interactive dashboard widgets displaying live team KPIs'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Empower Sales Efficiency with Real Automation",
      showcaseDesc: "Transitioning from manual sheets to an automated CRM boosts closed deal value by 27% and saves over 15 hours of manual work weekly.",
      ctaTitle: "Bring order and automation to your business processes",
      ctaDesc: "Get in touch with our team today. Let's design a secure automation diagram that seamlessly bridges all your business software.",
      ctaBtn: "Automate My Pipelines"
    },
    br: {
      badge: 'Salesforce e CRM',
      title: 'Fluxos de Salesforce & CRM',
      description: 'Substitua planilhas manuais e unifique seus silos de informação. A ASM Solutions projeta e programa integrações profundas de bancos de dados, conectando Salesforce, HubSpot e Zoho CRM com sistemas de faturamento e mensageria por meio de blocos customizados de automação SOUBLOX.',
      heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Integração Inteligente com SOUBLOX Blocks',
      features: [
        {
          title: 'Fluxos de Dados Sem Atrito',
          desc: 'Envio de leads da sua página diretamente para o Salesforce em milissegundos, com zero perda de dados.',
          icon: 'speed'
        },
        {
          title: 'Gatilhos Operacionais',
          desc: 'Uma mudança de status no CRM gera cobranças Pix automaticamente, notifica o Slack e avisa sua expedição.',
          icon: 'seo'
        },
        {
          title: 'Dashboards Gerenciais',
          desc: 'Visualização completa de metas, funis de vendas e taxas de conversão atualizadas instantaneamente.',
          icon: 'portal'
        },
        {
          title: 'Segurança API Enterprise',
          desc: 'Autorizações baseadas no padrão de segurança OAuth com criptografia completa para proteger dados.',
          icon: 'security'
        }
      ],
      processTitle: 'Como Ocorre a Implantação?',
      processSteps: [
        { step: '01', title: 'Auditoria de Processos', desc: 'Analisamos seus fluxos atuais de vendas, planilhas e identificamos perdas de tempo.' },
        { step: '02', title: 'Arquitetura SOUBLOX', desc: 'Criamos um fluxograma visual integrando o CRM com faturamento e estoque.' },
        { step: '03', title: 'Integração e Código', desc: 'Desenvolvemos os códigos de ponte entre as APIs e sincronizadores de dados.' },
        { step: '04', title: 'Simulações e Lançamento', desc: 'Testamos todas as rotas e colocamos o pipeline operando de forma 100% autônoma.' }
      ],
      packagesTitle: 'Planos de Automação',
      packages: [
        {
          name: 'Implantação de CRM Piloto',
          desc: 'Configuração expressa de funis de vendas (HubSpot ou Zoho) integrados aos formulários do seu site.',
          price: 'a partir de R$ 4.200',
          time: '7-12 dias úteis',
          features: [
            'Estruturação de até 3 funis de vendas customizados',
            'Linkagem em tempo real de contatos do site com o CRM',
            'Gatilhos de e-mails automáticos de boas-vindas personalizados',
            'Criação de até 5 campos customizados e visões gerenciais',
            'Treinamento operacional prático para a sua equipe'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Enterprise CRM Workflow',
          desc: 'Estruturação avançada de Salesforce ou HubSpot com integrações de API exclusivas via SOUBLOX.',
          price: 'a partir de R$ 6.900',
          time: '4-5 semanas',
          features: [
            'Tudo do pacote Piloto + Salesforce Enterprise completo',
            'Integração SOUBLOX ligando CRM aos sistemas de cobrança e notas fiscais',
            'Sincronização bidirecional de dados entre as plataformas em tempo real',
            'Disparos de alertas no Slack, Microsoft Teams ou WhatsApp sobre negócios',
            'Painéis analíticos completos atualizados em tempo real'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Potencialize Suas Vendas com Automação de Verdade",
      showcaseDesc: "Sair das planilhas para um CRM automatizado eleva em até 27% a taxa de fechamento e economiza mais de 15 horas semanais.",
      ctaTitle: "Traga ordem e automação para os fluxos da sua empresa",
      ctaDesc: "Contate nossa equipe técnica. Criaremos uma estrutura automatizada segura conectando todos os seus sistemas.",
      ctaBtn: "Automatizar Meus Processos"
    },
    es: {
      badge: 'Salesforce y CRM',
      title: 'Salesforce y Automatización CRM',
      description: 'Termine con los silos de datos y transforme tareas manuales en tuberías de ingresos automatizadas. ASM Solutions diseña y programa flujos personalizados conectando Salesforce, HubSpot y Zoho CRM con sistemas de facturación y chats de equipo mediante bloques SOUBLOX.',
      heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      featuresTitle: 'Arquitectura SOUBLOX e Integraciones',
      features: [
        {
          title: 'Flujo de Datos sin Fricción',
          desc: 'Envío de contactos del sitio web directo a Salesforce en milisegundos sin duplicados ni demoras.',
          icon: 'speed'
        },
        {
          title: 'Disparadores de Eventos',
          desc: 'Un cambio de fase en el CRM puede emitir facturas fiscales, notificar Slack y enviar correos de bienvenida.',
          icon: 'seo'
        },
        {
          title: 'Cuadros de Mando KPI',
          desc: 'Reportes y métricas de desempeño del equipo comercial en tiempo real con gráficos elegantes.',
          icon: 'portal'
        },
        {
          title: 'Conexión Segura vía API',
          desc: 'End-points de API protegidos mediante seguridad OAuth y capas de cifrado empresarial.',
          icon: 'security'
        }
      ],
      processTitle: 'Fases del Proyecto',
      processSteps: [
        { step: '01', title: 'Auditoría de Flujos', desc: 'Revisamos sus bases de datos, procesos comerciales y localizamos cuellos de botella.' },
        { step: '02', title: 'Esquema de Automatización', desc: 'Diseñamos el mapa visual SOUBLOX uniendo el CRM con su sistema de facturación.' },
        { step: '03', title: 'Desarrollo API', desc: 'Codificamos los puentes seguros de conexión, pruebas de errores y filtrado de datos.' },
        { step: '04', title: 'Pruebas de Carga', desc: 'Simulamos flujos pesados, validamos la integridad de datos y lo activamos al 100%.' }
      ],
      packagesTitle: 'Planes de Automatización',
      packages: [
        {
          name: 'CRM Implementación Piloto',
          desc: 'Configuración exprés de embudos de ventas (HubSpot o Zoho) conectados a los leads de su sitio web.',
          price: 'desde 950 €',
          time: '7-12 días laborables',
          features: [
            'Estructuración de hasta 3 embudos de venta personalizados',
            'Enlace en tiempo real de formularios web con el CRM',
            'Disparadores automáticos de correos de bienvenida a contactos',
            'Configuración de hasta 5 campos personalizados y vistas gerenciales',
            'Capacitación práctica para el equipo de ventas'
          ],
          actionCode: 'light_booking'
        },
        {
          name: 'Enterprise CRM Workflow',
          desc: 'Arquitectura avanzada de Salesforce o HubSpot con integraciones API complejas y SOUBLOX.',
          price: 'desde 1.590 €',
          time: '4-5 semanas',
          features: [
            'Todo lo del plan Piloto + Salesforce Enterprise completo',
            'Middleware SOUBLOX exclusivo que conecta CRM con facturación back-office',
            'Sincronización bidirecional de bases de datos en tiempo real',
            'Alertas directas en Slack, Teams o SMS sobre eventos comerciales',
            'Paneles analíticos integrales y KPI actualizados al segundo'
          ],
          actionCode: 'deliveryhub'
        }
      ],
      showcaseTitle: "Multiplique la Eficiencia de Sus Ventas",
      showcaseDesc: "Sustituir hojas manuales por un CRM automatizado incrementa las ventas cerradas en un 27% y ahorra 15 horas de trabajo semanales.",
      ctaTitle: "Ponga orden y automatización en los procesos de su empresa",
      ctaDesc: "Contáctenos hoy. Diseñaremos un mapa de automatización robusto conectando todas sus plataformas.",
      ctaBtn: "Automate My Pipelines"
    }
  }
};

const DISCOUNTED_PRICES_MAP: Record<string, string> = {
  // Websites PL
  'od 2 400 PLN': 'od 1 200 PLN',
  'od 4 200 PLN': 'od 2 100 PLN',
  // Websites EN
  'from $600': 'from $300',
  'from $1,050': 'from $525',
  // Websites BR
  'a partir de R$ 3.000': 'a partir de R$ 1.500',
  'a partir de R$ 5.500': 'a partir de R$ 2.750',
  // Websites ES
  'desde €550': 'desde €275',
  'desde €950': 'desde €475',

  // Booking PL
  'od 2 900 PLN': 'od 1 450 PLN',
  'od 4 900 PLN': 'od 2 450 PLN',
  // Booking EN
  'from $750': 'from $375',
  'from $1,250': 'from $625',
  // Booking BR
  'a partir de R$ 3.500': 'a partir de R$ 1.750',
  'a partir de R$ 5.900': 'a partir de R$ 2.950',
  // Booking ES
  'desde 790 €': 'desde 395 €',
  'desde 1.290 €': 'desde 645 €',

  // DeliveryHub PL
  'od 3 400 PLN': 'od 1 700 PLN',
  'od 5 900 PLN': 'od 2 950 PLN',
  // DeliveryHub EN
  'from $890': 'from $445',
  'from $1,550': 'from $775',
  // DeliveryHub BR
  'a partir de R$ 4.200': 'a partir de R$ 2.100',
  'a partir de R$ 6.900': 'a partir de R$ 3.450',
  // DeliveryHub ES
  'desde 950 €': 'desde 475 €',
  'desde 1.590 €': 'desde 795 €',

  // Restaurant PL
  'od 1 900 PLN': 'od 950 PLN',
  'od 4 500 PLN': 'od 2 250 PLN',
  // Restaurant EN
  'from $490': 'from $245',
  'from $1,150': 'from $575',
  // Restaurant BR
  'a partir de R$ 2.500': 'a partir de R$ 1.250',
  // Restaurant ES
  'desde 590 €': 'desde 295 €',
  'desde 1.190 €': 'desde 595 €'
};

const PILOT_PROJECTS: Record<string, Record<Language, {
  name: string;
  desc: string;
  price: string;
  originalPrice: string;
  time: string;
  features: string[];
  actionCode: string;
}>> = {
  website: {
    pl: {
      name: "Projekt Pilotowy: Szybka Wizytówka",
      desc: "Szybki, jednostronicowy system z formularzem kontaktowym i pełną optymalizacją pod urządzenia mobilne.",
      originalPrice: "od 1 600 PLN",
      price: "od 800 PLN",
      time: "4-5 dni roboczych",
      features: ["Dedykowany design (100% RWD)", "Szybkość ładowania >98%", "Formularz na e-mail / Google Sheets", "Szyfrowanie SSL", "Ograniczenie: 1 strona"],
      actionCode: "pilot_website"
    },
    en: {
      name: "Pilot Project: Micro Showcase",
      desc: "High-speed single-page website with direct contact forms, optimized for extreme mobile conversions.",
      originalPrice: "from $400",
      price: "from $200",
      time: "4-5 business days",
      features: ["Bespoke design (100% RWD)", "PageSpeed Score >98%", "Email / Google Sheets capture", "SSL Encryption", "Limit: 1 page"],
      actionCode: "pilot_website"
    },
    br: {
      name: "Projeto Piloto: Mini Presença",
      desc: "Landing page expressa de alto desempenho com formulário de conversão direta, ideal para validar campanhas.",
      originalPrice: "a partir de R$ 2.000",
      price: "a partir de R$ 1.000",
      time: "4-5 dias úteis",
      features: ["Design sob medida (100% responsivo)", "Pontuação de velocidade >98%", "Formulário para e-mail / Google Sheets", "Criptografia SSL", "Limite: 1 página"],
      actionCode: "pilot_website"
    },
    es: {
      name: "Proyecto Piloto: Micro Web",
      desc: "Landing page exprés de alto rendimiento con formulario de contacto directo, ideal para captar leads rápidos.",
      originalPrice: "desde 380 €",
      price: "desde 190 €",
      time: "4-5 días laborables",
      features: ["Diseño exclusivo (100% responsivo)", "Velocidad de carga >98%", "Formulario directo por email / Drive", "Certificado SSL seguro", "Límite: 1 página"],
      actionCode: "pilot_website"
    }
  },
  booking: {
    pl: {
      name: "Projekt Pilotowy: Mikro-Rezerwacje",
      desc: "Dedykowany kalendarz rezerwacyjny dla jednego pracownika lub usługi z potwierdzeniami e-mail.",
      originalPrice: "od 2 000 PLN",
      price: "od 1 000 PLN",
      time: "5-7 dni roboczych",
      features: ["1 kalendarz / 1 usługa", "Podstawowe płatności (Stripe/BLIK)", "Potwierdzenia e-mail dla klientów", "Szybki widget mobilny", "0% prowizji pośredników"],
      actionCode: "pilot_booking"
    },
    en: {
      name: "Pilot Project: Solo Calendar",
      desc: "Bespoke online scheduling workflow for a single service or professional with automated email confirmations.",
      originalPrice: "from $500",
      price: "from $250",
      time: "5-7 business days",
      features: ["1 calendar / 1 service", "Basic payment gateways (Stripe)", "Email notifications for guests", "Instant mobile scheduling", "0% platform commission fees"],
      actionCode: "pilot_booking"
    },
    br: {
      name: "Projeto Piloto: Agenda Individual",
      desc: "Sistema de agendamento online focado em um profissional ou serviço com avisos por e-mail.",
      originalPrice: "a partir de R$ 2.400",
      price: "a partir de R$ 1.200",
      time: "5-7 dias úteis",
      features: ["1 agenda / 1 serviço", "Integração básica Stripe/Pix", "Confirmações automáticas por e-mail", "Widget móvel instantâneo", "0% de comissões cobradas"],
      actionCode: "pilot_booking"
    },
    es: {
      name: "Proyecto Piloto: Agenda Individual",
      desc: "Calendario de citas en línea adaptado para un solo profesional o servicio clave con alertas automáticas.",
      originalPrice: "desde 480 €",
      price: "desde 240 €",
      time: "5-7 días laborables",
      features: ["1 agenda / 1 servicio", "Cobros online integrados (Stripe)", "Notificaciones por email a clientes", "Módulo móvil de reserva rápida", "0% de comisiones por cita"],
      actionCode: "pilot_booking"
    }
  },
  deliveryhub: {
    pl: {
      name: "Projekt Pilotowy: Zamówienia WhatsApp",
      desc: "Lekkie menu online, z którego zamówienia trafiają bezpośrednio na Twój telefon przez WhatsApp.",
      originalPrice: "od 2 400 PLN",
      price: "od 1 200 PLN",
      time: "5-7 dni roboczych",
      features: ["Menu cyfrowe z koszykiem", "Przesyłanie zamówień na WhatsApp", "Własna baza klientów bez prowizji", "Konfiguracja 1 strefy dostaw", "Brak abonamentów i opłat"],
      actionCode: "pilot_deliveryhub"
    },
    en: {
      name: "Pilot Project: WhatsApp Express",
      desc: "Lightweight direct food or retail ordering menu with orders sent straight to your staff via WhatsApp.",
      originalPrice: "from $600",
      price: "from $300",
      time: "5-7 business days",
      features: ["Digital menu with smart cart", "Order routing directly to WhatsApp", "Independent customer database", "Single delivery zone setup", "Zero subscription fees forever"],
      actionCode: "pilot_deliveryhub"
    },
    br: {
      name: "Projeto Piloto: WhatsApp Direto",
      desc: "Cardápio online interativo integrado com envio de pedidos diretamente para o WhatsApp do seu negócio.",
      originalPrice: "a partir de R$ 3.000",
      price: "a partir de R$ 1.500",
      time: "5-7 dias úteis",
      features: ["Cardápio com carrinho inteligente", "Envio do pedido direto para o WhatsApp", "Sua base de clientes exclusiva", "Definição de 1 zona de entrega", "Livre de mensalidades ou taxas"],
      actionCode: "pilot_deliveryhub"
    },
    es: {
      name: "Proyecto Piloto: Pedidos por WhatsApp",
      desc: "Menú interactivo ágil conectado con el envío automático de comandas directamente al WhatsApp de tu negocio.",
      originalPrice: "desde 580 €",
      price: "desde 290 €",
      time: "5-7 días laborables",
      features: ["Menú digital con carrito de compra", "Envío directo a tu WhatsApp", "Base de datos de clientes propia", "Configuración de 1 zona de reparto", "Sin cuotas fijas mensuales"],
      actionCode: "pilot_deliveryhub"
    }
  },
  restaurant: {
    pl: {
      name: "Projekt Pilotowy: Cyfrowe Menu QR",
      desc: "Szybkie menu kodów QR do samodzielnego przeglądania dań przez gości przy stolikach.",
      originalPrice: "od 1 800 PLN",
      price: "od 900 PLN",
      time: "4-6 dni roboczych",
      features: ["Cyfrowe menu kodów QR", "Szybka aktualizacja dań", "Zdjęcia potraw i alergenów", "Ograniczenie: brak płatności online", "Kod QR na każdy stolik"],
      actionCode: "pilot_restaurant"
    },
    en: {
      name: "Pilot Project: Digital QR Menu",
      desc: "Contactless QR-code interactive menus allowing in-house guests to browse tableside without waiting.",
      originalPrice: "from $450",
      price: "from $225",
      time: "4-6 business days",
      features: ["Mobile responsive QR menus", "Instant dish and price updates", "Photos and allergen listings", "Limit: no tableside payments", "Ready-to-print custom QR decals"],
      actionCode: "pilot_restaurant"
    },
    br: {
      name: "Projeto Piloto: Cardápio QR Code",
      desc: "Cardápio interativo via código QR para os clientes consultarem pratos e preços de forma autônoma nas mesas.",
      originalPrice: "a partir de R$ 2.200",
      price: "a partir de R$ 1.100",
      time: "4-6 dias úteis",
      features: ["Cardápio digital via QR Code", "Atualizações de preços em tempo real", "Exibição de fotos e alérgenos", "Limite: sem pagamento na mesa", "Decais QR prontos para imprimir"],
      actionCode: "pilot_restaurant"
    },
    es: {
      name: "Proyecto Piloto: Menú QR Digital",
      desc: "Menú digital interactivo mediante código QR para que los comensales consulten platos y precios desde la mesa.",
      originalPrice: "desde 440 €",
      price: "desde 220 €",
      time: "4-6 días laborables",
      features: ["Menú QR adaptado para móvil", "Actualización de platos al instante", "Fotografías e información de alérgenos", "Límite: sin pagos integrados", "Diseños QR listos para impresión"],
      actionCode: "pilot_restaurant"
    }
  },
  tracking: {
    pl: {
      name: "Projekt Pilotowy: Szybki Status",
      desc: "Szybki system sprawdzania statusów naprawy lub zlecenia online dla klientów z powiadomieniem SMS o ukończeniu.",
      originalPrice: "od 1 600 PLN",
      price: "od 800 PLN",
      time: "4-5 dni roboczych",
      features: ["Wyszukiwarka po kodzie zlecenia", "Pasek postępu (3 kroki)", "Powiadomienie SMS o zakończeniu", "Baza do 200 zleceń", "Podstawowe dostosowanie brandingu"],
      actionCode: "pilot_tracking"
    },
    en: {
      name: "Pilot Project: Status Tracker",
      desc: "An express online status lookup widget allowing customers to verify the state of their service orders instantly.",
      originalPrice: "from $400",
      price: "from $200",
      time: "4-5 business days",
      features: ["Order ID search interface", "Simple 3-stage progress line", "Automated SMS/Email notification upon completion", "Supports up to 200 orders", "Basic color & brand customization"],
      actionCode: "pilot_tracking"
    },
    br: {
      name: "Projeto Piloto: Status Expresso",
      desc: "Sistema enxuto de consulta de ordens de serviço por código único, poupando tempo de atendimento telefônico.",
      originalPrice: "a partir de R$ 2.000",
      price: "a partir de R$ 1.000",
      time: "4-5 dias úteis",
      features: ["Busca simplificada por número de O.S.", "Barra de progresso visual básica", "Aviso automático por e-mail/WhatsApp", "Capacidade de até 200 O.S.", "Layout com as cores da sua empresa"],
      actionCode: "pilot_tracking"
    },
    es: {
      name: "Proyecto Piloto: Buscador Rápido",
      desc: "Módulo simple de consulta de órdenes en línea por código, ideal para reducir llamadas repetitivas.",
      originalPrice: "desde 380 €",
      price: "desde 190 €",
      time: "4-5 días laborables",
      features: ["Buscador intuitivo por ID de orden", "Barra de progreso visual de 3 etapas", "Notificación automática por email al terminar", "Soporta hasta 200 órdenes", "Colores corporativos básicos"],
      actionCode: "pilot_tracking"
    }
  },
  crm: {
    pl: {
      name: "Projekt Pilotowy: Integracja Leadów",
      desc: "Szybkie i bezbłędne podłączenie formularzy kontaktowych na stronie z Twoim systemem CRM z automatycznym powiadomieniem.",
      originalPrice: "od 2 000 PLN",
      price: "od 1 000 PLN",
      time: "5-6 dni roboczych",
      features: ["Integracja 1 formularza z CRM (HubSpot/Zoho)", "Automatyczny mail powitalny do leada", "Powiadomienie zespołu o nowym leadzie", "Do 3 pól niestandardowych", "Instrukcja wdrożenia krok po kroku"],
      actionCode: "pilot_crm"
    },
    en: {
      name: "Pilot Project: Lead Automation",
      desc: "Fast, bulletproof integration of your landing page forms with your current CRM to capture prospects instantly.",
      originalPrice: "from $500",
      price: "from $250",
      time: "5-6 business days",
      features: ["Connect 1 form directly to CRM", "Instant auto-responder email to lead", "Internal team notification for new sign-ups", "Up to 3 custom data fields", "Step-by-step setup guides & checklist"],
      actionCode: "pilot_crm"
    },
    br: {
      name: "Projeto Piloto: Conexão de Leads",
      desc: "Integração imediata e segura dos formulários do seu site ao CRM, alimentando seu comercial sem perda de dados.",
      originalPrice: "a partir de R$ 2.400",
      price: "a partir de R$ 1.200",
      time: "5-6 dias úteis",
      features: ["Conexão de 1 formulário com o CRM", "Mensagem automática de boas-vindas", "Alerta interno para equipe de vendas", "Até 3 campos customizados", "Manual de uso operacional rápido"],
      actionCode: "pilot_crm"
    },
    es: {
      name: "Proyecto Piloto: Automatización Lead",
      desc: "Conexión exprés y robusta de los formularios web con su plataforma CRM, impidiendo fugas de prospectos.",
      originalPrice: "desde 480 €",
      price: "desde 240 €",
      time: "5-6 días laborables",
      features: ["Conexión de 1 formulario con el CRM", "Correo automatizado para el lead", "Alerta interna de nuevo lead por chat", "Hasta 3 campos de datos personalizados", "Manual de uso sencillo para vendedores"],
      actionCode: "pilot_crm"
    }
  }
};

const PROMO_LABELS = {
  pl: {
    toggle: "🔥 Aktywuj Rabat Pilotowy -50% (Szybki start dla kolejnych 20 klientów!)",
    activeBadge: "OFERTA PILOTOWA -50%",
    pilotHeader: "Wersja Pilotowa",
    urgencyText: " Pozostało wolnych miejsc pilotowych: 12 z 20. Zabezpiecz zniżkę partnerską!",
    pilotAlert: "Świetny wybór na start przy niskim budżecie!"
  },
  en: {
    toggle: "🔥 Activate -50% Pilot Discount (Fast-track offer for next 20 clients!)",
    activeBadge: "50% PILOT PARTNER DISCOUNT",
    pilotHeader: "Pilot Edition",
    urgencyText: " Remaining pilot slots: 12 of 20. Secure your partner discount now!",
    pilotAlert: "Perfect entry-level setup to validate your idea on a budget!"
  },
  br: {
    toggle: "🔥 Ativar Desconto Piloto de -50% (Vagas limitadas para os próximos 20 clientes!)",
    activeBadge: "50% DE DESCONTO PILOTO",
    pilotHeader: "Edição Piloto",
    urgencyText: " Vagas piloto restantes: 12 de 20. Garanta seu desconto promocional!",
    pilotAlert: "Opção perfeita para começar com orçamento enxuto!"
  },
  es: {
    toggle: "🔥 Activar Descuento Piloto de -50% (¡Oportunidad rápida para próximos 20 clientes!)",
    activeBadge: "50% DE DESCUENTO PILOTO",
    pilotHeader: "Edición Piloto",
    urgencyText: " Cupos piloto restantes: 12 de 20. ¡Reserva tu plaza de socio ahora!",
    pilotAlert: "¡La mejor forma de empezar a bajo costo!"
  }
};

export const SolutionDetailView: React.FC<SolutionDetailViewProps> = ({
  solutionId,
  currentLang,
  theme,
  onBack,
  onOpenContact,
  discountEnabled
}) => {
  const isDark = theme === 'dark';
  const data = SOLUTION_DATA[solutionId]?.[currentLang] || SOLUTION_DATA[solutionId]?.pl;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [solutionId]);

  if (!data) {
    return null;
  }

  const backLabel = {
    pl: 'Wróć do strony głównej',
    en: 'Back to Home',
    br: 'Voltar ao Início',
    es: 'Volver al Inicio'
  };

  const projectReferences = [
    { id: 'joanna-filek' as const, name: 'Joanna Filek', role: 'Psychoterapeuta', img: 'https://joannafilek.com/images/joanna.png', url: 'https://joannafilek.com/' },
    { id: 'daniela-torp' as const, name: 'Daniela Torp', role: 'Intimacy Coach', img: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg', url: 'https://she.alansmsolutions.com/' },
    { id: 'jessica-franco' as const, name: 'Jessica Franco', role: 'Nail Designer', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop', url: 'https://jessicafranco.alansmsolutions.com/' }
  ];

  return (
    <article className="py-6 md:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Back Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-blue-500" /> {backLabel[currentLang] || backLabel.pl}
        </button>
        
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
          isDark ? 'bg-slate-900 text-blue-400 border border-slate-800' : 'bg-blue-50 text-blue-600 border border-blue-100'
        }`}>
          {data.badge}
        </span>
      </div>

      {/* Main Introduction Title */}
      <header className="mb-8 max-w-3xl">
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.title}
        </h1>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {data.description}
        </p>
      </header>

      {/* Hero Visual Interactive Sandbox */}
      <InteractiveServiceSandbox
        solutionId={solutionId}
        currentLang={currentLang}
        theme={theme}
        onOpenContact={onOpenContact}
      />

      {/* Technical Standards Bento Grid */}
      <section className="mb-12">
        <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Layout className="w-5 h-5 text-blue-500" />
          {data.featuresTitle}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.features.map((feat, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isDark 
                  ? 'bg-slate-950/40 border-slate-900 hover:border-slate-800' 
                  : 'bg-white border-slate-200 shadow-3xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3.5 ${
                  isDark ? 'bg-slate-900' : 'bg-slate-50'
                }`}>
                  {idx === 0 && <Zap className="w-4 h-4 text-amber-500" />}
                  {idx === 1 && <Globe className="w-4 h-4 text-blue-500" />}
                  {idx === 2 && <Monitor className="w-4 h-4 text-indigo-500" />}
                  {idx === 3 && <Database className="w-4 h-4 text-emerald-500" />}
                </div>
                <h4 className={`text-sm font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Process */}
      <section className={`p-6 sm:p-8 rounded-2xl border mb-12 ${
        isDark ? 'bg-slate-950/20 border-slate-850' : 'bg-slate-50/50 border-slate-200/80'
      }`}>
        <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Sparkles className="w-5 h-5 text-blue-500" />
          {data.processTitle}
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.processSteps.map((p, i) => (
            <div key={i} className="relative">
              <span className="text-3xl font-black text-blue-500/25 block mb-1 font-mono">{p.step}</span>
              <h4 className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h4>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing / Services Tiers */}
      <section className="mb-12">
        {/* Special Promo Status Board */}
        {discountEnabled && (
          <div className={`p-4 rounded-2xl mb-8 border transition-all ${
            isDark 
              ? 'bg-amber-950/10 border-amber-900/30' 
              : 'bg-amber-50/30 border-amber-200/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 mt-0.5 shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 block mb-0.5">
                    {PROMO_LABELS[currentLang as Language]?.activeBadge || PROMO_LABELS.pl.activeBadge}
                  </span>
                  <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {PROMO_LABELS[currentLang as Language]?.urgencyText || PROMO_LABELS.pl.urgencyText}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>
                  {currentLang === 'pl' ? 'Rabat aktywny' : currentLang === 'en' ? 'Discount active' : currentLang === 'br' ? 'Desconto ativo' : 'Descuento activo'}
                </span>
              </div>
            </div>
          </div>
        )}

        <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Shield className="w-5 h-5 text-blue-500" />
          {data.packagesTitle}
        </h3>

        <div className={`grid md:grid-cols-2 ${discountEnabled ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
          {/* Pilot Project Card */}
          {discountEnabled && (() => {
            const pilot = PILOT_PROJECTS[solutionId]?.[currentLang as Language] || PILOT_PROJECTS[solutionId]?.pl;
            return (
              <div 
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all relative overflow-hidden ${
                  isDark 
                    ? 'bg-amber-950/10 border-amber-500/30 ring-1 ring-amber-500/20' 
                    : 'bg-amber-50/15 border-amber-500/30 shadow-xs ring-1 ring-amber-500/10'
                }`}
              >
                {/* Hot Tag */}
                <div className="absolute top-0 right-0">
                  <span className="text-[8px] tracking-wider font-extrabold bg-amber-500 text-slate-950 px-2.5 py-1 rounded-bl-xl uppercase font-mono block">
                    {currentLang === 'pl' ? 'NAJTAŃSZY PILOT' : currentLang === 'en' ? 'PILOT BUDGET' : currentLang === 'br' ? 'PILOTO ECONÔMICO' : 'PILOTO ECONÓMICO'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wide">
                      {PROMO_LABELS[currentLang as Language]?.pilotHeader || PROMO_LABELS.pl.pilotHeader}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {pilot.name}
                  </h4>
                  <p className={`text-[11px] mb-3 leading-relaxed min-h-[36px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {pilot.desc}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-slate-500 text-xs line-through mr-1.5 font-semibold">
                      {pilot.originalPrice}
                    </span>
                    <span className="text-base font-black text-amber-500 block sm:inline">
                      {pilot.price}
                    </span>
                    <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {pilot.time}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 border-t border-amber-500/20 pt-4">
                    {pilot.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact(pilot.actionCode, pilot.price)}
                  className="w-full text-center py-2 px-4 rounded-lg text-xs font-bold transition-all bg-amber-500 hover:bg-amber-600 text-slate-950 hover:scale-[1.01]"
                >
                  {currentLang === 'pl' && 'Aplikuj do pilotażu'}
                  {currentLang === 'en' && 'Apply for Pilot'}
                  {currentLang === 'br' && 'Inscrever-se no Piloto'}
                  {currentLang === 'es' && 'Aplicar al Piloto'}
                </button>
              </div>
            );
          })()}

          {/* Regular Cards */}
          {data.packages.map((pkg, i) => {
            const hasPromo = discountEnabled && DISCOUNTED_PRICES_MAP[pkg.price];
            const displayPrice = hasPromo ? DISCOUNTED_PRICES_MAP[pkg.price] : pkg.price;
            
            return (
              <div 
                key={i}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  i === 1
                    ? isDark 
                      ? 'bg-blue-950/10 border-blue-900/60 shadow-xs' 
                      : 'bg-blue-50/20 border-blue-200 shadow-xs'
                    : isDark
                      ? 'bg-slate-950/40 border-slate-900'
                      : 'bg-white border-slate-200/80 shadow-3xs'
                }`}
              >
                <div>
                  <h4 className={`text-sm font-bold mb-1 flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span>{pkg.name}</span>
                    {i === 1 && (
                      <span className="text-[8px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded font-mono uppercase">POPULAR</span>
                    )}
                  </h4>
                  <p className={`text-[11px] mb-3 leading-relaxed min-h-[36px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {pkg.desc}
                  </p>
                  
                  <div className="mb-4">
                    {hasPromo ? (
                      <div className="flex flex-col">
                        <span className="text-xs line-through text-slate-500 font-semibold mb-0.5">
                          {pkg.price}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-base font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            {displayPrice}
                          </span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                            -50%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className={`text-base font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {pkg.price}
                      </span>
                    )}
                    <span className={`text-[10px] block font-mono mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {pkg.time}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 border-t border-slate-800/40 pt-4">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact(pkg.actionCode, displayPrice)}
                  className={`w-full text-center py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                    i === 1
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01]'
                      : isDark
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {currentLang === 'pl' && 'Zapytaj o ten pakiet'}
                  {currentLang === 'en' && 'Inquire about package'}
                  {currentLang === 'br' && 'Solicitar este plano'}
                  {currentLang === 'es' && 'Solicitar este plan'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Showcase completed portfolios (cross link with real projects) */}
      <section className="mb-12 border-t border-slate-800/40 pt-10">
        <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.showcaseTitle}
        </h3>
        <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {data.showcaseDesc}
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {projectReferences.map((ref) => (
            <a 
              key={ref.id}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`border rounded-xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-slate-950/30 border-slate-900 hover:border-slate-800' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-3xs'
              }`}
            >
              <div className="relative h-24 w-full overflow-hidden bg-slate-900">
                <img 
                  src={ref.img} 
                  alt={ref.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? 'from-slate-950 via-slate-950/40' : 'from-white via-white/30'
                }`} />
              </div>
              <div className="p-3">
                <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {ref.name} <span className={`text-[10px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>— {ref.role}</span>
                </h4>
                <span className={`text-[10px] font-bold inline-flex items-center gap-1 mt-2 transition-colors ${
                  isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
                }`}>
                  <Globe className="w-3 h-3" />
                  {currentLang === 'pl' ? 'Odwiedź projekt' : currentLang === 'br' ? 'Visitar projeto' : currentLang === 'es' ? 'Visitar proyecto' : 'Visit project'}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden ${
        isDark 
          ? 'bg-linear-to-b from-slate-950 to-slate-900 border-blue-900/30' 
          : 'bg-linear-to-b from-blue-50/20 to-white border-blue-100 shadow-sm'
      }`}>
        <h3 className={`text-base sm:text-lg font-bold mb-2 relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.ctaTitle}
        </h3>
        <p className={`text-xs mb-5 max-w-lg mx-auto relative z-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {data.ctaDesc}
        </p>

        <button
          type="button"
          onClick={() => onOpenContact('business_website', 'custom_quote')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] transition-all relative z-10 shadow-sm"
        >
          {data.ctaBtn}
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </article>
  );
};
