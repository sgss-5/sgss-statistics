export type ServiceCategory = 'all' | 'discord-game' | 'website' | 'infrastructure' | 'media';
export type ServiceType = 'worker' | 'pages';
export type TimeRange = '24h' | '7d' | '30d' | 'all';
export type SortOption = 'requests-desc' | 'growth-desc' | 'requests-asc' | 'name-asc';

export interface ServiceStats {
  id: string;
  name: string;
  title: string;
  category: 'discord-game' | 'website' | 'infrastructure' | 'media';
  type: ServiceType;
  description: string;
  url: string;
  createdOn: string;
  modifiedOn: string;
  requests24h: number;
  requests7d: number;
  requests30d: number;
  requestsAllTime: number;
  growth7d: number; // percentage change vs previous 7d
  growth30d: number; // percentage change vs previous 30d
  trendStatus: 'surging' | 'growing' | 'steady' | 'cooling' | 'idle';
  subrequests: number;
  errors: number;
  errorRate: number; // percentage
  daily: Record<string, number>;
  sparkline: number[];
}

export interface CloudflareAccountInfo {
  id: string;
  name: string;
  email: string;
  accountId: string;
  apiToken: string;
  servicesCount: number;
  isActive: boolean;
  notes?: string;
}

export interface GlobalMetrics {
  totalRequests30d: number;
  totalRequests7d: number;
  totalRequests24h: number;
  totalRequestsAllTime: number;
  growthRate: number;
  totalSubrequests: number;
  totalErrors: number;
  uptimePercent: number;
  activeServicesCount: number;
  topService: string;
  fastestGrowing: string;
  peakDay: { date: string; requests: number };
}
