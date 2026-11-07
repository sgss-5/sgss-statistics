import React from 'react';
import { ExternalLink, Flame, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { ServiceStats } from '../types/stats';

interface ServiceTableViewProps {
  services: ServiceStats[];
  onSelect: (service: ServiceStats) => void;
}

export const ServiceTableView: React.FC<ServiceTableViewProps> = ({ services, onSelect }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/60">
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3 text-right">24 Hours</th>
              <th className="py-3 px-3 text-right">7 Days</th>
              <th className="py-3 px-3 text-right">30 Days</th>
              <th className="py-3 px-3 text-right">All Time</th>
              <th className="py-3 px-3 text-center">Trend (7d)</th>
              <th className="py-3 px-3 text-center">Reliability</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {services.map((s) => (
              <tr 
                key={s.id} 
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelect(s)}
              >
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {s.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {s.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                    {s.type === 'pages' ? 'Pages' : 'Worker'}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-300">
                  {s.requests24h.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-300">
                  {s.requests7d.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                  {s.requests30d.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-slate-400">
                  {s.requestsAllTime.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-center">
                  {s.trendStatus === 'surging' ? (
                    <span className="inline-flex items-center text-amber-400 font-bold font-mono">
                      <Flame className="w-3 h-3 mr-0.5 fill-amber-400" />
                      +{s.growth7d}%
                    </span>
                  ) : s.trendStatus === 'growing' ? (
                    <span className="inline-flex items-center text-emerald-400 font-semibold font-mono">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      +{s.growth7d}%
                    </span>
                  ) : s.trendStatus === 'cooling' ? (
                    <span className="inline-flex items-center text-rose-400 font-mono">
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      {s.growth7d}%
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono">0.0%</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="text-emerald-400 font-mono font-semibold">100%</span>
                </td>
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onSelect(s)}
                      className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Inspect Details"
                    >
                      <Activity className="w-4 h-4" />
                    </button>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="Open Service"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
