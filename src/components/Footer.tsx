import React from 'react';
import { Heart, ExternalLink, ShieldCheck, Github, Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Support Banner Card */}
        <div className="bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-indigo-950/40 border border-rose-500/20 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Help Keep SGSS Services Online & Free</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Your support covers Cloudflare edge infrastructure, Discord bot hosting, and 24/7 radio streaming.
              </p>
            </div>
          </div>

          <a
            href="https://donate-to-sgss.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/20 transition-all shrink-0"
          >
            <Heart className="w-3.5 h-3.5 mr-1.5 fill-white/80" />
            <span>Support Developer</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
          </a>
        </div>

        {/* Bottom Credits & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">SGSS Telemetry Platform</span>
            <span>•</span>
            <span>Powered by Cloudflare Workers & Pages</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/Walusimbi-Leon/sgss-statistics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Codebase</span>
            </a>
            <a
              href="https://donate-to-sgss.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Donate Portal</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
