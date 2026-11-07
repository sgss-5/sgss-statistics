import React from 'react';
import { 
  Activity, 
  Heart, 
  ExternalLink, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { CloudflareAccountInfo } from '../types/stats';

interface NavbarProps {
  accounts: CloudflareAccountInfo[];
  selectedAccount: CloudflareAccountInfo;
  onSelectAccount: (acc: CloudflareAccountInfo) => void;
  onOpenAccountsModal: () => void;
  onOpenInvestorModal: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  lastUpdated: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  accounts,
  selectedAccount,
  onSelectAccount,
  onOpenAccountsModal,
  onOpenInvestorModal,
  isRefreshing,
  onRefresh,
  lastUpdated,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-[#090b10]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  SGSS <span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">Telemetry</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Cloudflare Live
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Multi-Product Analytics & Real-Time Usage Intelligence
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Account Switcher */}
            <div className="relative hidden md:flex items-center">
              <select
                aria-label="Cloudflare Account"
                value={selectedAccount.id}
                onChange={(e) => {
                  const found = accounts.find(a => a.id === e.target.value);
                  if (found) onSelectAccount(found);
                }}
                className="bg-slate-900/80 text-xs text-slate-300 font-medium py-1.5 pl-3 pr-8 rounded-lg border border-slate-700/80 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.email} ({acc.servicesCount} services)
                  </option>
                ))}
              </select>
              <button
                onClick={onOpenAccountsModal}
                title="Manage Cloudflare Accounts & Tokens"
                className="ml-1 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {/* Sync Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title={`Last updated: ${lastUpdated}`}
              className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-indigo-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">{isRefreshing ? 'Syncing...' : 'Sync'}</span>
            </button>

            {/* Investor Deck Button */}
            <button
              onClick={onOpenInvestorModal}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-200 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-sm shadow-purple-950/50"
            >
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              <span className="hidden sm:inline">Investor Mode</span>
              <span className="sm:hidden">Pitch</span>
              <Sparkles className="w-3 h-3 ml-1 text-purple-400 animate-pulse hidden sm:inline" />
            </button>

            {/* Support Developer Button -> leads to https://donate-to-sgss.pages.dev */}
            <a
              href="https://donate-to-sgss.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 transition-all group"
            >
              <Heart className="w-3.5 h-3.5 mr-1.5 text-white fill-white/80 group-hover:scale-110 transition-transform" />
              <span>Support Developer</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
            </a>

          </div>
        </div>
      </div>
    </header>
  );
};
