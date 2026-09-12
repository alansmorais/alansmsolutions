import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Plus, Minus, User, Check, Phone, 
  Smartphone, Eye, Play, RotateCcw, Shield, DollarSign, 
  Sparkles, CheckCircle2, ChevronRight, Zap, Award, ShoppingCart, 
  CreditCard, Users, Send, Map, Lock, RefreshCw, ChefHat, 
  Pizza, MessageSquare, BarChart3, ArrowRight, UserCheck, Heart, 
  Coffee, Star, ThumbsUp, Trash2, Search, SmartphoneIcon, Bike
} from 'lucide-react';
import { Language, Theme } from '../types';

interface InteractiveServiceSandboxProps {
  solutionId: 'website' | 'booking' | 'deliveryhub' | 'restaurant' | 'tracking' | 'crm';
  currentLang: Language;
  theme: Theme;
  onOpenContact: (pkg?: string, price?: string) => void;
}

export const InteractiveServiceSandbox: React.FC<InteractiveServiceSandboxProps> = ({
  solutionId,
  currentLang,
  theme,
  onOpenContact
}) => {
  const isDark = theme === 'dark';

  // ----------------------------------------------------
  // GENERAL GLOBAL MOCK BROWSER CONFIG
  // ----------------------------------------------------
  const getSubdomain = () => {
    switch (solutionId) {
      case 'booking': return 'booking';
      case 'deliveryhub': return 'logistics';
      case 'restaurant': return 'gastrosmart';
      case 'website': return 'coreweb';
      case 'tracking': return 'service-track';
      case 'crm': return 'salesforce-gateway';
      default: return 'portal';
    }
  };

  // ----------------------------------------------------
  // 1. STATE FOR BOOKING SOLUTION (Prywatny System Rezerwacji)
  // ----------------------------------------------------
  const [bookingMode, setBookingMode] = useState<'client' | 'staff'>('client');
  const [bookingStep, setBookingStep] = useState<'service' | 'date' | 'form' | 'success'>('service');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [staffAppointments, setStaffAppointments] = useState([
    { id: '101', name: 'Tomasz Nowak', service: 'Strategia Cyfrowa', date: '14 Sep', time: '09:30', status: 'Confirmed' },
    { id: '102', name: 'Ana Silva', service: 'Audyt Wydajności', date: '15 Sep', time: '14:30', status: 'Confirmed' },
    { id: '103', name: 'Mateusz Wiśniewski', service: 'Stripe Integration', date: '16 Sep', time: '11:00', status: 'Pending' }
  ]);

  // ----------------------------------------------------
  // 2. STATE FOR DELIVERYHUB SOLUTION (Platforma DeliveryHub)
  // ----------------------------------------------------
  const [deliveryMode, setDeliveryMode] = useState<'storefront' | 'merchant' | 'savings'>('storefront');
  const [deliveryBasket, setDeliveryBasket] = useState<Record<string, number>>({});
  const [distanceKm, setDistanceKm] = useState<number>(3.5);
  const [orderValue, setOrderValue] = useState<number>(35);
  const [deliveryStatus, setDeliveryStatus] = useState<'received' | 'cooking' | 'en_route' | 'delivered'>('cooking');
  const [courierPosition, setCourierPosition] = useState<number>(30);
  const [courierName, setCourierName] = useState<string>('Adam (Rower/E-Bike)');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Rynek Główny 12, Kraków');
  const [activeOrders, setActiveOrders] = useState([
    { id: '#ASM-1092', items: '1x Margherita Grande', total: '42 PLN', status: 'cooking', address: 'Floriańska 8' },
    { id: '#ASM-1093', items: '2x Double Smash Burger', total: '78 PLN', status: 'en_route', address: 'Karmelicka 15' }
  ]);

  // ----------------------------------------------------
  // 3. STATE FOR RESTAURANT SOLUTION (Gastronomia)
  // ----------------------------------------------------
  const [restaurantTab, setRestaurantTab] = useState<'qr_menu' | 'kds' | 'retention'>('qr_menu');
  const [restaurantStep, setRestaurantStep] = useState<'menu' | 'checkout' | 'kitchen_success'>('menu');
  const [selectedTable, setSelectedTable] = useState<string>('04');
  const [restaurantCart, setRestaurantCart] = useState<Record<string, number>>({});
  const [splitCount, setSplitCount] = useState<number>(2);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [isPayingRestaurant, setIsPayingRestaurant] = useState(false);
  const [kdsTickets, setKdsTickets] = useState([
    { id: 'T-04', table: 'Mesa 04', items: '1x Classic Burger, 1x Lemonade', status: 'Preparing', elapsed: '2 min' },
    { id: 'T-08', table: 'Mesa 08', items: '2x Wedges Extra Topping', status: 'Plating', elapsed: '8 min' }
  ]);
  const [satisfactionFeedbacks, setSatisfactionFeedbacks] = useState([
    { id: '1', table: 'Mesa 02', rating: 5, comment: 'Szybka płatność przy stoliku! Super sprawa.', date: 'Dziś, 12:15' },
    { id: '2', table: 'Mesa 11', rating: 5, comment: 'Brak prowizji w menu zachęca do częstszego zamawiania.', date: 'Dziś, 13:40' }
  ]);
  const [promoCodeGenerated, setPromoCodeGenerated] = useState<string>('');

  // ----------------------------------------------------
  // 4. STATE FOR WEBSITE PERFORMANCE (Strony i Portale Biznesowe)
  // ----------------------------------------------------
  const [activeLayout, setActiveLayout] = useState<'minimalist' | 'corporate' | 'portfolio'>('minimalist');
  const [speedScore, setSpeedScore] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [seoTitle, setSeoTitle] = useState<string>('AlanSM Solutions — Nowoczesne Systemy Cyfrowe');
  const [seoDesc, setSeoDesc] = useState<string>('Budujemy dedykowane systemy rezerwacji online, platformy dostaw 0% prowizji oraz bazy CRM dla biznesu.');

  // ----------------------------------------------------
  // 5. STATE FOR TRACKING SOLUTION (Zlecenia i Serwis)
  // ----------------------------------------------------
  const [trackingSearchQuery, setTrackingSearchQuery] = useState<string>('ASM-9482');
  const [trackingOrderFound, setTrackingOrderFound] = useState<boolean>(false);
  const [trackingOrderStep, setTrackingOrderStep] = useState<number>(2); // 1 to 4
  const [trackingChecklist, setTrackingChecklist] = useState<Record<string, boolean>>({
    diagnose: true,
    parts: false,
    solder: false,
    test: false
  });

  // ----------------------------------------------------
  // 6. STATE FOR CRM / SALESFORCE (Integracje SOUBLOX)
  // ----------------------------------------------------
  const [crmLeads, setCrmLeads] = useState<Array<{ id: string; name: string; company: string; val: string; stage: 'incoming' | 'discovered' | 'proposal' | 'won' }>>([
    { id: '1', name: 'Marek Jankowski', company: 'TechPlaza Sp. z o.o.', val: '4 900 PLN', stage: 'incoming' },
    { id: '2', name: 'Sophia Loren', company: 'Global Design LLC', val: '$1,250', stage: 'discovered' },
    { id: '3', name: 'Carlos Mendes', company: 'Mendes Transportes', val: 'R$ 6.900', stage: 'proposal' }
  ]);
  const [crmLogs, setCrmLogs] = useState<string[]>([]);
  const [isCrmProcessing, setIsCrmProcessing] = useState<boolean>(false);

  // Reset states on solution change to avoid crosstalk
  useEffect(() => {
    setBookingStep('service');
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setBookingName('');
    setBookingPhone('');
    setDeliveryBasket({});
    setRestaurantStep('menu');
    setRestaurantCart({});
    setSplitCount(2);
    setTipPercent(10);
    setSpeedScore(0);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setTrackingSearchQuery('ASM-9482');
    setTrackingOrderFound(false);
    setTrackingOrderStep(2);
  }, [solutionId]);

  // Automated simulated courier position increments
  useEffect(() => {
    if (solutionId === 'deliveryhub' && deliveryMode === 'storefront' && deliveryStatus === 'en_route') {
      const interval = setInterval(() => {
        setCourierPosition(prev => {
          if (prev >= 100) {
            setDeliveryStatus('delivered');
            return 100;
          }
          return prev + 5;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [solutionId, deliveryMode, deliveryStatus]);

  // ----------------------------------------------------
  // TRANSLATION DICTIONARIES
  // ----------------------------------------------------
  const dict = {
    pl: {
      bookingTitle: "1. Prywatny System Rezerwacji — ASM Booking Portal",
      bookingDesc: "W pełni samodzielny system rezerwacji, który oszczędza Twój czas i automatycznie koordynuje kalendarze.",
      deliveryTitle: "2. Platforma DeliveryHub — Niezależna Logistyka Dostaw",
      deliveryDesc: "Własny kanał zamówień z dostawą 0% prowizji. Pełna koordynacja kurierów i bezpośredni zysk.",
      restaurantTitle: "3. System dla Gastronomii — Smart QR Menu & KDS Hub",
      restaurantDesc: "Ekosystem gastronomii: od interaktywnego zamawiania przy stolikach po ekrany produkcyjne w kuchni.",
      websiteTitle: "4. Strony i Portale Biznesowe — Konsola Wydajności i SEO",
      websiteDesc: "Sprawdź, jak optymalizujemy kod pod Core Web Vitals i jak roboty Google indeksują Twoją witrynę.",
      trackingTitle: "5. Śledzenie Zleceń i Serwisu — Portal Klienta",
      trackingDesc: "Udostępnij klientom automatyczną ścieżkę śledzenia napraw w warsztacie lub serwisie technicznym.",
      crmTitle: "6. Salesforce CRM & SOUBLOX Webhook Automation",
      crmDesc: "Przetestuj zaawansowany lejek sprzedaży, który automatycznie generuje umowy, faktury Stripe i powiadomienia.",
      
      // Buttons
      done: "Ukończone",
      clientView: "Widok Klienta (Rezerwacja)",
      staffView: "Widok Pracownika (Kalendarz)",
      orderStorefront: "1. Sklep Internetowy",
      orderMerchant: "2. Panel Logistyki Kurierskiej",
      orderSavings: "3. Symulator Oszczędności",
      qrMenuTab: "1. QR Menu przy Stoliku",
      kdsTab: "2. Ekran Kuchenny (KDS)",
      retentionTab: "3. CRM & Lojalność",
      seoAuditTab: "Lighthouse Audit",
      seoPreviewTab: "Podgląd Google SERP"
    },
    en: {
      bookingTitle: "1. Private Booking System — ASM Booking Portal",
      bookingDesc: "Fully independent scheduling portal that secures appointments and automates calendars.",
      deliveryTitle: "2. DeliveryHub Platform — Independent Logistics Engine",
      deliveryDesc: "Your own commission-free ordering channel. Coordinate dispatches and secure 100% of profits.",
      restaurantTitle: "3. Gastronomy Suite — Smart QR Menu & KDS Console",
      restaurantDesc: "Hospitality ecosystem linking table-side self-orders directly to the kitchen display.",
      websiteTitle: "4. Business Portals — Performance & SEO Engine",
      websiteDesc: "Verify how we compress clean code for Core Web Vitals and simulate search engine indexation.",
      trackingTitle: "5. Service Status Tracker — Client Terminal",
      trackingDesc: "Enable automatic real-time milestone tracking for technical repairs and repair shops.",
      crmTitle: "6. Salesforce CRM & SOUBLOX Webhook Gateway",
      crmDesc: "Drag deals through pipelines to trigger automated Stripe invoicing and dispatch logs.",
      
      // Buttons
      done: "Finished",
      clientView: "Client View (Scheduler)",
      staffView: "Staff View (Calendar)",
      orderStorefront: "1. Storefront Webapp",
      orderMerchant: "2. Logistics Controller",
      orderSavings: "3. Profit Simulator",
      qrMenuTab: "1. Table QR Self-Order",
      kdsTab: "2. Kitchen Monitor (KDS)",
      retentionTab: "3. CRM & Retention",
      seoAuditTab: "Lighthouse Performance",
      seoPreviewTab: "Google SERP Simulator"
    },
    br: {
      bookingTitle: "1. Portal de Agendamentos — ASM Booking Portal",
      bookingDesc: "Plataforma de marca própria que organiza sua agenda de forma automatizada e livre de taxas.",
      deliveryTitle: "2. DeliveryHub Logistics — Entrega Direta Sem Taxas",
      deliveryDesc: "Canal independente de pedidos com entrega local. Coordene motoboys e evite taxas abusivas.",
      restaurantTitle: "3. Sistema para Gastronomia — Menu QR & Tela de Produção",
      restaurantDesc: "Ecossistema para restaurantes: autoatendimento na mesa e controle integrado de cozinha.",
      websiteTitle: "4. Páginas Web — Console de Performance e SEO",
      websiteDesc: "Veja como otimizamos o código de forma nativa e simule a indexação de busca do Google.",
      trackingTitle: "5. Rastreamento de Ordens — Portal do Cliente",
      trackingDesc: "Acompanhamento automático em tempo real para assistências técnicas e oficinas de reparos.",
      crmTitle: "6. Salesforce CRM e Integração de Webhooks SOUBLOX",
      crmDesc: "Arrastar leads dispara faturamento via Stripe, criação de contas e canais automatizados.",
      
      // Buttons
      done: "Concluído",
      clientView: "Visão do Cliente",
      staffView: "Visão Administrativa",
      orderStorefront: "1. Loja do Cliente",
      orderMerchant: "2. Painel de Logística",
      orderSavings: "3. Simulador Financeiro",
      qrMenuTab: "1. Menu QR de Mesa",
      kdsTab: "2. Monitor de Cozinha (KDS)",
      retentionTab: "3. CRM e Fidelização",
      seoAuditTab: "Lighthouse Audit",
      seoPreviewTab: "Prévia de Busca Google"
    },
    es: {
      bookingTitle: "1. Sistema de Reservas Directas — ASM Booking Portal",
      bookingDesc: "Plataforma de citas optimizada para tu negocio, con control total de tus tiempos y agenda.",
      deliveryTitle: "2. Plataforma DeliveryHub — Logística Sin Comisiones",
      deliveryDesc: "Canal de entrega propio sin comisiones de marketplace. Controla repartidores y maximiza ganancias.",
      restaurantTitle: "3. Soluciones de Restaurantes — QR Inteligente y Cocina",
      restaurantDesc: "Herramientas de hostelería unificadas: autopedidos por código QR y monitor de producción (KDS).",
      websiteTitle: "4. Portales Web — Analizador de Velocidad y SEO",
      websiteDesc: "Comprueba cómo aceleramos tu código y visualiza el rastreo de buscadores en tiempo real.",
      trackingTitle: "5. Seguimiento de Reparaciones — Portal de Clientes",
      trackingDesc: "Estatus automatizado de servicio para talleres mecánicos, laboratorios y soporte técnico.",
      crmTitle: "6. Salesforce CRM & Automatizaciones SOUBLOX",
      crmDesc: "Mueve tratos en la tubería de ventas para gatillar cobros Stripe, contratos y alertas Slack.",
      
      // Buttons
      done: "Completado",
      clientView: "Vista de Cliente",
      staffView: "Vista de Personal",
      orderStorefront: "1. Tienda Online",
      orderMerchant: "2. Consola Logística",
      orderSavings: "3. Simulador de Ahorro",
      qrMenuTab: "1. Menú QR de Mesa",
      kdsTab: "2. Monitor de Cocina (KDS)",
      retentionTab: "3. CRM y Fidelización",
      seoAuditTab: "Auditoría Lighthouse",
      seoPreviewTab: "Simulador de Google"
    }
  };

  const local = dict[currentLang] || dict.pl;

  // Simulate PageSpeed audit function
  const runPageSpeedAudit = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setSpeedScore(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setSpeedScore(99);
        setIsAnalyzing(false);
      }
    }, 50);
  };

  return (
    <div className={`border rounded-2xl overflow-hidden mb-12 shadow-md transition-all ${
      isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white'
    }`}>
      
      {/* ----------------------------------------------------
          MOCK BROWSER BAR (Representing a Live Product Index)
          ---------------------------------------------------- */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 py-3 border-b text-xs select-none ${
        isDark ? 'bg-slate-900/60 border-slate-850 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="text-[10px] ml-2 font-mono font-bold uppercase tracking-wider text-blue-500">
            ASM LIVE DEPLOY
          </span>
        </div>
        
        <div className={`px-4 py-1.5 rounded-lg text-[10px] font-mono flex items-center gap-1.5 w-full sm:w-2/3 max-w-md justify-center ${
          isDark ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-700 border border-slate-200 shadow-3xs'
        }`}>
          <Lock className="w-3 h-3 text-emerald-500" />
          <span className="truncate">https://{getSubdomain()}.alansmsolutions.com/index-workspace</span>
        </div>

        <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-mono self-end sm:self-auto">
          {solutionId === 'booking' && "Booking OS"}
          {solutionId === 'deliveryhub' && "DeliveryHub v2"}
          {solutionId === 'restaurant' && "Dining POS"}
          {solutionId === 'website' && "CoreWeb Portal"}
          {solutionId === 'tracking' && "Service OS"}
          {solutionId === 'crm' && "CRM Gate"}
        </div>
      </div>

      {/* Widget Scoping Info */}
      <div className="p-4 sm:p-5 border-b border-slate-150 dark:border-slate-850 bg-gradient-to-r from-blue-500/5 to-transparent">
        <div className="flex items-start gap-2.5">
          <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {solutionId === 'booking' && local.bookingTitle}
              {solutionId === 'deliveryhub' && local.deliveryTitle}
              {solutionId === 'restaurant' && local.restaurantTitle}
              {solutionId === 'website' && local.websiteTitle}
              {solutionId === 'tracking' && local.trackingTitle}
              {solutionId === 'crm' && local.crmTitle}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {solutionId === 'booking' && local.bookingDesc}
              {solutionId === 'deliveryhub' && local.deliveryDesc}
              {solutionId === 'restaurant' && local.restaurantDesc}
              {solutionId === 'website' && local.websiteDesc}
              {solutionId === 'tracking' && local.trackingDesc}
              {solutionId === 'crm' && local.crmDesc}
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          PORTAL BODY PANELS
          ---------------------------------------------------- */}
      <div className="p-5 sm:p-6">
        
        {/* ====================================================
            1. PRIVATE BOOKING PORTAL INDEX
            ==================================================== */}
        {solutionId === 'booking' && (
          <div className="space-y-6">
            {/* Sector Nav Tabs */}
            <div className="flex gap-2 border-b border-slate-150 dark:border-slate-850 pb-3">
              <button
                onClick={() => setBookingMode('client')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  bookingMode === 'client'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{local.clientView}</span>
              </button>
              <button
                onClick={() => setBookingMode('staff')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  bookingMode === 'staff'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{local.staffView}</span>
              </button>
            </div>

            {bookingMode === 'client' ? (
              <div className="max-w-md mx-auto space-y-4">
                {/* Step indicators */}
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-850/50 pb-2">
                  <span className={bookingStep === 'service' ? 'text-blue-500 font-extrabold' : ''}>1. Usługa</span>
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span className={bookingStep === 'date' ? 'text-blue-500 font-extrabold' : ''}>2. Termin</span>
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span className={bookingStep === 'form' ? 'text-blue-500 font-extrabold' : ''}>3. Potwierdzenie</span>
                </div>

                {/* STEP 1 */}
                {bookingStep === 'service' && (
                  <div className="space-y-3">
                    {[
                      { id: 's1', title: 'Konsultacja Strategiczna z Alanem Morais', desc: 'Precyzyjne planowanie architektury IT i optymalizacji kosztów prowizji.', duration: '60 min', price: 'Bezpłatnie' },
                      { id: 's2', title: 'Audyt Wydajności Core Web Vitals', desc: 'Analiza szybkości kodu strony pod kątem pozycjonowania Google.', duration: '45 min', price: 'Bezpłatnie' },
                      { id: 's3', title: 'Skanowanie Procesów CRM i SOUBLOX API', desc: 'Mapowanie integracji systemów Salesforce ze Stripe i webhookami.', duration: '90 min', price: 'Bezpłatnie' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s.title);
                          setBookingStep('date');
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                          isDark 
                            ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900' 
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-2 w-full">
                          <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.title}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-extrabold">
                            {s.price}
                          </span>
                        </div>
                        <p className={`text-[11px] mb-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.desc}</p>
                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-500" /> {s.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* STEP 2 */}
                {bookingStep === 'date' && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Dostępne dni:</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[
                          { label: 'Pon', day: '14 Sep', full: '14.09.2026' },
                          { label: 'Wt', day: '15 Sep', full: '15.09.2026' },
                          { label: 'Śr', day: '16 Sep', full: '16.09.2026' },
                          { label: 'Czw', day: '17 Sep', full: '17.09.2026' },
                          { label: 'Pią', day: '18 Sep', full: '18.09.2026' }
                        ].map(d => (
                          <button
                            key={d.full}
                            onClick={() => setSelectedDate(d.full)}
                            className={`py-2 rounded-lg border text-center transition-all ${
                              selectedDate === d.full
                                ? 'border-blue-500 bg-blue-500/10 text-blue-500 font-bold'
                                : isDark 
                                  ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700' 
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 shadow-3xs'
                            }`}
                          >
                            <span className="text-[8px] uppercase text-slate-400 block">{d.label}</span>
                            <span className="text-xs font-black block mt-0.5">{d.day.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Dostępne Godziny:</span>
                        <div className="grid grid-cols-4 gap-2">
                          {["09:30", "11:00", "14:30", "16:00"].map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 rounded-lg border text-xs font-bold text-center transition-all ${
                                selectedTime === slot
                                  ? 'border-blue-500 bg-blue-500/15 text-blue-500'
                                  : isDark 
                                    ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700' 
                                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 shadow-3xs'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={() => setBookingStep('service')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                          isDark ? 'border-slate-800 text-slate-300 hover:bg-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Cofnij
                      </button>
                      <button
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setBookingStep('form')}
                        className="flex-1 py-2 text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-40 transition-colors"
                      >
                        Dalej
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {bookingStep === 'form' && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border text-xs space-y-1 ${
                      isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
                    }`}>
                      <div className="font-extrabold text-blue-500 text-[13px]">{selectedService}</div>
                      <div className="text-slate-400 font-medium flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> {selectedDate} 
                        <Clock className="w-3.5 h-3.5 text-slate-500 ml-1" /> {selectedTime}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Twoje imię i nazwisko"
                        value={bookingName}
                        onChange={e => setBookingName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 outline-none ${
                          isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-3xs'
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Numer telefonu (do powiadomień WhatsApp)"
                        value={bookingPhone}
                        onChange={e => setBookingPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 outline-none ${
                          isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-3xs'
                        }`}
                      />
                    </div>

                    <button
                      disabled={!bookingName || !bookingPhone || isSubmittingBooking}
                      onClick={() => {
                        setIsSubmittingBooking(true);
                        setTimeout(() => {
                          setIsSubmittingBooking(false);
                          setBookingStep('success');
                          // Inject to staff agenda dynamically
                          setStaffAppointments(prev => [
                            ...prev,
                            { id: String(Date.now()).slice(-3), name: bookingName, service: selectedService, date: '14 Sep', time: selectedTime, status: 'Confirmed' }
                          ]);
                        }, 1200);
                      }}
                      className="w-full py-2.5 text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white rounded-xl disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmittingBooking ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                          <span>Zapisywanie rezerwacji...</span>
                        </>
                      ) : (
                        "Zarezerwuj Termin (0 PLN)"
                      )}
                    </button>
                  </div>
                )}

                {/* SUCCESS */}
                {bookingStep === 'success' && (
                  <div className={`border rounded-2xl p-5 text-center space-y-4 ${
                    isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-blue-50/30 border-blue-100 shadow-3xs'
                  }`}>
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-200">Rezerwacja Gotowa!</h4>
                      <p className="text-xs text-slate-400 mt-1">Status został wysłany na Twój telefon oraz kalendarz.</p>
                    </div>

                    <div className={`p-4 rounded-xl border text-left text-xs space-y-2.5 max-w-xs mx-auto ${
                      isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
                    }`}>
                      <div className="font-extrabold text-[10px] uppercase tracking-wider text-blue-500">Kwit Systemowy #ASM-BOOK-801</div>
                      <div className="font-bold text-slate-300">{selectedService}</div>
                      <div className="text-[11px] text-slate-400">Pacjent/Klient: <span className="font-semibold text-slate-300">{bookingName}</span></div>
                      <div className="pt-2 border-t border-slate-800/60 text-blue-400 font-extrabold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {selectedDate} @ {selectedTime}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBookingStep('service');
                        setSelectedService('');
                        setSelectedDate('');
                        setSelectedTime('');
                        setBookingName('');
                        setBookingPhone('');
                      }}
                      className="text-xs font-bold text-blue-500 hover:text-blue-400 block mx-auto pt-1"
                    >
                      Zarezerwuj kolejną wizytę
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* STAFF AGENDA DASHBOARD */
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Dzienny Grafik Zleceń (14 - 18 Września)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold font-mono">
                    Cloud Synced
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-850">
                  <table className="w-full text-left text-xs">
                    <thead className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                      <tr>
                        <th className="p-3">Klient</th>
                        <th className="p-3">Usługa</th>
                        <th className="p-3">Data & Godzina</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Akcja</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {staffAppointments.map(app => (
                        <tr key={app.id} className={isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                          <td className="p-3 font-bold text-slate-300">{app.name}</td>
                          <td className="p-3 text-slate-400">{app.service}</td>
                          <td className="p-3 font-mono text-slate-400">{app.date} | {app.time}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              app.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setStaffAppointments(prev => prev.map(a => a.id === app.id ? { ...a, status: 'Confirmed' } : a));
                              }}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold transition-all"
                            >
                              Akceptuj
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            2. DELIVERYHUB LOGISTICS PORTAL INDEX
            ==================================================== */}
        {solutionId === 'deliveryhub' && (
          <div className="space-y-6">
            {/* Sector Tabs */}
            <div className="flex gap-2 border-b border-slate-150 dark:border-slate-850 pb-3">
              <button
                onClick={() => setDeliveryMode('storefront')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  deliveryMode === 'storefront'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{local.orderStorefront}</span>
              </button>
              <button
                onClick={() => setDeliveryMode('merchant')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  deliveryMode === 'merchant'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{local.orderMerchant}</span>
              </button>
              <button
                onClick={() => setDeliveryMode('savings')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  deliveryMode === 'savings'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{local.orderSavings}</span>
              </button>
            </div>

            {/* STOREFRONT VIEW */}
            {deliveryMode === 'storefront' && (
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3 space-y-4">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Menu Produkty</h5>
                  {[
                    { id: 'p1', title: 'Pizza Margherita Grande', price: 42, desc: 'Sos pomidorowy, mozzarella fior di latte, świeża bazylia', imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=200&auto=format&fit=crop' },
                    { id: 'p2', title: 'Double Smash Beef Burger', price: 39, desc: '2x 120g wołowiny, ser cheddar, pikle, autorski sos', imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=200&auto=format&fit=crop' },
                    { id: 'p3', title: 'Chrupiące Frytki Belgijskie', price: 16, desc: 'Podawane z rzemieślniczym sosem czosnkowym', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=200&auto=format&fit=crop' }
                  ].map(prod => {
                    const count = deliveryBasket[prod.id] || 0;
                    return (
                      <div key={prod.id} className={`p-3 rounded-xl border flex gap-3 items-center ${
                        isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
                      }`}>
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 pr-1 min-w-0">
                          <h6 className="text-xs font-bold text-slate-200 truncate">{prod.title}</h6>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{prod.desc}</p>
                          <span className="text-[11px] font-extrabold text-blue-500 mt-1 block">{prod.price} PLN</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {count > 0 ? (
                            <>
                              <button
                                onClick={() => setDeliveryBasket(prev => ({ ...prev, [prod.id]: Math.max(0, count - 1) }))}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                                  isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300'
                                }`}
                              >
                                <Minus className="w-3 h-3 text-slate-400" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{count}</span>
                              <button
                                onClick={() => setDeliveryBasket(prev => ({ ...prev, [prod.id]: count + 1 }))}
                                className="w-6 h-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setDeliveryBasket(prev => ({ ...prev, [prod.id]: 1 }))}
                              className={`px-3 py-1 text-[10px] font-bold rounded-lg border hover:border-blue-500 transition-colors ${
                                isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                              }`}
                            >
                              Dodaj
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BASKET SIDEBAR */}
                <div className="md:col-span-2 space-y-4">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Twoje Zamówienie</h5>
                  
                  <div className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-slate-900/20 border-slate-850' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {/* Items stack */}
                    {Object.keys(deliveryBasket).filter(id => deliveryBasket[id] > 0).length === 0 ? (
                      <p className="text-[11px] text-slate-400 text-center py-6">Dodaj produkty z menu aby przetestować symulator.</p>
                    ) : (
                      <div className="space-y-2.5 text-xs">
                        {[
                          { id: 'p1', title: 'Pizza Margherita', price: 42 },
                          { id: 'p2', title: 'Smash Burger', price: 39 },
                          { id: 'p3', title: 'Frytki Belgijskie', price: 16 }
                        ].filter(p => deliveryBasket[p.id] > 0).map(p => (
                          <div key={p.id} className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-300">{deliveryBasket[p.id]}x {p.title}</span>
                            <span className="font-bold text-slate-200">{p.price * deliveryBasket[p.id]} PLN</span>
                          </div>
                        ))}
                        
                        <div className="pt-2 border-t border-slate-850 space-y-1 text-[10px] text-slate-400">
                          <div className="flex justify-between">
                            <span>Koszt dostawy (3.5 km):</span>
                            <span className="text-emerald-500 font-bold">Gratis</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-extrabold text-blue-500 pt-1">
                            <span>Suma (0% prowizji):</span>
                            <span>
                              {
                                [
                                  { id: 'p1', price: 42 },
                                  { id: 'p2', price: 39 },
                                  { id: 'p3', price: 16 }
                                ].reduce((acc, curr) => acc + (curr.price * (deliveryBasket[curr.id] || 0)), 0)
                              } PLN
                            </span>
                          </div>
                        </div>

                        {/* Input Address */}
                        <div className="space-y-1 pt-2">
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Adres dostawy:</span>
                          <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded text-[10px] outline-none ${
                              isDark ? 'bg-slate-950 border border-slate-800 text-white' : 'bg-white border border-slate-200'
                            }`}
                          />
                        </div>

                        <button
                          onClick={() => {
                            setDeliveryStatus('cooking');
                            setCourierPosition(20);
                            setDeliveryMode('merchant');
                            // Add order to list dynamically
                            setActiveOrders(prev => [
                              {
                                id: `#ASM-${String(Date.now()).slice(-4)}`,
                                items: Object.keys(deliveryBasket)
                                  .filter(id => deliveryBasket[id] > 0)
                                  .map(id => `${deliveryBasket[id]}x ${id === 'p1' ? 'Margherita' : id === 'p2' ? 'Smash Burger' : 'Frytki'}`)
                                  .join(', '),
                                total: `${[
                                  { id: 'p1', price: 42 },
                                  { id: 'p2', price: 39 },
                                  { id: 'p3', price: 16 }
                                ].reduce((acc, curr) => acc + (curr.price * (deliveryBasket[curr.id] || 0)), 0)} PLN`,
                                status: 'cooking',
                                address: deliveryAddress
                              },
                              ...prev
                            ]);
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-lg transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Złóż Zamówienie 0% prowizji</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MERCHANT COORDINATION PANEL */}
            {deliveryMode === 'merchant' && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Active Orders List */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Zamówienia w systemie</span>
                  {activeOrders.map(ord => (
                    <div 
                      key={ord.id}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        ord.status === 'en_route' 
                          ? 'border-blue-500/50 bg-blue-500/5' 
                          : isDark ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-blue-500">{ord.id}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          ord.status === 'delivered' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-blue-500/15 text-blue-500'
                        }`}>
                          {ord.status === 'cooking' && "Kuchnia"}
                          {ord.status === 'en_route' && "W drodze"}
                          {ord.status === 'delivered' && "Dostarczone"}
                        </span>
                      </div>
                      <p className="text-slate-300 font-bold">{ord.items}</p>
                      <p className="text-[10px] text-slate-400">{ord.address}</p>
                      <div className="flex justify-between pt-1 border-t border-slate-850/50 text-[10px]">
                        <span className="text-slate-400">Wartość: <span className="font-bold text-slate-200">{ord.total}</span></span>
                        {ord.status === 'cooking' && (
                          <button
                            onClick={() => {
                              setActiveOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: 'en_route' } : o));
                              setDeliveryStatus('en_route');
                              setCourierPosition(25);
                            }}
                            className="text-blue-500 font-extrabold hover:underline text-[9px]"
                          >
                            Wyślij Kuriera
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated GPS Routing coordination */}
                <div className="md:col-span-2 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Śledzenie Kuriera na Mapie (Kraków)</span>
                  
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between h-52 relative overflow-hidden ${
                    isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200 shadow-3xs'
                  }`}>
                    <div className="flex justify-between items-center z-10">
                      <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                        <Map className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                        Kurier: <span className="font-bold text-slate-200">{courierName}</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/15 px-2 py-0.5 rounded">
                        GPS Active (3.5 km)
                      </span>
                    </div>

                    {/* Simulated Map Visual Route */}
                    <div className="absolute inset-x-8 top-24 h-1.5 bg-slate-800 rounded-full">
                      {/* Courier tracker bar */}
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${courierPosition}%` }}
                      />
                      
                      {/* Restaurant Node */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center">
                        <span className="text-[8px] font-mono font-black text-blue-400">RE</span>
                      </div>

                      {/* Moving Courier icon */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 z-10"
                        style={{ left: `${courierPosition}%` }}
                      >
                        <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg border border-white animate-bounce">
                          <Bike className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Customer Node */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center">
                        <span className="text-[8px] font-mono font-black text-emerald-400">CU</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 font-bold z-10">
                      <span>Restauracja (Floriańska 4)</span>
                      <span>Klient ({deliveryAddress})</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setCourierPosition(15);
                        setDeliveryStatus('cooking');
                        setActiveOrders(prev => prev.map(o => o.status === 'en_route' ? { ...o, status: 'cooking' } : o));
                      }}
                      className="text-xs font-bold text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Resetuj Trasę</span>
                    </button>
                    <button
                      onClick={() => {
                        setCourierName(prev => prev.includes('E-Bike') ? 'Piotr (Skuter spalinowy)' : 'Adam (Rower/E-Bike)');
                      }}
                      className="text-xs font-bold text-blue-500 hover:underline"
                    >
                      Zmień Kuriera
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* COMMISSION VS PROFIT ANALYSIS */}
            {deliveryMode === 'savings' && (
              <div className="space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Porównanie Kosztów Operacyjnych</span>
                
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-300">Średnia wartość zamówienia:</span>
                        <span className="text-blue-500 font-extrabold">{orderValue} PLN</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="150"
                        step="5"
                        value={orderValue}
                        onChange={e => setOrderValue(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-300">Miesięczna liczba zamówień w dowozie:</span>
                        <span className="text-blue-500 font-extrabold">250 zamówień</span>
                      </div>
                      <div className="text-[10px] text-slate-400 leading-relaxed">
                        Założyliśmy standardowe 250 zamówień w skali miesiąca dla małego lokalu. Prowizje portali typu Uber/Pyszne to średnio 30% od każdego zamówienia.
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-150'
                  }`}>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Prowizja portali (30%):</span>
                        <span className="text-red-500 font-bold">-{ (orderValue * 0.3 * 250).toFixed(0) } PLN / mc</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Prowizja ASM Solutions (0%):</span>
                        <span className="text-emerald-500 font-extrabold">0.0 PLN (0%)</span>
                      </div>
                      
                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-200">Zatrzymany zysk (Miesięcznie):</span>
                        <span className="text-base font-black text-emerald-500">
                          +{ (orderValue * 0.3 * 250).toFixed(0) } PLN / mc
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                        <span>Oszczędność w skali roku:</span>
                        <span className="text-amber-500 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded">
                          { (orderValue * 0.3 * 250 * 12).toFixed(0) } PLN / ROK
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenContact('deliveryhub')}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Uruchom Własną Dostawę Bez Opłat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            3. RESTAURANT DIGITAL DINING & QR POS INDEX
            ==================================================== */}
        {solutionId === 'restaurant' && (
          <div className="space-y-6">
            {/* Gastronomy Suite Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-150 dark:border-slate-850 pb-3">
              <button
                onClick={() => setRestaurantTab('qr_menu')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  restaurantTab === 'qr_menu'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{local.qrMenuTab}</span>
              </button>
              <button
                onClick={() => setRestaurantTab('kds')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  restaurantTab === 'kds'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>{local.kdsTab}</span>
              </button>
              <button
                onClick={() => setRestaurantTab('retention')}
                className={`pb-1 px-1.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  restaurantTab === 'retention'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{local.retentionTab}</span>
              </button>
            </div>

            {/* QR MENU VIEW */}
            {restaurantTab === 'qr_menu' && (
              <div className="max-w-md mx-auto space-y-4">
                {/* Step Sub-stages */}
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-850 pb-2">
                  <span className={restaurantStep === 'menu' ? 'text-blue-500' : ''}>1. Zamówienie ze stolika</span>
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span className={restaurantStep === 'checkout' ? 'text-blue-500' : ''}>2. Podział Rachunku</span>
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span className={restaurantStep === 'kitchen_success' ? 'text-blue-500' : ''}>3. Realizacja</span>
                </div>

                {restaurantStep === 'menu' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">Wybrany stolik: <span className="text-blue-500 font-extrabold">Mesa {selectedTable}</span></span>
                      <select 
                        value={selectedTable}
                        onChange={e => setSelectedTable(e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded border outline-none ${
                          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-3xs'
                        }`}
                      >
                        <option value="04">Mesa 04 (Sala Główna)</option>
                        <option value="08">Mesa 08 (Taras)</option>
                        <option value="12">Mesa 12 (VIP)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'item1', title: 'Rzemieślniczy Burger Premium', price: 45, desc: 'Premium wołowina Black Angus, ser gruyère, rukola, pikantny majonez', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop' },
                        { id: 'item2', title: 'Pieczone Ziemniaczki z Truflą', price: 18, desc: 'Frytki z batatów z parmezanem, oliwą truflową i świeżym rozmarynem', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=200&auto=format&fit=crop' },
                        { id: 'item3', title: 'Orzeźwiająca Lemoniada Cytrynowa', price: 15, desc: 'Świeżo wyciskany sok cytrynowy, mięta rzemieślnicza, lód', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop' }
                      ].map(food => {
                        const count = restaurantCart[food.id] || 0;
                        return (
                          <div key={food.id} className={`p-3 rounded-xl border flex gap-3 items-center ${
                            isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
                          }`}>
                            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                              <img 
                                src={food.imageUrl} 
                                alt={food.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 pr-1 min-w-0">
                              <h5 className="text-xs font-bold text-slate-200 truncate">{food.title}</h5>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{food.desc}</p>
                              <span className="text-[11px] font-extrabold text-blue-500 mt-1 block">{food.price} PLN</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {count > 0 ? (
                                <>
                                  <button
                                    onClick={() => setRestaurantCart(prev => ({ ...prev, [food.id]: Math.max(0, count - 1) }))}
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                                      isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300'
                                    }`}
                                  >
                                    <Minus className="w-3 h-3 text-slate-400" />
                                  </button>
                                  <span className="text-xs font-bold w-4 text-center">{count}</span>
                                  <button
                                    onClick={() => setRestaurantCart(prev => ({ ...prev, [food.id]: count + 1 }))}
                                    className="w-6 h-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setRestaurantCart(prev => ({ ...prev, [food.id]: 1 }))}
                                  className={`px-3 py-1 text-[10px] font-bold rounded-lg border hover:border-blue-500 transition-colors ${
                                    isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                                  }`}
                                >
                                  Dodaj
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      disabled={Object.keys(restaurantCart).reduce((acc, key) => acc + (restaurantCart[key] || 0), 0) === 0}
                      onClick={() => setRestaurantStep('checkout')}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Podsumowanie zamówienia</span>
                    </button>
                  </div>
                )}

                {restaurantStep === 'checkout' && (
                  <div className="space-y-4">
                    {/* Items */}
                    <div className={`p-4 rounded-xl border space-y-2.5 ${isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'}`}>
                      {[
                        { id: 'item1', title: 'Rzemieślniczy Burger Premium', price: 45 },
                        { id: 'item2', title: 'Ziemniaczki z Truflą', price: 18 },
                        { id: 'item3', title: 'Lemoniada Cytrynowa', price: 15 }
                      ].filter(f => restaurantCart[f.id] > 0).map(f => (
                        <div key={f.id} className="flex justify-between text-xs text-slate-300">
                          <span>{restaurantCart[f.id]}x {f.title}</span>
                          <span className="font-bold text-slate-100">{f.price * restaurantCart[f.id]} PLN</span>
                        </div>
                      ))}
                    </div>

                    {/* Split control */}
                    <div className="space-y-3 py-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Podziel rachunek na:</span>
                        <span className="text-blue-500 font-extrabold">{splitCount} osoby</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={splitCount}
                        onChange={e => setSplitCount(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Tip Selector */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dodaj napiwek dla obsługi:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[0, 10, 15].map(p => (
                          <button
                            key={p}
                            onClick={() => setTipPercent(p)}
                            className={`py-1.5 rounded-lg text-xs font-bold text-center border transition-all ${
                              tipPercent === p
                                ? 'border-blue-500 bg-blue-500/10 text-blue-500 font-bold'
                                : isDark 
                                  ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700' 
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 shadow-3xs'
                            }`}
                          >
                            {p}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const subtotal = [
                        { id: 'item1', price: 45 },
                        { id: 'item2', price: 18 },
                        { id: 'item3', price: 15 }
                      ].reduce((acc, curr) => acc + (curr.price * (restaurantCart[curr.id] || 0)), 0);

                      const tipVal = subtotal * (tipPercent / 100);
                      const grandTotal = subtotal + tipVal;
                      const perPerson = grandTotal / splitCount;

                      return (
                        <div className={`p-4 rounded-xl border space-y-3 ${
                          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100/50 border-slate-200'
                        }`}>
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Razem kwota z stolika:</span>
                            <span className="font-bold text-slate-200">{grandTotal.toFixed(1)} PLN</span>
                          </div>
                          <div className="pt-2 border-t border-dashed border-slate-800 flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-300">Koszt na 1 osobę:</span>
                            <span className="text-sm font-black text-blue-500">{perPerson.toFixed(1)} PLN</span>
                          </div>

                          <button
                            onClick={() => {
                              setIsPayingRestaurant(true);
                              setTimeout(() => {
                                setIsPayingRestaurant(false);
                                setRestaurantStep('kitchen_success');
                                // Dispatch to KDS dynamically
                                setKdsTickets(prev => [
                                  {
                                    id: `T-${selectedTable}`,
                                    table: `Mesa ${selectedTable}`,
                                    items: Object.keys(restaurantCart)
                                      .filter(id => restaurantCart[id] > 0)
                                      .map(id => `${restaurantCart[id]}x ${id === 'item1' ? 'Burger' : id === 'item2' ? 'Bataty' : 'Lemoniada'}`)
                                      .join(', '),
                                    status: 'Preparing',
                                    elapsed: '1 min'
                                  },
                                  ...prev
                                ]);
                              }, 1200);
                            }}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all"
                          >
                            {isPayingRestaurant ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                                <span>Przetwarzanie płatności Stripe...</span>
                              </>
                            ) : (
                              <>
                                <CreditCard className="w-4 h-4" />
                                <span>Zapłać teraz (Bez Prowizji)</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {restaurantStep === 'kitchen_success' && (
                  <div className={`border rounded-2xl p-5 text-center space-y-4 ${
                    isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-blue-50/30 border-blue-100 shadow-3xs'
                  }`}>
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-200">Zamówienie w realizacji!</h4>
                      <p className="text-xs text-slate-400 mt-1">Kuchnia właśnie przygotowuje Twoje dania. Sprawdź monitor KDS.</p>
                    </div>

                    <div className={`p-4 rounded-xl border text-left text-xs space-y-1.5 max-w-xs mx-auto ${
                      isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'
                    }`}>
                      <div className="font-extrabold text-[10px] uppercase text-blue-500">Mesa {selectedTable} • Stripe Paid</div>
                      <div className="text-slate-400">Rachunek rozdzielony pomyślnie. Status zamówienia przesłany do panelu KDS.</div>
                    </div>

                    <button
                      onClick={() => {
                        setRestaurantStep('menu');
                        setRestaurantCart({});
                      }}
                      className="text-xs font-bold text-blue-500 hover:text-blue-400 block mx-auto pt-1"
                    >
                      Zamów coś jeszcze
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* KITCHEN DISPLAY SYSTEM PANEL */}
            {restaurantTab === 'kds' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ChefHat className="w-4 h-4 text-amber-500" />
                    Kitchen Production Monitor (KDS)
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {kdsTickets.map(tkt => (
                    <div 
                      key={tkt.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between h-40 ${
                        isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-3xs'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-extrabold text-slate-200">{tkt.table}</span>
                          <span className="text-[10px] font-mono text-slate-400">Timer: {tkt.elapsed}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-bold leading-relaxed">{tkt.items}</p>
                      </div>

                      <div className="flex justify-between items-center pt-2.5 border-t border-slate-850/50 mt-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          tkt.status === 'Preparing' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {tkt.status}
                        </span>
                        
                        <div className="flex gap-1.5">
                          {tkt.status === 'Preparing' ? (
                            <button
                              onClick={() => {
                                setKdsTickets(prev => prev.map(t => t.id === tkt.id ? { ...t, status: 'Plating' } : t));
                              }}
                              className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[9px] font-bold rounded"
                            >
                              Wykończenie
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setKdsTickets(prev => prev.filter(t => t.id !== tkt.id));
                              }}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-bold rounded"
                            >
                              Wydaj Stolik
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {kdsTickets.length === 0 && (
                    <div className="sm:col-span-2 text-center py-10 text-xs text-slate-500 font-medium">
                      Brak aktywnych zamówień na ekranie KDS. Złóż zamówienie w widoku QR menu!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* RETENTION CRM & FEEDBACK */}
            {restaurantTab === 'retention' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">CRM Lojalność & Opinie</h5>
                  
                  <div className="space-y-3">
                    {satisfactionFeedbacks.map(f => (
                      <div key={f.id} className={`p-3.5 rounded-xl border space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
                      }`}>
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-200">{f.table}</span>
                          <span className="text-[10px] text-slate-400">{f.date}</span>
                        </div>
                        <div className="flex gap-0.5 text-amber-500">
                          {[...Array(f.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-slate-300 leading-relaxed italic">"{f.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Automatyczny Rabatomierz</h5>
                  
                  <div className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-slate-900/20 border-slate-850' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Wbudowana kampania marketingowa automatycznie generuje i wysyła unikalne kody rabatowe na WhatsApp klientów, którzy zostawią opinię 5 gwiazdek.
                    </p>
                    
                    <button
                      onClick={() => {
                        setPromoCodeGenerated(`ASM-VIP-${Math.floor(1000 + Math.random() * 9000)}`);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Zap className="w-4 h-4 text-amber-400 fill-amber-400/25" />
                      <span>Wygeneruj Kod Kampanii</span>
                    </button>

                    {promoCodeGenerated && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-center rounded-lg">
                        <span className="text-[10px] text-emerald-400 font-mono block">TWÓJ KOD RABATOWY (-15%):</span>
                        <span className="text-sm font-black text-white font-mono tracking-wider">{promoCodeGenerated}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            4. BUSINESS WEBSITE CORED WEB VITALS AUDIT INDEX
            ==================================================== */}
        {solutionId === 'website' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Controls and SERP input */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Layout Szablonu:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'minimalist', name: 'Minimalistyczny' },
                      { id: 'corporate', name: 'Korporacyjny' },
                      { id: 'portfolio', name: 'Portfolio / Galeria' }
                    ].map(lay => (
                      <button
                        key={lay.id}
                        onClick={() => {
                          setActiveLayout(lay.id as any);
                          setSpeedScore(0);
                        }}
                        className={`py-2 rounded-lg text-[11px] font-bold text-center border transition-all ${
                          activeLayout === lay.id
                            ? 'border-blue-500 bg-blue-500/10 text-blue-500 font-bold'
                            : isDark 
                              ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700' 
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {lay.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dopasuj meta tagi (SEO):</span>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Tytuł strony (max 60 znaków)"
                    className={`w-full px-3 py-2 rounded-lg text-xs outline-none ${
                      isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-950 shadow-3xs'
                    }`}
                  />
                  <textarea
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    placeholder="Opis strony (max 160 znaków)"
                    rows={2}
                    className={`w-full px-3 py-2 rounded-lg text-xs outline-none ${
                      isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-950 shadow-3xs'
                    }`}
                  />
                </div>
              </div>

              {/* Lighthouse Auditor / SERP Simulator */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Miernik Wydajności & SEO</span>
                
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-900/20 border-slate-850' : 'bg-slate-50 border-slate-200'
                }`}>
                  {speedScore === 0 && !isAnalyzing ? (
                    <div className="text-center py-6">
                      <button
                        onClick={runPageSpeedAudit}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-lg flex items-center gap-1.5 mx-auto transition-all"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Przeprowadź Test Lighthouse</span>
                      </button>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400 font-bold">
                        <span>Generowanie audytu mobilnego...</span>
                        <span>{analysisProgress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${analysisProgress}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { name: 'Performance', val: 99, color: 'text-emerald-500' },
                        { name: 'Accessibility', val: 98, color: 'text-emerald-500' },
                        { name: 'Best Practice', val: 100, color: 'text-emerald-500' },
                        { name: 'SEO Google', val: 100, color: 'text-emerald-500' }
                      ].map(metric => (
                        <div key={metric.name} className="p-2 bg-slate-950 rounded-lg border border-slate-850">
                          <span className={`text-base font-black font-mono block ${metric.color}`}>{metric.val}</span>
                          <span className="text-[8px] text-slate-400 uppercase tracking-tight block mt-0.5">{metric.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* GOOGLE SERP SIMULATOR */}
                  <div className={`p-3.5 rounded-lg border text-left font-sans ${
                    isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-150 shadow-3xs'
                  }`}>
                    <div className="text-[11px] text-[#202124] dark:text-[#dadce0] flex items-center gap-1">
                      <span>https://alansmsolutions.com</span>
                      <ChevronRight className="w-2.5 h-2.5 text-slate-500" />
                    </div>
                    <h4 className="text-[14px] text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer leading-tight mt-0.5">
                      {seoTitle}
                    </h4>
                    <p className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6] leading-snug mt-1">
                      {seoDesc}
                    </p>
                    <div className="flex gap-2.5 pt-2 mt-2 border-t border-slate-850/50 text-[9px] font-bold text-slate-400 font-mono">
                      <span>JSON-LD Schema: LocalBusiness</span>
                      <span className="text-emerald-500">INDEXED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            5. SERVICE STATUS REPAIR TRACKER INDEX
            ==================================================== */}
        {solutionId === 'tracking' && (
          <div className="max-w-md mx-auto space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Wyszukiwarka statusu napraw</span>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingSearchQuery}
                onChange={e => setTrackingSearchQuery(e.target.value)}
                placeholder="Wpisz numer zlecenia (np. ASM-9482)"
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 outline-none ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950 shadow-3xs'
                }`}
              />
              <button
                onClick={() => setTrackingOrderFound(true)}
                className="px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Szukaj</span>
              </button>
            </div>

            {trackingOrderFound && (
              <div className="space-y-4">
                {/* Steps milestones */}
                <div className="grid grid-cols-4 gap-1 text-center">
                  {[
                    { step: 1, label: 'Diagnoza' },
                    { step: 2, label: 'Części' },
                    { step: 3, label: 'W naprawie' },
                    { step: 4, label: 'Do odbioru' }
                  ].map(s => (
                    <div key={s.step} className="space-y-1">
                      <div className={`h-1.5 rounded-full ${s.step <= trackingOrderStep ? 'bg-blue-500' : 'bg-slate-800'}`} />
                      <span className={`text-[9px] font-bold block ${s.step <= trackingOrderStep ? 'text-blue-400' : 'text-slate-500'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Status card */}
                <div className={`p-4 rounded-xl border space-y-2.5 ${
                  isDark ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
                }`}>
                  <div className="flex justify-between text-xs font-bold">
                    <span>Zlecenie: <span className="text-blue-500">{trackingSearchQuery}</span></span>
                    <span className="text-amber-500">W trakcie naprawy</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ostatnia aktualizacja: <span className="font-semibold text-slate-300">Dzisiaj, 10:45</span>. Technik: <span className="font-semibold text-slate-300">Alan da Silva</span>.
                  </p>
                  
                  {/* Interactive checklist for engineers */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Kroki wykonane przez technika:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: 'diagnose', label: '1. Diagnostyka płyty' },
                        { key: 'parts', label: '2. Sprowadzenie podzespołów' },
                        { key: 'solder', label: '3. Lutowanie BGA' },
                        { key: 'test', label: '4. Testy obciążeniowe' }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => {
                            setTrackingChecklist(prev => {
                              const updated = { ...prev, [item.key]: !prev[item.key] };
                              // Update step dynamically
                              const trueCount = Object.values(updated).filter(Boolean).length;
                              setTrackingOrderStep(Math.max(1, trueCount));
                              return updated;
                            });
                          }}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                            trackingChecklist[item.key]
                              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-semibold'
                              : 'border-slate-800 bg-slate-950 text-slate-400'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            trackingChecklist[item.key] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700'
                          }`}>
                            {trackingChecklist[item.key] && <Check className="w-2.5 h-2.5" />}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================
            6. CRM AUTOMATION PIPELINE KANBAN INDEX
            ==================================================== */}
        {solutionId === 'crm' && (
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-amber-500 font-black block uppercase tracking-widest">
              SOUBLOX INTEGRATION PIPELINE
            </span>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { stage: 'incoming', label: 'Nowy Lead' },
                { stage: 'discovered', label: 'Po audycie' },
                { stage: 'proposal', label: 'Ofertowanie' },
                { stage: 'won', label: 'Kontrakt Wygrany' }
              ].map(st => (
                <div key={st.stage} className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'}`}>
                  <span className="font-extrabold text-[10px] uppercase tracking-wider block text-slate-400">{st.label}</span>
                  
                  <div className="mt-2.5 space-y-2">
                    {crmLeads.filter(l => l.stage === st.stage).map(lead => (
                      <div 
                        key={lead.id}
                        onClick={() => {
                          if (lead.stage !== 'won') {
                            setIsCrmProcessing(true);
                            setCrmLogs(prev => [...prev, `[CRM] Moving ${lead.name} to next stage...`]);
                            
                            setTimeout(() => {
                              setCrmLeads(prev => prev.map(l => {
                                if (l.id === lead.id) {
                                  const stages: Array<'incoming' | 'discovered' | 'proposal' | 'won'> = ['incoming', 'discovered', 'proposal', 'won'];
                                  const currIdx = stages.indexOf(l.stage);
                                  const nextStage = stages[Math.min(3, currIdx + 1)];
                                  
                                  if (nextStage === 'won') {
                                    setCrmLogs(p => [
                                      ...p,
                                      `[CRM] deal won: generating invoice`,
                                      `[Stripe API] Creating secure customer profile for ${l.name}`,
                                      `[SMTP] Dispatching welcome assets and contracts`,
                                      `[Slack API] Notification sent to #soublox-alerts`,
                                      `[WhatsApp API] Direct WhatsApp onboarding dispatched to client`
                                    ]);
                                  }
                                  return { ...l, stage: nextStage };
                                }
                                return l;
                              }));
                              setIsCrmProcessing(false);
                            }, 1000);
                          }
                        }}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all hover:-translate-y-0.5 ${
                          lead.stage === 'won'
                            ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400'
                            : isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-900 shadow-3xs'
                        }`}
                      >
                        <span className="font-bold block text-[11px]">{lead.name}</span>
                        <span className="text-[9px] text-slate-400 block">{lead.company}</span>
                        <span className="text-[10px] font-extrabold text-blue-500 block mt-1">{lead.val}</span>
                        {lead.stage !== 'won' && (
                          <span className="text-[8px] text-slate-400 block text-right hover:underline mt-1">Przesuń →</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SOUBLOX INTEGRATION CONSOLE LOGS */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">Logi Integracji SOUBLOX w Tle:</span>
              <div className="p-4 rounded-xl font-mono text-[10px] bg-slate-950 border border-slate-900 space-y-1 text-slate-300 max-h-40 overflow-y-auto">
                <div className="flex justify-between text-slate-500">
                  <span>[Gateway Initialized] SOUBLOX Webhooks</span>
                  <span>ONLINE</span>
                </div>
                {crmLogs.map((log, i) => (
                  <div key={i} className="flex justify-between">
                    <span className={log.includes('won') || log.includes('dispatched') ? 'text-emerald-500 font-bold' : 'text-slate-300'}>
                      {log}
                    </span>
                    <span className="text-slate-500">SUCCESS</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
};
