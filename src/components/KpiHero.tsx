import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Server, 
  Calendar, 
  Radio, 
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { GlobalMetrics, TimeRange } from '../types/stats';

interface KpiHeroProps {
  metrics: GlobalMetrics;
  timeRange: TimeRange;
}

export const KpiHero: React.FC<KpiHeroProps> = ({ metrics, timeRange }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPeriodLabel = () => {
    switch (timeRange) {
      case '24h': return 'Past 24 Hours';
      case '7d': return 'Past 7 Days';
      case '30d': return 'Past 30 Days';
      case 'all': return 'All-Time';
    }
  };

  const getRequestsForRange = () => {
    switch (timeRange) {
      case '24h': return metrics.totalRequests24h;
      case '7d': return metrics.totalRequests7d;
      case '30d': return metrics.totalRequests30d;
      case 'all': return metrics.totalRequestsAllTime;
    }
  };

  const currentRequests = getRequestsForRange();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* 1. Total Requests / Invocations */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-5 shadow-xl hover:border-indigo-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Total Requests</span>
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {formatNumber(currentRequests)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">{getPeriodLabel()}</span>
          <span className="inline-flex items-center text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            +{metrics.growthRate}%
          </span>
        </div>
      </div>

      {/* 2. Platform Reliability */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-5 shadow-xl hover:border-emerald-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Reliability & Uptime</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {metrics.uptimePercent.toFixed(2)}%
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">0 Runtime Errors</span>
          <span className="inline-flex items-center text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Enterprise Grade
          </span>
        </div>
      </div>

      {/* 3. Trending Product Surge */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-5 shadow-xl hover:border-amber-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Surging Velocity</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="truncate">
          <span className="text-xl font-bold tracking-tight text-white truncate block">
            {metrics.fastestGrowing}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Top Growth</span>
          <span className="inline-flex items-center text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            +536.1% weekly
          </span>
        </div>
      </div>

      {/* 4. Active Fleet & Peak Volume */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-5 shadow-xl hover:border-purple-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Active Deployments</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Server className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {metrics.activeServicesCount}
          </span>
          <span className="text-xs text-slate-400 font-normal">Edge Services</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Peak 24h: {formatNumber(metrics.peakDay.requests)}</span>
          <span className="inline-flex items-center text-purple-300 font-medium bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-mono">
            {metrics.peakDay.date.slice(5)}
          </span>
        </div>
      </div>

    </div>
  );
};
