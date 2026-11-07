import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';
import { ALL_DATES } from '../data/cfData';
import { ServiceStats } from '../types/stats';

interface TrafficChartProps {
  services: ServiceStats[];
  selectedServiceId?: string;
  onSelectService?: (id: string) => void;
}

export const TrafficChart: React.FC<TrafficChartProps> = ({
  services,
  selectedServiceId,
  onSelectService,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Calculate daily aggregates
  const dailySeries = useMemo(() => {
    return ALL_DATES.map((date) => {
      let requests = 0;
      let topDailyService = '';
      let topDailyCount = 0;

      if (selectedServiceId) {
        const s = services.find((item) => item.id === selectedServiceId);
        requests = s ? s.daily[date] || 0 : 0;
        topDailyService = s ? s.title : '';
      } else {
        for (const s of services) {
          const count = s.daily[date] || 0;
          requests += count;
          if (count > topDailyCount) {
            topDailyCount = count;
            topDailyService = s.title;
          }
        }
      }

      return {
        date,
        formattedDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        requests,
        topService: topDailyService,
      };
    });
  }, [services, selectedServiceId]);

  const maxRequests = useMemo(() => {
    const max = Math.max(...dailySeries.map((d) => d.requests), 100);
    return Math.ceil(max * 1.15); // Add headroom
  }, [dailySeries]);

  const chartHeight = 220;
  const chartWidth = 960;
  const paddingX = 40;
  const paddingY = 30;

  // Build SVG points
  const points = useMemo(() => {
    const step = (chartWidth - paddingX * 2) / (dailySeries.length - 1);
    return dailySeries.map((d, i) => {
      const x = paddingX + i * step;
      const y = chartHeight - paddingY - (d.requests / maxRequests) * (chartHeight - paddingY * 2);
      return { x, y, ...d };
    });
  }, [dailySeries, maxRequests]);

  const svgPath = useMemo(() => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Smooth cubic bezier curves
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) / 2;
      const cp2y = curr.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return path;
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const last = points[points.length - 1];
    const first = points[0];
    const bottom = chartHeight - paddingY;
    return `${svgPath} L ${last.x} ${bottom} L ${first.x} ${bottom} Z`;
  }, [svgPath, points]);

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  const formatK = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <span>31-Day Invocations Trajectory</span>
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Live Edge Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {selectedServiceId 
              ? `Filtered view for: ${services.find(s => s.id === selectedServiceId)?.title || selectedServiceId}` 
              : 'Aggregated edge request volume across all 22 active Workers & Pages'}
          </p>
        </div>

        {/* Selected Service Quick Reset */}
        {selectedServiceId && onSelectService && (
          <button
            onClick={() => onSelectService('')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors self-start sm:self-auto"
          >
            ← View All Combined Services
          </button>
        )}
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-48 sm:h-64 overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
            const val = Math.round(ratio * maxRequests);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {formatK(val)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill="url(#trafficGradient)" />

          {/* Smooth line */}
          <path
            d={svgPath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interactive vertical hover line and dots */}
          {points.map((p, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            >
              {/* Invisible wide hit target */}
              <rect
                x={p.x - (chartWidth / points.length) / 2}
                y={0}
                width={chartWidth / points.length}
                height={chartHeight}
                fill="transparent"
              />
              {hoverIndex === idx && (
                <>
                  <line
                    x1={p.x}
                    y1={paddingY}
                    x2={p.x}
                    y2={chartHeight - paddingY}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5"
                    fill="#ec4899"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </>
              )}
            </g>
          ))}

          {/* X Axis Labels */}
          {points.filter((_, i) => i % 5 === 0 || i === points.length - 1).map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={chartHeight - 8}
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              {p.formattedDate}
            </text>
          ))}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {activePoint && (
          <div className="absolute top-2 right-4 bg-slate-950/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs shadow-xl backdrop-blur-md flex items-center space-x-3 pointer-events-none">
            <div>
              <span className="text-slate-400 block text-[10px] font-mono">{activePoint.date}</span>
              <span className="text-white font-mono font-bold text-sm">
                {activePoint.requests.toLocaleString()} reqs
              </span>
            </div>
            {!selectedServiceId && activePoint.topService && (
              <div className="border-l border-slate-800 pl-3">
                <span className="text-slate-500 block text-[10px]">Leader</span>
                <span className="text-purple-300 font-semibold truncate block max-w-[120px]">
                  {activePoint.topService}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
