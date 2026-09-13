import React, { useState, useEffect } from 'react';
import { X, Shield, Activity, Cpu, Database, Network, Lock, Check, Mail, Phone, Calendar, User, MessageSquare, ExternalLink, Key, LogIn, RefreshCcw, LayoutGrid } from 'lucide-react';
import { Language, Theme, Lead } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  currentLang: Language;
  zohoEnabled: boolean;
  onToggleZoho: (enabled: boolean) => void;
  discountEnabled: boolean;
  onToggleDiscount: (enabled: boolean) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  theme,
  currentLang,
  zohoEnabled,
  onToggleZoho,
  discountEnabled,
  onToggleDiscount
}) => {
  const isDark = theme === 'dark';
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pilotCount, setPilotCount] = useState<number>(14); 
  const [isInternalLoggedIn, setIsInternalLoggedIn] = useState(() => {
    return sessionStorage.getItem('asm_admin_session') === 'asm_backend_auth_token_2026';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [spreadsheetId, setSpreadsheetId] = useState(() => localStorage.getItem('asm_spreadsheet_id') || '');
  const [fetchingLeads, setFetchingLeads] = useState(false);

  // Sync spreadsheetId to storage
  useEffect(() => {
    localStorage.setItem('asm_spreadsheet_id', spreadsheetId);
  }, [spreadsheetId]);

  // Fetch leads from LocalStorage
  const fetchLeads = () => {
    const savedLeads = localStorage.getItem('website_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  };

  useEffect(() => {
    if (isInternalLoggedIn) {
      fetchLeads();
    }
  }, [isInternalLoggedIn]);

  if (!isOpen) return null;

  const handleInternalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPassword = password.trim();
    setIsLoggingIn(true);
    setLoginError(false);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: trimmedPassword }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsInternalLoggedIn(true);
          sessionStorage.setItem('asm_admin_session', data.token);
          return;
        } else {
          setLoginError(true);
          return;
        }
      }

      // If response status is 404 (static hosting where API is not available)
      if (response.status === 404) {
        if (trimmedPassword === 'alan_admin_2026') {
          setIsInternalLoggedIn(true);
          sessionStorage.setItem('asm_admin_session', 'asm_backend_auth_token_2026');
        } else {
          setLoginError(true);
        }
        return;
      }
      
      setLoginError(true);
    } catch (error) {
      console.warn('API authentication unavailable, using static fallback:', error);
      // Fallback for purely static hosting (e.g. GitHub Pages) where POST /api/admin/login throws/fails
      if (trimmedPassword === 'alan_admin_2026') {
        setIsInternalLoggedIn(true);
        sessionStorage.setItem('asm_admin_session', 'asm_backend_auth_token_2026');
      } else {
        setLoginError(true);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('asm_admin_session');
    setIsInternalLoggedIn(false);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 1500);
  };

  if (!isInternalLoggedIn) {
    return (
      <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
        <div onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" />
        <div className={`relative w-full max-w-sm rounded-2xl border p-8 shadow-2xl transition-all duration-350 ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold">ASM Admin Console</h3>
              <p className="text-xs text-slate-400 mt-1">Unlock with secure key or Google Cloud account</p>
            </div>
            
            <form onSubmit={handleInternalLogin} className="w-full space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin Key"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>
              {loginError && <p className="text-[10px] text-red-500 font-bold uppercase">Invalid Access Key</p>}
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full bg-slate-900 dark:bg-white dark:text-slate-950 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-55"
              >
                {isLoggingIn ? 'Verifying Key...' : 'Unlock with Key'}
              </button>
            </form>

            <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-400">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-4xl rounded-2xl border text-left shadow-2xl overflow-hidden transition-all duration-350 ${
        isDark 
          ? 'bg-slate-950 border-slate-850 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Sleek Decorative Tech Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500" />

        {/* Header */}
        <div className={`p-5 flex justify-between items-center border-b ${
          isDark ? 'border-slate-850 bg-slate-950' : 'border-slate-150 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
              <Shield className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-blue-500 font-mono">
                AlanSM Engineering Console
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Logged in as: <span className="font-semibold text-slate-300">alanpkmorais@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchLeads}
              disabled={fetchingLeads}
              className={`p-1.5 rounded-lg transition-all ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
              } ${fetchingLeads ? 'animate-spin opacity-50' : ''}`}
              title="Sync leads"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content - Split Layout */}
        <div className="flex flex-col md:flex-row h-[70vh] overflow-hidden">
          
          {/* Left Sidebar - Controls */}
          <div className={`w-full md:w-72 border-r p-6 space-y-6 overflow-y-auto ${isDark ? 'border-slate-850' : 'border-slate-150'}`}>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Google Sheets Sync</h4>
              
              {/* Spreadsheet ID Input */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] font-bold">Spreadsheet ID</span>
                </div>
                <input 
                  type="text"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  placeholder="Paste ID here..."
                  className={`w-full px-2 py-1.5 text-[10px] rounded border focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
                <p className="text-[9px] text-slate-500 mt-1.5 leading-tight">
                  Connect your Google Sheet to pull leads in real-time.
                </p>
              </div>

              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Controls</h4>
              
              {/* Zoho Toggle */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-blue-500">Zoho Live Chat</span>
                  <button
                    onClick={() => {
                      onToggleZoho(!zohoEnabled);
                      handleSave();
                    }}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                      zohoEnabled ? 'bg-blue-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-250 ease-in-out ${zohoEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
                <span className={`text-[9px] font-mono ${zohoEnabled ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {zohoEnabled ? 'INJECTED' : 'DISABLED'}
                </span>
              </div>

              {/* Discount Toggle */}
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-emerald-500">Pilot Promo (-50%)</span>
                  <button
                    onClick={() => {
                      onToggleDiscount(!discountEnabled);
                      handleSave();
                    }}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                      discountEnabled ? 'bg-emerald-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-250 ease-in-out ${discountEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pilotCount}
                    onChange={(e) => setPilotCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className={`w-10 px-1 py-0.5 text-[10px] rounded border font-bold text-center ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950'}`}
                  />
                  <span className="text-[9px] text-slate-500 font-mono">SLOTS LEFT</span>
                </div>
              </div>
            </div>

            {/* System Telemetry */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Node Status</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-3xs'}`}>
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-mono text-slate-400">VM: <span className="text-emerald-500">LIVE</span></span>
                </div>
                <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-3xs'}`}>
                  <Database className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-mono text-slate-400">DB: <span className="text-emerald-500">SYNCED</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content - Message Dashboard */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className={`px-6 py-3 border-b flex justify-between items-center ${isDark ? 'border-slate-850 bg-slate-900/20' : 'border-slate-150 bg-slate-50/50'}`}>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Leads & Inquiries</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold font-mono">
                {leads.length} TOTAL
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {leads.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <Mail className="w-12 h-12 mb-4" />
                  <p className="text-sm font-medium">No messages in dashboard yet.</p>
                  <p className="text-[11px] mt-1">Inbound inquiries from the contact form will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className={`p-4 rounded-xl border transition-all ${
                      isDark ? 'bg-slate-900/40 border-slate-850 hover:bg-slate-900' : 'bg-white border-slate-150 hover:bg-slate-50 shadow-sm'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold">{lead.name}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                <Mail className="w-3 h-3" /> {lead.email}
                              </span>
                              {lead.phone && (
                                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                  <Phone className="w-3 h-3" /> {lead.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-500/5 px-2 py-1 rounded">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className={`p-3 rounded-lg text-xs leading-relaxed mb-3 ${
                        isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'
                      }`}>
                        <div className="font-bold text-blue-500 mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {lead.packageName}
                        </div>
                        {lead.message}
                      </div>

                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-500 transition-colors">
                          Archive
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className={`p-4 flex justify-between items-center border-t ${
          isDark ? 'border-slate-850 bg-slate-950' : 'border-slate-150 bg-slate-50'
        }`}>
          <div className="flex items-center gap-1.5">
            {saveSuccess && (
              <span className="text-[11px] text-emerald-500 font-bold inline-flex items-center gap-1 font-mono">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                CONFIG SYNCED
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20"
            >
              Log Out
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-850 text-slate-300' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-3xs'
              }`}
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
