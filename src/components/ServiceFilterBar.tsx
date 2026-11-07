import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Gamepad2, 
  Globe, 
  Radio, 
  Cpu, 
  Layers
} from 'lucide-react';
import { ServiceCategory, TimeRange, SortOption } from '../types/stats';

interface ServiceFilterBarProps {
  timeRange: TimeRange;
  onTimeRangeChange: (r: TimeRange) => void;
  category: ServiceCategory;
  onCategoryChange: (c: ServiceCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: SortOption;
  onSortChange: (s: SortOption) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (m: 'grid' | 'table') => void;
  countsByCategory: Record<ServiceCategory, number>;
}

export const ServiceFilterBar: React.FC<ServiceFilterBarProps> = ({
  timeRange,
  onTimeRangeChange,
  category,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  countsByCategory,
}) => {
  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'all', label: 'All Time' },
  ];

  const categories: { id: ServiceCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Services', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'discord-game', label: 'Discord Games', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'website', label: 'Websites & Portals', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'media', label: 'Media & Radio', icon: <Radio className="w-3.5 h-3.5" /> },
    { id: 'infrastructure', label: 'Infrastructure', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Controls Row: Time Range & View Mode & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Time Range Pills */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start">
          <span className="text-[11px] font-semibold text-slate-500 uppercase px-3 hidden sm:inline">Range</span>
          {timeRanges.map((r) => {
            const isActive = timeRange === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onTimeRangeChange(r.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products, endpoints..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              aria-label="Sort by"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer pr-1"
            >
              <option value="requests-desc" className="bg-slate-900">Highest Volume</option>
              <option value="growth-desc" className="bg-slate-900">Fastest Trending (Growth %)</option>
              <option value="requests-asc" className="bg-slate-900">Lowest Volume (Idle/Underused)</option>
              <option value="name-asc" className="bg-slate-900">Alphabetical (A - Z)</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid Cards"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              title="Dense Table"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => {
          const isActive = category === c.id;
          const count = countsByCategory[c.id] || 0;
          return (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-800 text-white border-indigo-500/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/40 hover:border-slate-700'
              }`}
            >
              <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>{c.icon}</span>
              <span>{c.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
