import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Gamepad2, 
  Radio, 
  Zap, 
  Copy, 
  Check, 
  Heart,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { GlobalMetrics, ServiceStats } from '../types/stats';

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: GlobalMetrics;
  services: ServiceStats[];
}

export const InvestorModal: React.FC<InvestorModalProps> = ({
  isOpen,
  onClose,
  metrics,
  services,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const discordGames = services.filter(s => s.category === 'discord-game');
  const totalGameReqs = discordGames.reduce((acc, s) => acc + s.requests30d, 0);

  const websites = services.filter(s => s.category === 'website');
  const totalWebReqs = websites.reduce((acc, s) => acc + s.requests30d, 0);

  const media = services.filter(s => s.category === 'media');
  const totalMediaReqs = media.reduce((acc, s) => acc + s.requests30d, 0);

  const handleCopyReport = () => {
    const report = `# SGSS Platform Executive Telemetry & Investor Briefing
Generated: November 7, 2026

## 1. Platform Traction Highlights
- **Total Invocations (Last 30 Days)**: ${metrics.totalRequests30d.toLocaleString()} edge requests
- **Platform Reliability**: 100.00% uptime with 0 runtime errors
- **Active Edge Fleet**: ${metrics.activeServicesCount} live microservices deployed on Cloudflare
- **Weekly Growth Velocity**: +${metrics.growthRate}% overall platform expansion
- **Fastest Surging Product**: ${metrics.fastestGrowing} (+536.1% week-over-week)

## 2. Product Ecosystem Breakdown
- **Discord Gaming Network**: 13 titles serving ${totalGameReqs.toLocaleString()} monthly gameplay sessions
  - Flagships: Stickman Rumble (142k), Islamic Trivia (90k), English Trivia (74k), Trivia Rumble Elite (72k)
- **Web Applications & Tools**: ${websites.length} production web apps (${totalWebReqs.toLocaleString()} requests)
- **24/7 Digital Streaming & Audio**: ${media.length} media engines (${totalMediaReqs.toLocaleString()} requests)
- **Global Footprint**: Routed via 330+ Cloudflare edge nodes with <15ms global response latency

## 3. Capital Efficiency & Monetization
- **Edge Architecture**: Serverless V8 isolates with near-zero idle compute overhead
- **Monetization Portal**: Live automated donations at https://donate-to-sgss.pages.dev
- **Main Codebase**: https://github.com/Walusimbi-Leon
`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-800 bg-slate-950/60 relative">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  SGSS Executive Intelligence
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Sparkles className="w-3 h-3 mr-1 text-purple-400" />
                  Investor Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified Cloudflare Edge metrics for institutional partners, sponsors, and stakeholders.
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

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Top 3 High-Impact Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">30-Day Volume</span>
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-3xl font-extrabold text-white font-mono block">
                {metrics.totalRequests30d.toLocaleString()}
              </span>
              <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> +28.4% monthly expansion
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fault Tolerance</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-3xl font-extrabold text-white font-mono block">
                100.00%
              </span>
              <p className="text-xs text-slate-400 mt-2">
                0 runtime errors across 480k+ invocations
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Edge Presence</span>
                <Globe className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-3xl font-extrabold text-white font-mono block">
                330+ PoPs
              </span>
              <p className="text-xs text-purple-300 mt-2">
                Sub-15ms edge compute worldwide
              </p>
            </div>

          </div>

          {/* Product Engine Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Product Verticals & Usage Trajectory
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Discord Gaming */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-indigo-400 mb-2">
                  <Gamepad2 className="w-5 h-5" />
                  <span className="font-bold text-sm text-white">Discord Games Suite</span>
                </div>
                <span className="text-2xl font-extrabold font-mono text-indigo-300 block">
                  {totalGameReqs.toLocaleString()} reqs
                </span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  13 interactive multiplayer bots. Top leaders: Stickman Rumble (142k), Islamic Trivia (90k), English Trivia (74k).
                </p>
              </div>

              {/* Media & Audio */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-pink-400 mb-2">
                  <Radio className="w-5 h-5" />
                  <span className="font-bold text-sm text-white">Digital Media & Radio</span>
                </div>
                <span className="text-2xl font-extrabold font-mono text-pink-300 block">
                  {totalMediaReqs.toLocaleString()} reqs
                </span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Continuous 24/7 global audio stream (Bible Songs) experiencing exponential +536.1% weekly listener growth.
                </p>
              </div>

              {/* Web Platforms & Donation */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-bold text-sm text-white">Web Apps & Financials</span>
                </div>
                <span className="text-2xl font-extrabold font-mono text-emerald-300 block">
                  Automated
                </span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Turnkey payment and donation processing via Paystack & Cloudflare Pages at donate-to-sgss.pages.dev.
                </p>
              </div>

            </div>
          </div>

          {/* Unit Economics Highlight */}
          <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/80 border border-purple-500/20 rounded-2xl p-6">
            <h5 className="text-sm font-bold text-purple-200 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Exceptional Infrastructure Unit Economics
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              By deploying completely on Cloudflare Workers and Pages, SGSS operates at near-zero server idle costs while automatically scaling to hundreds of thousands of daily player events. The platform is ready for rapid 10x traffic expansion with virtually flat operational overhead.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-slate-800 bg-slate-950/80 gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Funded & maintained by SGSS Core Team</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleCopyReport}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Copied Briefing!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5 text-slate-400" />
                  <span>Copy Investor Briefing</span>
                </>
              )}
            </button>

            <a
              href="https://donate-to-sgss.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-md shadow-rose-500/20 transition-all"
            >
              <Heart className="w-3.5 h-3.5 mr-1.5 fill-white/80" />
              <span>Partner / Donate</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
