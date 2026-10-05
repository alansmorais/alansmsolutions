import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, ArrowLeft, Send 
} from 'lucide-react';
import { Language, Theme } from '../types';

interface ReferralPageProps {
  currentLang: Language;
  theme: Theme;
  onBack: () => void;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({
  currentLang,
  theme,
  onBack
}) => {
  const isDark = theme === 'dark';

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('alansm_referral_lang') as Language;
      return (saved && ['pl', 'en', 'br', 'es'].includes(saved)) ? saved : (currentLang || 'br');
    } catch {
      return currentLang || 'br';
    }
  });

  const [referrerCode, setReferrerCode] = useState<string>('');
  const [referrerName, setReferrerName] = useState<string>('');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [segment, setSegment] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [plan, setPlan] = useState('');
  const [requirements, setRequirements] = useState('');
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ERP Endpoint as specified in Alan's template
  const ERP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyqSx9ThK0tfEuGeSay0jJATaA_ZiUeoj-Ag_gEtvG94mMNX_s0z_A4H2CI4_Oql2ynDg/exec';

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      let code = (qs.get('ref') || qs.get('referral') || '').trim();
      let referrer = (qs.get('referrer') || qs.get('referrerName') || '').trim();

      if (!code) {
        const parts = window.location.pathname.split('/').filter(Boolean);
        const idx = parts.findIndex(x => x.toLowerCase() === 'ref');
        if (idx >= 0 && parts[idx + 1]) code = parts[idx + 1].trim();
      }

      if (code) setReferrerCode(code);
      if (referrer) setReferrerName(referrer);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleServiceToggle = (serviceName: string) => {
    if (services.includes(serviceName)) {
      setServices(services.filter(s => s !== serviceName));
    } else {
      setServices([...services, serviceName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone || !segment || !consent) {
      setErrorMsg(
        lang === 'br' ? 'Preencha todos os campos obrigatórios (*) e aceite os termos.' :
        lang === 'pl' ? 'Wypełnij wszystkie wymagane pola (*) i zaakceptuj zgodę.' :
        lang === 'es' ? 'Complete todos los campos obligatorios (*) y acepte los términos.' :
        'Please complete all required fields (*) and accept consent.'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg(
        lang === 'br' ? 'Digite um e-mail válido.' :
        lang === 'pl' ? 'Wpisz prawidłowy adres e-mail.' :
        lang === 'es' ? 'Ingrese un correo electrónico válido.' :
        'Please enter a valid email address.'
      );
      return;
    }

    setSubmitting(true);

    try {
      // 1. Send to local backend ERP
      await fetch('/api/erp/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: company || fullName,
          contactName: fullName,
          phone,
          email,
          solutionType: services.join(', ') || segment,
          referrerCode,
          referrerName
        })
      }).catch(() => {});

      // 2. Submit to Google Apps Script ERP endpoint
      const formData = new URLSearchParams();
      formData.append('action', 'referrallead');
      formData.append('referralCode', referrerCode);
      formData.append('referrerName', referrerName);
      formData.append('language', lang);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      formData.append('city', city);
      formData.append('segment', segment);
      formData.append('services', JSON.stringify(services));
      formData.append('plan', plan);
      formData.append('requirements', requirements);
      formData.append('consent', consent ? 'yes' : 'no');
      formData.append('consentAt', new Date().toISOString());

      await fetch(ERP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).catch(() => {});

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    br: {
      back: '← Voltar ao site principal',
      badge: 'Convite por Indicação',
      title: 'Transforme sua ideia em um sistema que funciona.',
      desc: 'Você recebeu uma indicação para conhecer a AlanSM Solutions. Conte-nos o que você quer construir, melhorar ou automatizar — e vamos transformar a ideia em uma solução digital real.',
      b1: 'Sem obrigação de compra.',
      b2: 'Atendimento 1-a-1 da AlanSM Solutions.',
      b3: 'Seus dados são usados exclusivamente para tratar esta solicitação.',
      referredBy: 'Indicado por:',
      formTitle: 'Vamos conversar sobre seu projeto',
      formSubtitle: 'Os campos marcados com * são obrigatórios.',
      fullName: 'Nome completo / Empresa *',
      fullNamePh: 'Seu nome completo',
      email: 'E-mail *',
      emailPh: 'seu@email.com',
      phone: 'Telefone / WhatsApp *',
      phonePh: '+55 ...',
      company: 'Empresa / negócio',
      companyPh: 'Nome da empresa',
      city: 'Cidade',
      cityPh: 'São Sebastião, Kraków...',
      segment: 'Tipo de negócio *',
      choose: 'Escolha...',
      restaurant: 'Restaurante / Alimentação',
      transport: 'Transporte / Mobilidade',
      professional: 'Serviços profissionais / Clínicas',
      retail: 'Varejo / E-commerce',
      other: 'Outro',
      servicesTitle: 'O que você procura?',
      s1: 'Website',
      s2: 'Sistema de Reservas',
      s3: 'DeliveryHub / Pedidos',
      s4: 'Configuração ERP / CRM',
      s5: 'Automação de Processos',
      s6: 'Outro',
      plan: 'Pacote / plano de interesse',
      planPh: 'Ex.: Website + Reservas',
      requirements: 'Conte-nos o que você precisa',
      requirementsPh: 'Descreva brevemente seu projeto, problema ou objetivo...',
      consent: 'Concordo que a AlanSM Solutions possa entrar em contato comigo sobre esta solicitação.',
      submit: 'Enviar solicitação de indicação',
      submitting: 'Enviando...',
      successTitle: 'Tudo certo!',
      successText: 'Recebemos sua indicação. A AlanSM Solutions entrará em contato em breve para entender o projeto e os próximos passos.',
      newRequest: 'Enviar outra solicitação',
      whatNext: 'O que acontece em seguida?',
      step1Title: 'Enviar', step1Desc: 'Conte-nos o que você está construindo e o que precisa.',
      step2Title: 'Análise', step2Desc: 'Revisamos sua solicitação e a solução ideal para o seu caso.',
      step3Title: 'Contato', step3Desc: 'A AlanSM Solutions entra em contato direto com você.',
      step4Title: 'Decisão', step4Desc: 'Avançamos apenas quando a solução fizer sentido.'
    },
    en: {
      back: '← Back to main site',
      badge: 'Referral Invitation',
      title: 'Turn your idea into a system that works.',
      desc: 'You were referred to AlanSM Solutions by a partner. Tell us what you want to build, improve or automate — and let’s turn the idea into a real digital solution.',
      b1: 'No obligation to buy.',
      b2: 'Direct 1-on-1 follow-up from AlanSM Solutions.',
      b3: 'Your information is used exclusively to handle this request.',
      referredBy: 'Referred by:',
      formTitle: 'Let’s talk about your project',
      formSubtitle: 'Fields marked * are required.',
      fullName: 'Full name / Company *',
      fullNamePh: 'Your full name',
      email: 'Email *',
      emailPh: 'you@email.com',
      phone: 'Phone / WhatsApp *',
      phonePh: '+... ',
      company: 'Company / business',
      companyPh: 'Company name',
      city: 'City',
      cityPh: 'São Sebastião, Kraków...',
      segment: 'Business type *',
      choose: 'Choose...',
      restaurant: 'Restaurant / Food',
      transport: 'Transport / Mobility',
      professional: 'Professional Services / Clinics',
      retail: 'Retail / E-commerce',
      other: 'Other',
      servicesTitle: 'What are you looking for?',
      s1: 'Website',
      s2: 'Booking System',
      s3: 'DeliveryHub / Orders',
      s4: 'ERP / CRM Setup',
      s5: 'Process Automation',
      s6: 'Other',
      plan: 'Interested package / plan',
      planPh: 'e.g. Website + Booking',
      requirements: 'Tell us what you need',
      requirementsPh: 'Briefly describe your project, problem or goal...',
      consent: 'I agree that AlanSM Solutions may contact me about this referral request.',
      submit: 'Send referral request',
      submitting: 'Sending...',
      successTitle: 'You’re all set.',
      successText: 'Your referral request has been received. AlanSM Solutions will contact you shortly to understand the project and next steps.',
      newRequest: 'Send another request',
      whatNext: 'What happens next?',
      step1Title: 'Submit', step1Desc: 'Tell us what you are building and what you need.',
      step2Title: 'Review', step2Desc: 'We review your request and the right solution for it.',
      step3Title: 'Connect', step3Desc: 'AlanSM Solutions contacts you directly to discuss it.',
      step4Title: 'Decide', step4Desc: 'Move forward only when the solution makes sense.'
    },
    pl: {
      back: '← Powrót do strony głównej',
      badge: 'Zaproszenie z polecenia',
      title: 'Zamień swój pomysł w system, który działa.',
      desc: 'Nasz partner polecił Ci AlanSM Solutions. Opowiedz nam, co chcesz zbudować, usprawnić lub zautomatyzować — a zamienimy ten pomysł w realne rozwiązanie cyfrowe.',
      b1: 'Bez obowiązku zakupu.',
      b2: 'Bezpośredni kontakt 1-na-1 z AlanSM Solutions.',
      b3: 'Twoje dane są wykorzystywane wyłącznie do obsługi tego zgłoszenia.',
      referredBy: 'Polecił Cię:',
      formTitle: 'Porozmawiajmy o Twoim projekcie',
      formSubtitle: 'Pola oznaczone * są wymagane.',
      fullName: 'Imię i nazwisko / Firma *',
      fullNamePh: 'Twoje imię i nazwisko',
      email: 'E-mail *',
      emailPh: 'twoj@email.com',
      phone: 'Telefon / WhatsApp *',
      phonePh: '+48 ...',
      company: 'Firma / działalność',
      companyPh: 'Nazwa firmy',
      city: 'Miasto',
      cityPh: 'Kraków, Warszawa...',
      segment: 'Rodzaj działalności *',
      choose: 'Wybierz...',
      restaurant: 'Restauracja / Gastronomia',
      transport: 'Transport / Mobilność',
      professional: 'Usługi profesjonalne / Kliniki',
      retail: 'Handel / E-commerce',
      other: 'Inne',
      servicesTitle: 'Czego potrzebujesz?',
      s1: 'Strona WWW',
      s2: 'System Rezerwacji',
      s3: 'DeliveryHub / Zamówienia',
      s4: 'Konfiguracja ERP / CRM',
      s5: 'Automatyzacja Procesów',
      s6: 'Inne',
      plan: 'Interesujący pakiet / plan',
      planPh: 'np. Strona + Rezerwacje',
      requirements: 'Opisz swoje potrzeby',
      requirementsPh: 'Krótko opisz swój projekt, problem lub cel biznesowy...',
      consent: 'Wyrażam zgodę na kontakt ze strony AlanSM Solutions w sprawie tego zgłoszenia.',
      submit: 'Wyślij zgłoszenie z polecenia',
      submitting: 'Wysyłanie...',
      successTitle: 'Gotowe!',
      successText: 'Otrzymaliśmy Twoje zgłoszenie. AlanSM Solutions skontaktuje się z Tobą wkrótce, aby omówić projekt i kolejne kroki.',
      newRequest: 'Wyślij kolejne zgłoszenie',
      whatNext: 'Co dzieje się dalej?',
      step1Title: 'Zgłoś', step1Desc: 'Powiedz nam, co budujesz i czego potrzebujesz.',
      step2Title: 'Analiza', step2Desc: 'Analizujemy Twoje zgłoszenie i dobieramy rozwiązanie.',
      step3Title: 'Kontakt', step3Desc: 'AlanSM Solutions kontaktuje się z Tobą bezpośrednio.',
      step4Title: 'Decyzja', step4Desc: 'Podejmujesz decyzję, gdy rozwiązanie w pełni Ci odpowiada.'
    },
    es: {
      back: '← Volver al sitio principal',
      badge: 'Invitación por Referido',
      title: 'Convierte tu idea en un sistema que funciona.',
      desc: 'Fuiste referido a AlanSM Solutions por un socio. Cuéntanos qué quieres construir, mejorar o automatizar, y transformaremos la idea en una solución digital real.',
      b1: 'Sin obligación de compra.',
      b2: 'Seguimiento directo 1 a 1 de AlanSM Solutions.',
      b3: 'Tus datos se utilizan exclusivamente para gestionar esta solicitud.',
      referredBy: 'Referido por:',
      formTitle: 'Hablemos de tu proyecto',
      formSubtitle: 'Los campos marcados con * son obligatorios.',
      fullName: 'Nombre completo / Empresa *',
      fullNamePh: 'Tu nombre completo',
      email: 'Correo electrónico *',
      emailPh: 'tu@email.com',
      phone: 'Teléfono / WhatsApp *',
      phonePh: '+34 ...',
      company: 'Empresa / negocio',
      companyPh: 'Nombre de la empresa',
      city: 'Ciudad',
      cityPh: 'Madrid, Barcelona...',
      segment: 'Tipo de negocio *',
      choose: 'Elija...',
      restaurant: 'Restaurante / Alimentación',
      transport: 'Transporte / Movilidad',
      professional: 'Servicios profesionales / Clínicas',
      retail: 'Comercio / E-commerce',
      other: 'Otro',
      servicesTitle: '¿Qué estás buscando?',
      s1: 'Sitio Web',
      s2: 'Sistema de Reservas',
      s3: 'DeliveryHub / Pedidos',
      s4: 'Configuración ERP / CRM',
      s5: 'Automatización de Procesos',
      s6: 'Otro',
      plan: 'Paquete / plan de interés',
      planPh: 'Ej.: Web + Reservas',
      requirements: 'Cuéntanos qué necesitas',
      requirementsPh: 'Describe brevemente tu proyecto, problema u objetivo...',
      consent: 'Acepto que AlanSM Solutions me contacte sobre esta solicitud de referido.',
      submit: 'Enviar solicitud de referido',
      submitting: 'Enviando...',
      successTitle: '¡Todo listo!',
      successText: 'Hemos recibido tu solicitud. AlanSM Solutions se pondrá en contacto contigo pronto para entender el proyecto y los siguientes pasos.',
      newRequest: 'Enviar otra solicitud',
      whatNext: '¿Qué pasa después?',
      step1Title: 'Enviar', step1Desc: 'Cuéntanos qué estás construyendo y qué necesitas.',
      step2Title: 'Revisión', step2Desc: 'Revisamos tu solicitud y la solución ideal.',
      step3Title: 'Contacto', step3Desc: 'AlanSM Solutions se comunica contigo directamente.',
      step4Title: 'Decisión', step4Desc: 'Avanzamos solo cuando la solución tiene sentido.'
    }
  };

  const currentT = t[lang] || t.br;

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 transition-colors ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top bar with back and language switcher */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors ${
              isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-blue-500" />
            <span>{currentT.back}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => { setLang('br'); localStorage.setItem('alansm_referral_lang', 'br'); }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${lang === 'br' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              🇧🇷 BR
            </button>
            <button
              onClick={() => { setLang('en'); localStorage.setItem('alansm_referral_lang', 'en'); }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${lang === 'en' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => { setLang('pl'); localStorage.setItem('alansm_referral_lang', 'pl'); }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${lang === 'pl' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              🇵🇱 PL
            </button>
            <button
              onClick={() => { setLang('es'); localStorage.setItem('alansm_referral_lang', 'es'); }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${lang === 'es' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-start pt-4">

          {/* Left Column: Copy & Referrer */}
          <div className="space-y-6 lg:sticky lg:top-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{currentT.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              {currentT.title}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentT.desc}
            </p>

            <div className="space-y-3 pt-2 text-sm font-medium">
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /><span>{currentT.b1}</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /><span>{currentT.b2}</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /><span>{currentT.b3}</span></div>
            </div>

            {referrerCode && (
              <div className="p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{currentT.referredBy}</div>
                {referrerName && <div className="text-lg font-bold text-white">{referrerName}</div>}
                <div className="text-xs font-mono text-blue-300">Ref Code: {referrerCode}</div>
              </div>
            )}
          </div>

          {/* Right Column: Referee Registration Form */}
          <div className={`p-6 sm:p-8 rounded-[28px] border shadow-2xl ${
            isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {!submitted ? (
              <>
                <div className="mb-7 border-b border-slate-800/60 pb-6">
                  <h2 className="text-2xl font-extrabold text-white">{currentT.formTitle}</h2>
                  <p className="mt-1 text-xs text-slate-400 font-medium">{currentT.formSubtitle}</p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={currentT.fullNamePh}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={currentT.emailPh}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={currentT.phonePh}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.company}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={currentT.companyPh}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.city}
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={currentT.cityPh}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {currentT.segment}
                      </label>
                      <select
                        required
                        value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      >
                        <option value="">{currentT.choose}</option>
                        <option value="Restaurant / Food">{currentT.restaurant}</option>
                        <option value="Transport / Mobility">{currentT.transport}</option>
                        <option value="Professional Services">{currentT.professional}</option>
                        <option value="Retail / E-commerce">{currentT.retail}</option>
                        <option value="Other">{currentT.other}</option>
                      </select>
                    </div>
                  </div>

                  {/* Services checkboxes */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <label className="block mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                      {currentT.servicesTitle}
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {[currentT.s1, currentT.s2, currentT.s3, currentT.s4, currentT.s5, currentT.s6].map((sName) => (
                        <label 
                          key={sName}
                          onClick={() => handleServiceToggle(sName)}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                            services.includes(sName)
                              ? 'border-blue-500 bg-blue-600/10 text-white'
                              : isDark ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={services.includes(sName)}
                            onChange={() => {}}
                            className="w-4 h-4 accent-blue-600 rounded"
                          />
                          <span>{sName}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {currentT.plan}
                    </label>
                    <input
                      type="text"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      placeholder={currentT.planPh}
                      className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {currentT.requirements}
                    </label>
                    <textarea
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder={currentT.requirementsPh}
                      className={`w-full px-4 py-3 text-xs rounded-xl border outline-none transition-colors resize-y ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300 pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded mt-0.5 shrink-0"
                    />
                    <span className="leading-snug">{currentT.consent}</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? currentT.submitting : currentT.submit}</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-16 px-4 space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-white">{currentT.successTitle}</h2>
                <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  {currentT.successText}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setCompany('');
                    setCity('');
                    setSegment('');
                    setServices([]);
                    setPlan('');
                    setRequirements('');
                    setConsent(false);
                  }}
                  className="text-xs font-bold text-blue-400 hover:underline underline-offset-4"
                >
                  {currentT.newRequest}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Steps section */}
        <div className="pt-12 border-t border-slate-800/60">
          <div className="max-w-xl mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">{currentT.whatNext}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: currentT.step1Title, desc: currentT.step1Desc },
              { num: '02', title: currentT.step2Title, desc: currentT.step2Desc },
              { num: '03', title: currentT.step3Title, desc: currentT.step3Desc },
              { num: '04', title: currentT.step4Title, desc: currentT.step4Desc }
            ].map((step) => (
              <div key={step.num} className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                  {step.num}
                </div>
                <h3 className="mt-3 font-bold text-sm text-white">{step.title}</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
