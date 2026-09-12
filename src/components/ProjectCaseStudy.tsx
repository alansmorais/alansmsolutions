import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Shield, Award, CheckCircle2, Server, Smartphone, Zap, ArrowRight, TrendingUp, BarChart3, Users } from 'lucide-react';
import { Language, Theme } from '../types';

interface ProjectCaseStudyProps {
  projectId: 'joanna-filek' | 'daniela-torp' | 'jessica-franco';
  currentLang: Language;
  theme: Theme;
  onBack: () => void;
  onOpenContact: (pkg?: string, price?: string) => void;
}

interface CaseStudyContent {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  heroImage: string;
  url: string;
  metrics: {
    value: string;
    label: string;
    icon: 'time' | 'growth' | 'money' | 'noshow';
  }[];
  challengeTitle: string;
  challengeText: string;
  solutionTitle: string;
  solutionText: string;
  featuresTitle: string;
  features: string[];
  techTitle: string;
  techStack: string[];
  impactTitle: string;
  impactText: string;
  ctaTitle: string;
  ctaButton: string;
  ctaPackage: string;
}

const CASE_STUDIES: Record<string, Record<Language, CaseStudyContent>> = {
  'joanna-filek': {
    pl: {
      title: 'Joanna Filek — Cyfrowy Gabinet Psychoterapii',
      subtitle: 'Kompleksowa obecność online i automatyzacja rezerwacji wizyt',
      category: 'Psychoterapia & Zdrowie',
      description: 'Dedykowany landing page i system rezerwacji, który wzmocnił zaufanie pacjentów i ułatwił im bezpieczny kontakt oraz umawianie profesjonalnych sesji online i gabinetowych.',
      heroImage: 'https://joannafilek.com/images/joanna.png',
      url: 'https://joannafilek.com/',
      metrics: [
        { value: '85%', label: 'Mniej czasu na umawianie', icon: 'time' },
        { value: '+42%', label: 'Więcej bezpośrednich rezerwacji', icon: 'growth' },
        { value: '100%', label: 'Niezależność od portali', icon: 'money' }
      ],
      challengeTitle: 'Wyzwanie',
      challengeText: 'Prowadzenie renomowanego gabinetu psychoterapeutycznego wymagało ciągłego, ręcznego ustalania terminów przez e-mail, wiadomości SMS oraz telefony, co przerywało pracę terapeutyczną i pochłaniało cenne godziny. Tradycyjne, publiczne portale rezerwacyjne nie zapewniały odpowiedniego poziomu dyskrecji i profesjonalizmu, jakiego oczekują pacjenci w nurcie psychoterapii.',
      solutionTitle: 'Rozwiązanie AlanSM Solutions',
      solutionText: 'Zaprojektowaliśmy minimalistyczny, budujący poczucie bezpieczeństwa i zaufania portal zintegrowany z dyskretnym i szybkim systemem rezerwacji terminów. Kalendarz automatycznie sprawdza dostępność, ukrywa tożsamość pacjentów, a po rezerwacji generuje zaszyfrowane linki do telekonsultacji i przesyła automatyczne powiadomienia oraz profesjonalne faktury.',
      featuresTitle: 'Kluczowe Funkcje Systemu',
      features: [
        'Dwukierunkowa, bezpieczna synchronizacja z Google Calendar i iCal',
        'Zintegrowane, dyskretne płatności online przez bramkę Stripe / BLIK',
        'Automatyczny system powiadomień i SMS-ów przypominających o sesji',
        'Dedykowany moduł zarządzania gabinetem i urlopami z poziomu telefonu',
        'Zgodność z RODO oraz najwyższe standardy poufności danych medycznych'
      ],
      techTitle: 'Użyte Technologie i Integracje',
      techStack: ['React (Vite)', 'Tailwind CSS', 'Google Calendar API Sync', 'Stripe Payments', 'Automatic PDF Invoices Engine', 'Secure Node.js Edge'],
      impactTitle: 'Wpływ na Biznes',
      impactText: 'System całkowicie wyeliminował potrzebę telefonicznego potwierdzania wizyt, dając właścicielce 8 dodatkowych godzin w tygodniu na pracę z pacjentami. Dzięki przejrzystemu interfejsowi, pacjenci chętniej zapisują się bezpośrednio na wolne terminy, co przełożyło się na wzrost liczby rezerwacji o 42% już w pierwszych 3 miesiącach od wdrożenia.',
      ctaTitle: 'Chcesz wdrożyć podobny system rezerwacji wizyt?',
      ctaButton: 'Zbuduj swój prywatny kalendarz',
      ctaPackage: 'light_booking'
    },
    en: {
      title: 'Joanna Filek — Digital Psychotherapy Office',
      subtitle: 'Complete web presence and professional booking automation',
      category: 'Psychotherapy & Healthcare',
      description: 'A bespoke, security-focused landing page and automated calendar that builds trust, streamlining patient onboarding and online/in-person session booking.',
      heroImage: 'https://joannafilek.com/images/joanna.png',
      url: 'https://joannafilek.com/',
      metrics: [
        { value: '85%', label: 'Booking administration cut', icon: 'time' },
        { value: '+42%', label: 'Increase in direct bookings', icon: 'growth' },
        { value: '100%', label: 'Zero marketplace fees', icon: 'money' }
      ],
      challengeTitle: 'The Challenge',
      challengeText: 'Running a busy psychotherapeutic practice required hours of manual back-and-forth communication over email and SMS to coordinate and confirm sessions. Public, third-party booking portals lacked the delicate branding, privacy, and absolute confidentiality required for professional therapy sessions.',
      solutionTitle: 'Our Customized Solution',
      solutionText: 'We built a high-performance web platform utilizing calming colors and clear typography to build trust from the first click. We integrated an automated calendar that lets patients select available slots anonymously, triggers instant confirmation messages, synchronizes calendars instantly, and securely collects online payments without compromising confidentiality.',
      featuresTitle: 'Key System Features',
      features: [
        'Secure 2-way Google Calendar and iCal synchronization',
        'Seamless integration with international credit cards and BLIK via Stripe',
        'Automated SMS & Email session reminders and custom instructions',
        'Mobile-friendly administrative panel for managing slots and holiday blocks',
        'GDPR-compliant personal data processing with top-tier security standards'
      ],
      techTitle: 'Technologies & Integrations Used',
      techStack: ['React (Vite)', 'Tailwind CSS', 'Google Calendar API Sync', 'Stripe API payments', 'Automated PDF Invoice Generator', 'Node.js Endpoint'],
      impactTitle: 'Business Impact',
      impactText: 'The automation of appointments freed up 8 hours per week previously wasted on manual coordination. Client retention grew due to the friction-free, professional online calendar, resulting in a 42% booking increase within the first 90 days after launching.',
      ctaTitle: 'Want to build a private, direct booking system for your practice?',
      ctaButton: 'Build Your Private Calendar',
      ctaPackage: 'light_booking'
    },
    br: {
      title: 'Joanna Filek — Consultório Digital de Psicoterapia',
      subtitle: 'Presença digital completa e automação profissional de consultas',
      category: 'Psicoterapia & Saúde',
      description: 'Um portal de alta performance e sistema de agendamento privado que transmite confiança e segurança, otimizando o agendamento de consultas presenciais e online.',
      heroImage: 'https://joannafilek.com/images/joanna.png',
      url: 'https://joannafilek.com/',
      metrics: [
        { value: '85%', label: 'Menos tempo organizando horários', icon: 'time' },
        { value: '+42%', label: 'Mais agendamentos diretos', icon: 'growth' },
        { value: '100%', label: 'Zero comissão de terceiros', icon: 'money' }
      ],
      challengeTitle: 'O Desafio',
      challengeText: 'A coordenação de horários em uma clínica movimentada exigia ligações, mensagens e e-mails constantes, o que interrompia o trabalho e gerava estresse administrativo. Os marketplaces tradicionais de saúde cobravam taxas elevadas e não ofereciam a discrição e a personalização de marca fundamentais para sessões de terapia.',
      solutionTitle: 'Nossa Solução Customizada',
      solutionText: 'Desenvolvemos um site institucional elegante e minimalista com uma experiência de agendamento blindada. O sistema permite que o paciente reserve sua sessão com total discrição, sincronize com a agenda pessoal do profissional e efetue o pagamento seguro, recebendo lembretes automatizados antes da consulta.',
      featuresTitle: 'Recursos Principais do Sistema',
      features: [
        'Sincronização segura bidirecional com Google Calendar e iCal',
        'Integração de pagamentos via Stripe (cartões de crédito e carteiras digitais)',
        'Lembretes por e-mail e SMS automatizados para evitar faltas',
        'Painel administrativo completo para controle de disponibilidade no celular',
        'Adequação rígida de privacidade e leis de proteção de dados (LGPD/GDPR)'
      ],
      techTitle: 'Tecnologias & Integrações',
      techStack: ['React (Vite)', 'Tailwind CSS', 'Google Calendar API Sync', 'Stripe Payments', 'Invoice PDF Auto-Engine', 'Node.js Core'],
      impactTitle: 'Impacto nos Negócios',
      impactText: 'A automação eliminou as interrupções diárias para marcação de consultas, devolvendo 8 horas de tempo produtivo por semana. O agendamento descomplicado incentivou novas consultas, aumentando o volume de sessões agendadas em 42% no primeiro trimestre.',
      ctaTitle: 'Quer criar um sistema de agendamento privado e profissional para seus atendimentos?',
      ctaButton: 'Criar Meu Calendário Próprio',
      ctaPackage: 'light_booking'
    },
    es: {
      title: 'Joanna Filek — Consultorio Digital de Psicoterapia',
      subtitle: 'Presencia web completa y automatización profesional de citas',
      category: 'Psicoterapia y Salud',
      description: 'Una plataforma web a medida orientada a inspirar confianza y facilitar el agendamiento directo y seguro de sesiones presenciales o virtuales.',
      heroImage: 'https://joannafilek.com/images/joanna.png',
      url: 'https://joannafilek.com/',
      metrics: [
        { value: '85%', label: 'Menos tiempo coordinando citas', icon: 'time' },
        { value: '+42%', label: 'Incremento de reservas directas', icon: 'growth' },
        { value: '100%', label: 'Independencia total de portales', icon: 'money' }
      ],
      challengeTitle: 'El Desafío',
      challengeText: 'Coordinar citas manualmente mediante mensajes y llamadas consumía tiempo valioso e interrumpía el enfoque terapéutico. Las plataformas de terceros no solo cobraban comisiones, sino que tampoco ofrecían el entorno de marca exclusivo ni la confidencialidad médica requerida.',
      solutionTitle: 'Nuestra Solución Personalizada',
      solutionText: 'Diseñamos un portal web minimalista y enfocado en la privacidad que simplifica el onboarding de pacientes. La agenda de reservas está integrada directamente con el calendario de la terapeuta, confirmando turnos al instante, recolectando pagos con Stripe y enviando recordatorios automatizados.',
      featuresTitle: 'Características Principales',
      features: [
        'Sincronización en tiempo real de doble vía con Google Calendar',
        'Pasarela de pagos Stripe para tarjetas internacionales y métodos locales',
        'Recordatorios de citas automatizados vía SMS y correo electrónico',
        'Administración ágil de horarios y días bloqueados desde el móvil',
        'Cumplimiento estricto con la normativa europea de protección de datos (RGPD)'
      ],
      techTitle: 'Tecnologías e Integraciones',
      techStack: ['React (Vite)', 'Tailwind CSS', 'Google Calendar API Sync', 'Stripe Webhooks', 'Automated PDF Billings', 'Node.js Web Server'],
      impactTitle: 'Impacto Empresarial',
      impactText: 'Se liberaron 8 horas semanales antes dedicadas a la gestión manual de llamadas. La facilidad del agendamiento directo aumentó la tasa de citas confirmadas en un 42% durante los primeros 90 días desde su puesta en marcha.',
      ctaTitle: '¿Buscas una solución de agendamiento privada para tu consulta profesional?',
      ctaButton: 'Construir Mi Calendario Propio',
      ctaPackage: 'light_booking'
    }
  },
  'daniela-torp': {
    pl: {
      title: 'Daniela Torp — Private Intimacy Booking',
      subtitle: 'Dyskretny, bezpieczny portal konsultacji o zasięgu globalnym',
      category: 'Prywatny Kalendarz',
      description: 'Niezależna platforma rezerwacji i konsultacji online zaprojektowana od podstaw, aby zapewnić najwyższy stopień prywatności oraz obsługę płatności w wielu walutach bez pośredników.',
      heroImage: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg',
      url: 'https://she.alansmsolutions.com/',
      metrics: [
        { value: '0%', label: 'Prowizji dla pośredników', icon: 'money' },
        { value: '100%', label: 'Dyskrecji dla klientów', icon: 'noshow' },
        { value: '3+', label: 'Waluty płatności (PLN, USD, NOK)', icon: 'growth' }
      ],
      challengeTitle: 'Wyzwanie',
      challengeText: 'Jako coach relacji i intymności o międzynarodowej klienteli, Daniela potrzebowała rozwiązania rezerwacyjnego, które gwarantuje bezkompromisowe bezpieczeństwo danych i dyskrecję. Tradycyjne platformy kalendarzowe pobierały wysokie opłaty subskrypcyjne oraz prowizje, jednocześnie ujawniając wrażliwe szczegóły spotkań w ogólnodostępnych bazach.',
      solutionTitle: 'Rozwiązanie AlanSM Solutions',
      solutionText: 'Stworzyliśmy wysoce bezpieczną, szyfrowaną platformę pod adresem she.alansmsolutions.com. Klienci mogą zarezerwować konsultację podając wyłącznie pseudonim i e-mail, a system przydziela im prywatny token spotkania. Transakcje finansowe są przetwarzane przez Stripe i chronione protokołami bezpieczeństwa.',
      featuresTitle: 'Specyfikacja Techniczno-Użytkowa',
      features: [
        'Całkowicie anonimowy proces rezerwacyjny bez konieczności zakładania konta',
        'Wielowalutowy system płatności z automatycznym przeliczaniem kursów',
        'Generowanie prywatnych, tymczasowych linków wideo do szyfrowanych konsultacji',
        'Stylowy, luksusowy design dopasowany do wizerunku marki premium',
        'Ochrona przed hotlinkowaniem i restrykcyjne zabezpieczenia plików sesyjnych'
      ],
      techTitle: 'Zastosowana Architektura IT',
      techStack: ['React Frontend', 'Tailwind CSS Premium Dark', 'Stripe Multi-Currency Gateway', 'Google Meet/Zoom Secure API', 'Strict Privacy Encryption Engine'],
      impactTitle: 'Wpływ na Biznes',
      impactText: 'Dzięki wdrożeniu własnej platformy Daniela zredukowała koszty operacyjne i prowizje pośredników do zera (0%). Klienci zyskali bezprecedensowe poczucie bezpieczeństwa, co znacząco zwiększyło ich gotowość do rezerwowania długoterminowych pakietów konsultacyjnych online.',
      ctaTitle: 'Szukasz w pełni dedykowanej platformy o najwyższym standardzie bezpieczeństwa?',
      ctaButton: 'Skonsultuj swój prywatny system',
      ctaPackage: 'automation'
    },
    en: {
      title: 'Daniela Torp — Private Intimacy Booking',
      subtitle: 'Ultra-secure and discreet global consultation booking engine',
      category: 'Private Booking Engine',
      description: 'A custom, independent booking and checkout platform designed with military-grade privacy requirements and global multi-currency payments with 0% commissions.',
      heroImage: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg',
      url: 'https://she.alansmsolutions.com/',
      metrics: [
        { value: '0%', label: 'Commission to third parties', icon: 'money' },
        { value: '100%', label: 'Guaranteed anonymity', icon: 'noshow' },
        { value: 'Multi', label: 'Currency checkout (USD, EUR, PLN)', icon: 'growth' }
      ],
      challengeTitle: 'The Challenge',
      challengeText: 'Providing premium counseling in delicate personal fields required a system that offers absolute, bulletproof confidentiality. Conventional public booking tools are often tracking user metadata, forcing registration, and charging recurring monthly fees alongside transaction cuts, which limited international growth.',
      solutionTitle: 'Our Custom Digital Strategy',
      solutionText: 'We architected and launched she.alansmsolutions.com. This private-label portal enables clients worldwide to book sessions anonymously, managing timezone shifts flawlessly and integrating multi-currency processing natively. Transactions are shielded, keeping both parties fully secure.',
      featuresTitle: 'Core Technical Features',
      features: [
        'Fully confidential client booking engine without required account creation',
        'Automated global multi-currency gateway supporting localized payouts',
        'Secure token generation for private end-to-end video consultation links',
        'Luxury premium visual design aligning with high-end coach consulting',
        'Restricted cross-origin headers to prevent metadata leaks and hotlinking'
      ],
      techTitle: 'Infrastructure & Tech Stack',
      techStack: ['React Framework', 'Tailwind CSS Luxury Theme', 'Stripe International API', 'Dynamic Timezone Engine', 'Encrypted Metadata Router'],
      impactTitle: 'Business Impact',
      impactText: 'Operating costs dropped to 0% in marketplace cuts. Clients reported a massive confidence boost in booking packages, leading to a higher conversion rate for high-ticket consultations internationally.',
      ctaTitle: 'Do you need a tailored web application with premium privacy and custom logic?',
      ctaButton: 'Request Customized Architecture',
      ctaPackage: 'automation'
    },
    br: {
      title: 'Daniela Torp — Private Intimacy Booking',
      subtitle: 'Plataforma global e segura para agendamentos ultraconfidenciais',
      category: 'Calendário Privativo',
      description: 'Um motor de agendamentos próprio, desenvolvido para oferecer privacidade máxima para clientes globais e pagamentos internacionais simplificados sem taxas de terceiros.',
      heroImage: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg',
      url: 'https://she.alansmsolutions.com/',
      metrics: [
        { value: '0%', label: 'Comissão de marketplaces', icon: 'money' },
        { value: '100%', label: 'Privacidade garantida', icon: 'noshow' },
        { value: 'Mult.', label: 'Moedas integradas (USD, BRL, PLN)', icon: 'growth' }
      ],
      challengeTitle: 'O Desafio',
      challengeText: 'Atendendo clientes corporativos e de alta renda internacionalmente, Daniela precisava de um sistema com privacidade inabalável. Plataformas comuns forçavam cadastros invasivos e exibiam informações sensíveis dos encontros nas redes, além de cobrarem taxas pesadas por transações em moedas estrangeiras.',
      solutionTitle: 'Nossa Solução Arquitetônica',
      solutionText: 'Desenvolvemos a plataforma she.alansmsolutions.com. Implementamos um fluxo de checkout anônimo, onde o cliente é identificado apenas por um token seguro. Integramos o processamento de moedas inteligentes para aceitar pagamentos globais de forma integrada e direta.',
      featuresTitle: 'Principais Engenharia do Sistema',
      features: [
        'Agendamento anônimo e simplificado sem exigência de conta ou cadastro',
        'Processamento inteligente de múltiplas moedas no checkout via Stripe',
        'Geração de links de videoconferência protegidos e temporários por sessão',
        'Design visual luxuoso de alto padrão focado em conversão de serviços premium',
        'Segurança máxima e proteção contra vazamento de metadados'
      ],
      techTitle: 'Infraestrutura de Tecnologia',
      techStack: ['React Web UI', 'Tailwind CSS Dark Theme', 'Stripe Multi-Currency Native', 'Secure Video Meeting API', 'Data Privacy Guard'],
      impactTitle: 'Impacto Comercial',
      impactText: 'Os custos de licenciamento e comissão de vendas caíram para zero. A experiência segura de ponta a ponta gerou um ambiente propício para a venda de planos de mentoria de alto valor com facilidade.',
      ctaTitle: 'Precisa de uma aplicação exclusiva e segura com integração de pagamentos internacionais?',
      ctaButton: 'Consultar Arquitetura Customizada',
      ctaPackage: 'automation'
    },
    es: {
      title: 'Daniela Torp — Private Intimacy Booking',
      subtitle: 'Pasarela internacional de reservas seguras y confidenciales',
      category: 'Calendario Privativo',
      description: 'Plataforma privada de agendamiento y facturación internacional libre de comisiones, diseñada bajo un esquema estricto de anonimato para consultas prémium.',
      heroImage: 'https://www.danielatorp.cz/wp-content/uploads/2020/05/untitled-design-7.jpg',
      url: 'https://she.alansmsolutions.com/',
      metrics: [
        { value: '0%', label: 'Comisiones a intermediarios', icon: 'money' },
        { value: '100%', label: 'Discreción garantizada', icon: 'noshow' },
        { value: 'Multi', label: 'Moneda (USD, EUR, PLN) activa', icon: 'growth' }
      ],
      challengeTitle: 'El Desafío',
      challengeText: 'El asesoramiento personal de alto nivel exigía un flujo de reserva que blindara por completo la identidad de los consultantes. Las agendas tradicionales registraban metadatos innecesarios y dependían de costosas suscripciones mensuales que penalizaban el cobro internacional.',
      solutionTitle: 'Nuestra Estrategia de Ingeniería',
      solutionText: 'Construimos she.alansmsolutions.com de forma totalmente independiente. Los clientes eligen día y hora ingresando solo información esencial, mientras que el motor de pagos Stripe procesa el importe en múltiples divisas al instante, derivando el acceso seguro a la videollamada.',
      featuresTitle: 'Especificaciones Clave',
      features: [
        'Proceso de reserva confidencial sin requerir inicios de sesión obligatorios',
        'Bramka de cobros multimoneda automática y optimizada para conversión',
        'Enlaces de videollamadas dinámicos y encriptados autogenerados por sesión',
        'Estética prémium elegante y con contraste óptimo para posicionamiento VIP',
        'Headers de seguridad reforzados contra rastreadores externos'
      ],
      techTitle: 'Tecnologías Aplicadas',
      techStack: ['React App', 'Tailwind CSS Premium Slate', 'Stripe Checkout API', 'Dynamic Timezone Calculator', 'Secure Credentials Gate'],
      impactTitle: 'Impacto de la Solución',
      impactText: 'Las comisiones de intermediación cayeron al 0%. Los pacientes valoraron positivamente la experiencia privada, impulsando la retención y la compra de paquetes de sesiones de consulta desde el extranjero.',
      ctaTitle: '¿Requieres una plataforma blindada para transacciones y gestión internacional?',
      ctaButton: 'Consultar Diseño de Solución',
      ctaPackage: 'automation'
    }
  },
  'jessica-franco': {
    pl: {
      title: 'Jessica Franco — Nail Designer & Salon',
      subtitle: 'Mobilny portal rezerwacji i zautomatyzowane przypomnienia',
      category: 'Beauty & Portfolio',
      description: 'Intuicyjna platforma Mobile-First, która połączyła interaktywną galerię prac (portfolio) z szybkim, 3-etapowym kreatorem zapisów online, uwalniając czas właścicielki.',
      heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      url: 'https://jessicafranco.alansmsolutions.com/',
      metrics: [
        { value: '12h', label: 'Zaoszczędzone tygodniowo', icon: 'time' },
        { value: '95%', label: 'Mniej nieobecności (no-show)', icon: 'noshow' },
        { value: '3 kroki', label: 'Do rezerwacji wizyty', icon: 'growth' }
      ],
      challengeTitle: 'Wyzwanie',
      challengeText: 'Jessica traciła średnio 2 godziny dziennie na odpowiadanie na wiadomości prywatne na Instagramie i Messengerze, próbując ręcznie dopasować wolne terminy dla klientek. Ponadto, brak pobierania zaliczek skutkował zapomnianymi wizytami (no-show), co narażało salon na bezpośrednie straty finansowe.',
      solutionTitle: 'Rozwiązanie AlanSM Solutions',
      solutionText: 'Zbudowaliśmy zoptymalizowany pod smartfony portal rezerwacji, który pozwala klientkom na wybór konkretnej usługi, stylistki oraz wygodnej godziny w zaledwie 3 kliknięcia. Integracja z mikropłatnościami zabezpiecza rezerwacje poprzez wpłatę zaliczek, a webhooki automatycznie wysyłają przypomnienia na WhatsApp/SMS przed wizytą.',
      featuresTitle: 'Funkcjonalności Portalu',
      features: [
        'Intuicyjny, 3-etapowy proces rezerwacji zoptymalizowany pod ekrany telefonów',
        'Zintegrowany moduł przedpłat (zaliczek) online zabezpieczający przed stratami',
        'Automatyczne SMSy i powiadomienia z przypomnieniem o dacie wizyty',
        'Przejrzysta galeria realizacji i cennik usług z łatwą edycją z telefonu',
        'Baza stałych klientów z historią zabiegów i automatycznym rabatowaniem'
      ],
      techTitle: 'Zestaw Technologiczny',
      techStack: ['Mobile-First React PWA', 'Tailwind CSS Mobile UI', 'Direct Scheduler Engine', 'SMS Notification Webhooks', 'Stripe Micro-transactions'],
      impactTitle: 'Wpływ na Biznes',
      impactText: 'Ręczna korespondencja w DM spadła o 90%, oszczędzając właścicielce aż 12 godzin pracy tygodniowo. Wprowadzenie przedpłat i automatycznych przypomnień obniżyło odsetek nieobecności klientek o 95%, stabilizując przychody salonu i zwiększając płynność zapisów.',
      ctaTitle: 'Chcesz uwolnić się od ręcznego odpisywania klientkom na Instagramie?',
      ctaButton: 'Zbuduj mobilny system rezerwacji',
      ctaPackage: 'light_booking'
    },
    en: {
      title: 'Jessica Franco — Nail Designer & Salon',
      subtitle: 'Mobile-first booking gateway and automated SMS reminders',
      category: 'Beauty & Portfolio',
      description: 'An intuitive, fast application that combines an elegant visual portfolio with a 3-step booking flow, cutting manual phone support and ensuring appointment booking.',
      heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      url: 'https://jessicafranco.alansmsolutions.com/',
      metrics: [
        { value: '12h', label: 'Time saved per week', icon: 'time' },
        { value: '95%', label: 'Decrease in no-shows', icon: 'noshow' },
        { value: '3 steps', label: 'For checkout and booking', icon: 'growth' }
      ],
      challengeTitle: 'The Challenge',
      challengeText: 'Jessica was wasting up to 2 hours every day managing direct messages on Instagram and Messenger to schedule nails appointments. Additionally, without pre-payments, forgot appointments (no-shows) were a major weekly loss for the salon.',
      solutionTitle: 'Our Customized Strategy',
      solutionText: 'We designed a mobile-first PWA (Progressive Web App) portal that acts as her digital storefront. Customers can view real portfolio work, check transparent pricing, choose their appointment, pay a secure deposit via Stripe, and receive instant calendar entries and text notifications.',
      featuresTitle: 'Core System Capabilities',
      features: [
        'Ultralight 3-step scheduling process optimized for mobile screens',
        'Integrated micro-deposits system to protect business from blank gaps',
        'Automatic SMS text/WhatsApp notifications scheduled ahead of booking',
        'Stunning custom gallery grid with quick upload directly from phone',
        'Customer management interface with appointment history and loyal cards'
      ],
      techTitle: 'Tools & Technologies',
      techStack: ['Mobile React PWA', 'Tailwind CSS Custom Grid', 'State Scheduler Core', 'Stripe Micro-payments', 'SMS Reminder Webhooks'],
      impactTitle: 'Business Impact',
      impactText: 'Social media DM workload fell by 90%, freeing up 12 hours of weekly business time. The direct booking deposits and scheduled text reminders cut the salon\'s no-show rate by 95%, stabilizing the weekly schedule.',
      ctaTitle: 'Tired of answering "Are you free today?" in social media messages?',
      ctaButton: 'Build Your Custom Salon Booking',
      ctaPackage: 'light_booking'
    },
    br: {
      title: 'Jessica Franco — Nail Designer & Salon',
      subtitle: 'Portal de agendamento mobile-first e lembretes automáticos',
      category: 'Beleza & Portfólio',
      description: 'Uma aplicação mobile rápida e intuitiva que une um portfólio de alta resolução a um agendamento rápido em 3 passos, eliminando o suporte manual em redes sociais.',
      heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      url: 'https://jessicafranco.alansmsolutions.com/',
      metrics: [
        { value: '12h', label: 'Horas salvas semanalmente', icon: 'time' },
        { value: '95%', label: 'Redução de no-shows (faltas)', icon: 'noshow' },
        { value: '3 passos', label: 'Para confirmar o horário', icon: 'growth' }
      ],
      challengeTitle: 'O Desafio',
      challengeText: 'Jessica perdia cerca de 2 horas por dia respondendo mensagens diretas no Instagram e WhatsApp para negociar horários de manicure. Além disso, a falta de confirmações financeiras (sinal/caução) gerava furos diários na agenda por conta de clientes que faltavam sem avisar.',
      solutionTitle: 'Nossa Solução Inteligente',
      solutionText: 'Criamos um portal otimizado para celulares que funciona como o cartão de visitas digital do salão. A cliente navega pelo portfólio atualizado, seleciona os procedimentos, escolhe o dia/hora e faz o pagamento antecipado do sinal para garantir a vaga de forma automática.',
      featuresTitle: 'Funcionalidades do Portal',
      features: [
        'Interface otimizada para celulares para agendamento veloz em 3 passos',
        'Sistema de pagamento de sinal (caução) integrado para blindagem financeira',
        'Lembretes via SMS/WhatsApp automatizados antes de cada consulta',
        'Galeria de fotos integrada com upload rápido direto do painel administrativo',
        'Banco de dados de clientes integrado com recorrência de horários'
      ],
      techTitle: 'Desenvolvimento & Conectores',
      techStack: ['Mobile-First React UI', 'Tailwind Utility Framework', 'Custom Scheduling Algorithm', 'Stripe Micro-deposits', 'WhatsApp/SMS API Hooks'],
      impactTitle: 'Impacto Comercial',
      impactText: 'O atendimento manual via Direct reduziu em 90%, liberando 12 horas semanais para focar nos atendimentos reais. A política de sinal e os alertas automáticos reduziram o índice de faltas em 95%, maximizando o faturamento mensal do espaço.',
      ctaTitle: 'Quer parar de perder tempo negociando horários por mensagens?',
      ctaButton: 'Construir Portal do Meu Salão',
      ctaPackage: 'light_booking'
    },
    es: {
      title: 'Jessica Franco — Nail Designer & Salon',
      subtitle: 'Portal móvil de agendamiento y avisos automatizados',
      category: 'Belleza y Catálogo',
      description: 'Una aplicación web móvil ultrarrápida que integra galería interactiva con un sistema de reserva directa en solo 3 pasos, reduciendo la carga administrativa.',
      heroImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      url: 'https://jessicafranco.alansmsolutions.com/',
      metrics: [
        { value: '12h', label: 'Horas libres por semana', icon: 'time' },
        { value: '95%', label: 'Reducción en ausencias', icon: 'noshow' },
        { value: '3 pasos', label: 'De agendamiento rápido', icon: 'growth' }
      ],
      challengeTitle: 'El Desafío',
      challengeText: 'Jessica invertía unas 2 horas diarias respondiendo mensajes directos de redes sociales para coordinar citas de manicura. Sin un filtro de depósitos previos, las ausencias injustificadas descuadraban la agenda del salón y mermaban los ingresos diarios.',
      solutionTitle: 'Nuestra Estrategia Digital',
      solutionText: 'Desarrollamos un portal optimizado para móviles (Mobile-First) que exhibe de forma atractiva el catálogo de servicios. El usuario selecciona la opción deseada y asegura su espacio con un pequeño abono directo en línea, activando la confirmación por mensajería.',
      featuresTitle: 'Estructura Operativa',
      features: [
        'Proceso de reserva directa en 3 pasos optimizado para pantallas táctiles',
        'Módulo de cobro de depósitos o señas integrado para asegurar la asistencia',
        'Sistema automatizado de notificaciones previas a la cita vía SMS',
        'Galería fotográfica de diseños autogestionable por la estilista en segundos',
        'Registro de clientes y frecuencia de tratamientos para fidelización'
      ],
      techTitle: 'Tecnologías Clave',
      techStack: ['Mobile React Layout', 'Tailwind CSS Blocks', 'Interactive Calendar API', 'Stripe Payments', 'Automatic SMS Webhooks'],
      impactTitle: 'Impacto Comercial',
      impactText: 'La correspondencia manual en redes sociales disminuyó un 90%, liberando 12 horas operativas semanales. Los depósitos en línea redujeron las inasistencias en un 95%, garantizando una agenda de citas ocupada de principio a fin.',
      ctaTitle: '¿Quieres automatizar la recepción de clientes en tu salón de belleza?',
      ctaButton: 'Construir Mi Portal de Reservas',
      ctaPackage: 'light_booking'
    }
  }
};

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  projectId,
  currentLang,
  theme,
  onBack,
  onOpenContact
}) => {
  const isDark = theme === 'dark';
  const study = CASE_STUDIES[projectId]?.[currentLang] || CASE_STUDIES[projectId]?.pl || CASE_STUDIES['joanna-filek']?.[currentLang] || CASE_STUDIES['joanna-filek']?.pl;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  if (!study) {
    return null;
  }

  const renderMetricIcon = (iconType: string) => {
    switch (iconType) {
      case 'time':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'growth':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'money':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />;
      case 'noshow':
        return <Shield className="w-5 h-5 text-pink-500" />;
      default:
        return <Zap className="w-5 h-5 text-blue-500" />;
    }
  };

  const backLabel = {
    pl: 'Wróć do strony głównej',
    en: 'Back to Home',
    br: 'Voltar ao Início',
    es: 'Volver al Inicio'
  };

  const visitLabel = {
    pl: 'Odwiedź aktywną stronę projektu',
    en: 'Visit Live Website',
    br: 'Visitar Site do Projeto',
    es: 'Visitar Sitio del Proyecto'
  };

  return (
    <article className="py-6 md:py-10 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Back Button & Navigation */}
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
          {study.category}
        </span>
      </div>

      {/* Hero Title Area */}
      <header className="mb-8">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {study.title}
        </h1>
        <p className={`text-sm sm:text-base md:text-lg font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {study.subtitle}
        </p>
      </header>

      {/* Main Image Mockup Window */}
      <div className={`relative border rounded-2xl overflow-hidden mb-8 shadow-md ${
        isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-100'
      }`}>
        <div className={`px-4 py-2 flex items-center gap-1.5 border-b ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <div className={`text-[10px] font-mono px-3 py-0.5 rounded-md ml-2 grow max-w-xs truncate ${
            isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-500 border border-slate-100'
          }`}>
            {study.url}
          </div>
        </div>
        
        <div className="relative aspect-video max-h-96 md:max-h-[420px] w-full overflow-hidden bg-slate-900">
          <img 
            src={study.heroImage} 
            alt={study.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-slate-950/60 via-transparent' : 'from-slate-100/10 via-transparent'
          }`} />
        </div>
      </div>

      {/* KPI Metrics Dashboard Row */}
      <section className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        {study.metrics.map((m, idx) => (
          <div 
            key={idx}
            className={`p-3 sm:p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
              isDark 
                ? 'bg-slate-950/40 border-slate-800/80' 
                : 'bg-white border-slate-200/80 shadow-2xs'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shrink-0 ${
              isDark ? 'bg-slate-900' : 'bg-slate-50'
            }`}>
              {renderMetricIcon(m.icon)}
            </div>
            <span className={`text-lg sm:text-xl md:text-2xl font-black leading-none mb-1.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {m.value}
            </span>
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-tight max-w-[120px] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {m.label}
            </span>
          </div>
        ))}
      </section>

      {/* Detailed Technical Content Grid */}
      <section className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Challenge & Solution (Left column spans 2cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-950/20 border-slate-800/60' : 'bg-slate-50/50 border-slate-150'
          }`}>
            <h3 className={`text-base font-bold mb-2.5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-1.5 h-4 bg-pink-500 rounded-xs" />
              {study.challengeTitle}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {study.challengeText}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-950/20 border-slate-800/60' : 'bg-blue-50/10 border-blue-100/60'
          }`}>
            <h3 className={`text-base font-bold mb-2.5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-1.5 h-4 bg-blue-500 rounded-xs" />
              {study.solutionTitle}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {study.solutionText}
            </p>
          </div>

          <div className="pt-2">
            <h3 className={`text-base font-bold mb-3.5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-1.5 h-4 bg-emerald-500 rounded-xs" />
              {study.featuresTitle}
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {study.features.map((f, i) => (
                <li 
                  key={i}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                    isDark 
                      ? 'bg-slate-950/40 border-slate-900 text-slate-300' 
                      : 'bg-white border-slate-100 shadow-3xs text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-normal">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar details (Right column) */}
        <div className="space-y-5">
          {/* Tech Stack */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <h4 className={`text-xs uppercase tracking-[0.15em] font-bold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {study.techTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {study.techStack.map((tech, i) => (
                <span 
                  key={i}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold ${
                    isDark 
                      ? 'bg-slate-900 text-slate-300 border border-slate-800/80' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200/50'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Business Impact Card */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <h4 className={`text-xs uppercase tracking-[0.15em] font-bold mb-3 flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Award className="w-4 h-4 text-blue-500" />
              {study.impactTitle}
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {study.impactText}
            </p>
          </div>

          {/* Live Link Button */}
          <a 
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 p-3 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            {visitLabel[currentLang] || visitLabel.pl}
          </a>
        </div>
      </section>

      {/* Bottom Conversion CTA Banner */}
      <section className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden ${
        isDark 
          ? 'bg-linear-to-b from-slate-950 to-slate-900 border-blue-900/30' 
          : 'bg-linear-to-b from-blue-50/20 to-white border-blue-100 shadow-sm'
      }`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />

        <h3 className={`text-base sm:text-lg font-bold mb-2 relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {study.ctaTitle}
        </h3>
        
        <p className={`text-xs mb-5 max-w-lg mx-auto relative z-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {currentLang === 'pl' && 'Chętnie dostosujemy podobny system bezpośrednio pod procesy i potrzeby Twojej działalności. Porozmawiajmy o wycenie.'}
          {currentLang === 'en' && 'We will happily adapt a similar automated flow custom tailored to your business needs and schedule. Let\'s chat!'}
          {currentLang === 'br' && 'Podemos criar um sistema semelhante adaptado exatamente ao seu modelo de negócio e preferências. Agende um orçamento!'}
          {currentLang === 'es' && 'Estaremos encantados de diseñar un sistema similar a la medida exacta de tus requerimientos operativos. ¡Hablemos!'}
        </p>

        <button
          type="button"
          onClick={() => onOpenContact(study.ctaPackage, 'custom_quote')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition-all relative z-10 shadow-sm"
        >
          {study.ctaButton}
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </article>
  );
};
