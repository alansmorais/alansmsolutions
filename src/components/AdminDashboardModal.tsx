import React, { useState } from 'react';
import { X, Shield, Activity, Cpu, Database, Network, ArrowUpRight, Lock, Check } from 'lucide-react';
import { Language, Theme } from '../types';

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
  const [pilotCount, setPilotCount] = useState<number>(14); // Next 14/20 clients left

  if (!isOpen) return null;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-xl rounded-2xl border text-left shadow-2xl overflow-hidden transition-all duration-350 ${
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
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          
          {/* 1. ZOHO SALESIQ CONTROL PANEL */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-500 font-extrabold block">
                  INTEGRATIONS MANAGER
                </span>
                <h4 className="text-xs font-bold text-blue-500">
                  Zoho Contact Dongle (SalesIQ Live Chat)
                </h4>
                <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
                  Toggle dynamic script loading across user-facing pages. Client users will not load nor see the widget unless explicitly enabled here.
                </p>
              </div>

              {/* Big Apple Style Toggle Switch */}
              <button
                onClick={() => {
                  onToggleZoho(!zohoEnabled);
                  handleSave();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                  zohoEnabled ? 'bg-blue-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-250 ease-in-out ${
                    zohoEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-850 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${zohoEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-[10px] font-mono text-slate-400">
                Status: <span className={zohoEnabled ? 'text-emerald-500 font-bold' : 'text-slate-400'}>
                  {zohoEnabled ? 'ACTIVE (Script injected)' : 'DISABLED (Hidden from clients)'}
                </span>
              </span>
            </div>
          </div>

          {/* 2. PILOT PROJECTS & SPECIAL OFFER MANAGER */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-500 font-extrabold block">
                  CAMPAIGN METRICS
                </span>
                <h4 className="text-xs font-bold text-blue-500">
                  Pilot Project Promo (Global -50% Discount)
                </h4>
                <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
                  When active, this reduces all public package prices by 50% and displays the Pilot Project card in the solutions detail pages.
                </p>
              </div>

              {/* Big Apple Style Toggle Switch */}
              <button
                onClick={() => {
                  onToggleDiscount(!discountEnabled);
                  handleSave();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                  discountEnabled ? 'bg-emerald-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-250 ease-in-out ${
                    discountEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 block font-medium">Slots Remaining:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pilotCount}
                    onChange={(e) => {
                      setPilotCount(Math.max(0, parseInt(e.target.value) || 0));
                      handleSave();
                    }}
                    className={`w-16 px-2.5 py-1 text-xs rounded-lg border font-bold text-center ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950'
                    }`}
                  />
                  <span className="text-[11px] text-slate-400">/ 20 slots</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 block font-medium">Campaign Status:</span>
                <span className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border ${
                  discountEnabled 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25' 
                    : 'bg-slate-500/10 text-slate-500 border-slate-500/25'
                }`}>
                  {discountEnabled ? 'GLOBAL 50% ACTIVE' : 'INACTIVE / REGULAR PRICING'}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">
              Updates all solutions' details page to dynamically display the discounted prices and "Next {pilotCount} clients" CTA blocks.
            </p>
          </div>

          {/* 3. ENGINEERING METRICS FOR OPERATIONAL CLARITY */}
          <div className={`p-4 rounded-xl border space-y-3.5 ${
            isDark ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <div className="flex items-center gap-1.5 border-b border-slate-850 pb-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                System Telemetry Nodes
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-3xs'}`}>
                <Cpu className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] text-slate-400 block">Core VM</span>
                <span className="text-xs font-extrabold text-emerald-500 font-mono">ONLINE</span>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-3xs'}`}>
                <Database className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] text-slate-400 block">DB Clusters</span>
                <span className="text-xs font-extrabold text-emerald-500 font-mono">ACTIVE (3)</span>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-3xs'}`}>
                <Network className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] text-slate-400 block">SOUBLOX Webhooks</span>
                <span className="text-xs font-extrabold text-emerald-500 font-mono">LISTENING</span>
              </div>
            </div>

            {/* Network Health Logs */}
            <div className={`p-3 rounded-lg font-mono text-[9px] space-y-1 ${
              isDark ? 'bg-slate-950 text-slate-400 border border-slate-850' : 'bg-slate-950 text-slate-300 border border-slate-900'
            }`}>
              <div className="flex justify-between">
                <span>[LOG] Salesforce sync channel</span>
                <span className="text-emerald-500">READY</span>
              </div>
              <div className="flex justify-between">
                <span>[LOG] Stripe webhook gateway</span>
                <span className="text-emerald-500">READY</span>
              </div>
              <div className="flex justify-between">
                <span>[LOG] SMTP Delivery mailer</span>
                <span className="text-emerald-500">READY</span>
              </div>
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
              onClick={onClose}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-850 text-slate-300' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-3xs'
              }`}
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
