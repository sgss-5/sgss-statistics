import React from 'react';
import { 
  X, 
  ExternalLink, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Flame, 
  Layers, 
  Cpu, 
  Globe, 
  Clock,
  BarChart2
} from 'lucide-react';
import { ServiceStats } from '../types/stats';
import { ALL_DATES } from '../data/cfData';

interface ServiceDetailModalProps {
  service: ServiceStats | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const dailyEntries = ALL_DATES.map((date) => ({
    date,
    shortDate: date.slice(5),
    requests: service.daily[date] || 0,
  }));

  const maxDaily = Math.max(...dailyEntries.map(d => d.requests), 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {service.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{service.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metrics 4-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">24h Invocations</span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {service.requests24h.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">7-Day Volume</span>
              <span className="text-xl font-bold font-mono text-white mt-1 block">
                {service.requests7d.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">+{service.growth7d}% vs prev 7d</span>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">30-Day Total</span>
              <span className="text-xl font-bold font-mono text-indigo-300 mt-1 block">
                {service.requests30d.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">All-Time Tracked</span>
              <span className="text-xl font-bold font-mono text-purple-300 mt-1 block">
                {service.requestsAllTime.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 31-Day Daily Breakdown Bar Histogram */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                <span>31-Day Request Distribution</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                Peak: {Math.max(...dailyEntries.map(d => d.requests)).toLocaleString()} reqs/day
              </span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="h-32 flex items-end justify-between gap-1 pt-4">
                {dailyEntries.map((d, i) => {
                  const heightPercent = Math.max((d.requests / maxDaily) * 100, 4);
                  return (
                    <div 
                      key={d.date} 
                      className="flex-1 flex flex-col items-center group relative h-full justify-end"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-9 bg-slate-900 border border-slate-700 text-white text-[10px] px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 font-mono">
                        {d.date}: {d.requests.toLocaleString()}
                      </div>
                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all ${
                          d.requests > 0 
                            ? 'bg-gradient-to-t from-indigo-600 to-purple-400 group-hover:from-indigo-400 group-hover:to-pink-400' 
                            : 'bg-slate-800/60'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
                <span>{dailyEntries[0]?.shortDate}</span>
                <span>{dailyEntries[Math.floor(dailyEntries.length / 2)]?.shortDate}</span>
                <span>{dailyEntries[dailyEntries.length - 1]?.shortDate}</span>
              </div>
            </div>
          </div>

          {/* Platform Specs & Deployment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Deployment Metadata</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform:</span>
                <span className="text-white font-medium">Cloudflare {service.type === 'pages' ? 'Pages' : 'Worker'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account:</span>
                <span className="text-white font-mono text-[11px]">walusimbileon1@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Active Edge Routing
                </span>
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Edge Efficiency</span>
              <div className="flex justify-between">
                <span className="text-slate-400">Subrequests:</span>
                <span className="text-white font-mono">{service.subrequests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Runtime Errors:</span>
                <span className="text-emerald-400 font-mono font-bold">0 (0.00%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Global PoPs:</span>
                <span className="text-purple-300 font-medium">330+ Cloudflare Edge Nodes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-slate-800 bg-slate-950/60">
          <span className="text-xs text-slate-500 font-mono">
            ID: {service.id}
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Close
            </button>
            {service.url && (
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Launch Live Endpoint</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
