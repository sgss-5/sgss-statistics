import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Check, 
  Key, 
  ShieldCheck, 
  Server, 
  ExternalLink,
  Plus,
  AlertCircle
} from 'lucide-react';
import { CloudflareAccountInfo } from '../types/stats';

interface AccountsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: CloudflareAccountInfo[];
  selectedAccountId: string;
  onSelectAccount: (acc: CloudflareAccountInfo) => void;
}

export const AccountsDrawer: React.FC<AccountsDrawerProps> = ({
  isOpen,
  onClose,
  accounts,
  selectedAccountId,
  onSelectAccount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cloudflare Multi-Account Fleet</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated token credentials and service distributions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Cards List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-400 bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              All 3 Cloudflare accounts are synced with the GitAlia Vault with read permissions for Cloudflare Workers Analytics & Pages Deployments.
            </span>
          </div>

          <div className="space-y-3">
            {accounts.map((acc) => {
              const isCurrent = acc.id === selectedAccountId;
              return (
                <div
                  key={acc.id}
                  onClick={() => onSelectAccount(acc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-950/20 border-indigo-500/60 shadow-lg shadow-indigo-500/5'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{acc.name}</span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Active Scope
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono mt-0.5 block">{acc.email}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">{acc.servicesCount} Services</span>
                        <span className="text-[10px] text-emerald-400 flex items-center justify-end">
                          <Check className="w-3 h-3 mr-0.5" /> Token Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {acc.notes && (
                    <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                      {acc.notes}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Account ID: {acc.accountId ? `${acc.accountId.slice(0, 10)}...` : 'Linked'}</span>
                    <span>Token: ••••••••••••</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Source: GitAlia Vault Secure Storage
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
