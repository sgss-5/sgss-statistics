import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { KpiHero } from './components/KpiHero';
import { TrafficChart } from './components/TrafficChart';
import { ServiceFilterBar } from './components/ServiceFilterBar';
import { ServiceCard } from './components/ServiceCard';
import { ServiceTableView } from './components/ServiceTableView';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { InvestorModal } from './components/InvestorModal';
import { AccountsDrawer } from './components/AccountsDrawer';
import { Footer } from './components/Footer';

import { CF_SERVICES, DEFAULT_ACCOUNTS, computeGlobalMetrics } from './data/cfData';
import { 
  ServiceStats, 
  ServiceCategory, 
  TimeRange, 
  SortOption, 
  CloudflareAccountInfo 
} from './types/stats';

export function App() {
  const [services] = useState<ServiceStats[]>(CF_SERVICES);
  const [accounts] = useState<CloudflareAccountInfo[]>(DEFAULT_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState<CloudflareAccountInfo>(DEFAULT_ACCOUNTS[0]);
  
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [category, setCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('requests-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [selectedServiceIdForChart, setSelectedServiceIdForChart] = useState<string>('');
  const [activeDetailService, setActiveDetailService] = useState<ServiceStats | null>(null);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Nov 7, 2026, 13:00 UTC');

  // Compute category counts
  const countsByCategory = useMemo(() => {
    const counts: Record<ServiceCategory, number> = {
      all: services.length,
      'discord-game': 0,
      website: 0,
      media: 0,
      infrastructure: 0,
    };
    for (const s of services) {
      if (counts[s.category] !== undefined) {
        counts[s.category]++;
      }
    }
    return counts;
  }, [services]);

  // Compute dynamic global metrics
  const globalMetrics = useMemo(() => {
    return computeGlobalMetrics(services, timeRange);
  }, [services, timeRange]);

  // Filter & sort services
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Category filter
    if (category !== 'all') {
      result = result.filter(s => s.category === category);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.url.toLowerCase().includes(q)
      );
    }

    // Sort order
    result.sort((a, b) => {
      const getReq = (s: ServiceStats) => {
        if (timeRange === '24h') return s.requests24h;
        if (timeRange === '7d') return s.requests7d;
        if (timeRange === '30d') return s.requests30d;
        return s.requestsAllTime;
      };

      if (sortOption === 'requests-desc') {
        return getReq(b) - getReq(a);
      }
      if (sortOption === 'requests-asc') {
        return getReq(a) - getReq(b);
      }
      if (sortOption === 'growth-desc') {
        return b.growth7d - a.growth7d;
      }
      if (sortOption === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [services, category, searchQuery, sortOption, timeRange]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' UTC');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navigation */}
      <Navbar
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelectAccount={setSelectedAccount}
        onOpenAccountsModal={() => setIsAccountsModalOpen(true)}
        onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* KPI Metric Cards */}
        <KpiHero
          metrics={globalMetrics}
          timeRange={timeRange}
        />

        {/* 31-Day Traffic Trend SVG Chart */}
        <TrafficChart
          services={services}
          selectedServiceId={selectedServiceIdForChart}
          onSelectService={setSelectedServiceIdForChart}
        />

        {/* Filter & Controls Bar */}
        <ServiceFilterBar
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          category={category}
          onCategoryChange={setCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          countsByCategory={countsByCategory}
        />

        {/* Services Display: Cards or Table */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No services match your current search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setCategory('all'); }}
              className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                timeRange={timeRange}
                onSelect={(s) => setActiveDetailService(s)}
                onFilterChart={(id) => setSelectedServiceIdForChart(id)}
              />
            ))}
          </div>
        ) : (
          <ServiceTableView
            services={filteredServices}
            onSelect={(s) => setActiveDetailService(s)}
          />
        )}

      </main>

      {/* Footer with Donation Callout */}
      <Footer />

      {/* Modals & Drawers */}
      <ServiceDetailModal
        service={activeDetailService}
        onClose={() => setActiveDetailService(null)}
      />

      <InvestorModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        metrics={globalMetrics}
        services={services}
      />

      <AccountsDrawer
        isOpen={isAccountsModalOpen}
        onClose={() => setIsAccountsModalOpen(false)}
        accounts={accounts}
        selectedAccountId={selectedAccount.id}
        onSelectAccount={(acc) => {
          setSelectedAccount(acc);
          setIsAccountsModalOpen(false);
        }}
      />

    </div>
  );
}

export default App;
