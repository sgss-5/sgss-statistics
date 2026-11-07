import React from 'react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight, 
  Flame, 
  Zap, 
  Cpu, 
  Globe, 
  Gamepad2, 
  Radio, 
  Activity,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ServiceStats, TimeRange } from '../types/stats';

interface ServiceCardProps {
  service: ServiceStats;
  timeRange: TimeRange;
  onSelect: (service: ServiceStats) => void;
  onFilterChart: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  timeRange,
  onSelect,
  onFilterChart,
}) => {
  const getRequestsForRange = () => {
    switch (timeRange) {
      case '24h': return service.requests24h;
      case '7d': return service.requests7d;
      case '30d': return service.requests30d;
      case 'all': return service.requestsAllTime;
    }
  };

  const requests = getRequestsForRange();

  const getCategoryIcon = () => {
    switch (service.category) {
      case 'discord-game': return <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />;
      case 'website': return <Globe className="w-3.5 h-3.5 text-sky-400" />;
      case 'media': return <Radio className="w-3.5 h-3.5 text-pink-400" />;
      case 'infrastructure': return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getTrendBadge = () => {
    if (service.trendStatus === 'surging') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
          <Flame className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
          Surging +{service.growth7d}%
        </span>
      );
    }
    if (service.trendStatus === 'growing') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ArrowUpRight className="w-3 h-3 mr-0.5" />
          +{service.growth7d}% 7d
        </span>
      );
    }
    if (service.trendStatus === 'steady') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
          Steady
        </span>
      );
    }
    if (service.trendStatus === 'cooling') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ArrowDownRight className="w-3 h-3 mr-0.5" />
          {service.growth7d}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/80 text-slate-500 border border-slate-800">
        Low Traffic
      </span>
    );
  };

  // SVG Sparkline generator
  const renderSparkline = () => {
    const data = service.sparkline || [];
    if (data.length < 2) return null;
    const max = Math.max(...data, 1);
    const height = 34;
    const width = 120;
    const step = width / (data.length - 1);

    const points = data.map((val, i) => {
      const x = i * step;
      const y = height - (val / max) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const strokeColor = service.trendStatus === 'surging' 
      ? '#f59e0b' 
      : service.trendStatus === 'growing' 
        ? '#10b981' 
        : '#818cf8';

    return (
      <svg className="w-28 h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="flex flex-col justify-between bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/5 transition-all group">
      
      {/* Top Meta: Category, Type, Trend */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-1.5">
            <span className="p-1 rounded-md bg-slate-800 border border-slate-700/80">
              {getCategoryIcon()}
            </span>
            <span className="text-[11px] font-medium text-slate-400 capitalize">
              {service.type === 'pages' ? 'Cloudflare Pages' : 'Worker'}
            </span>
          </div>
          {getTrendBadge()}
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h3 
            onClick={() => onSelect(service)}
            className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer truncate"
            title={service.title}
          >
            {service.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Metrics Row */}
        <div className="flex items-end justify-between py-2 border-y border-slate-800/80 my-3">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Invocations ({timeRange})
            </span>
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
              {requests.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              14-Day Trajectory
            </span>
            {renderSparkline()}
          </div>
        </div>

        {/* Efficiency Specs */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4">
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3 h-3 text-indigo-400" />
            <span>Subreqs: <strong className="text-slate-300 font-mono">{service.subrequests.toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Reliability: <strong className="text-emerald-400 font-mono">100%</strong></span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(service)}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center py-1"
        >
          <Activity className="w-3.5 h-3.5 mr-1" />
          Analytics Deep Dive
        </button>

        <div className="flex items-center space-x-2">
          {service.url && (
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Live Deployment"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
};
