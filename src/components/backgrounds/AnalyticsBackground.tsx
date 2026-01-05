import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Users, DollarSign, Eye, Target } from "lucide-react";

const AnalyticsBackground = () => {
  const [chartData, setChartData] = useState<number[]>([40, 65, 45, 80, 55, 90, 70, 85]);
  const [activeMetric, setActiveMetric] = useState(0);
  const [visitors, setVisitors] = useState(12453);
  const [conversionRate, setConversionRate] = useState(8.7);

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setChartData(prev => prev.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 20))));
    }, 2000);

    const metricInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % 4);
    }, 3000);

    const visitorInterval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 10) - 3);
    }, 1000);

    const conversionInterval = setInterval(() => {
      setConversionRate(prev => Math.max(5, Math.min(15, prev + (Math.random() - 0.5) * 0.5)));
    }, 2000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(metricInterval);
      clearInterval(visitorInterval);
      clearInterval(conversionInterval);
    };
  }, []);

  const metrics = [
    { label: "Visitors", value: visitors.toLocaleString(), change: "+24%", trend: "up", icon: Users },
    { label: "Revenue", value: "$84,231", change: "+18%", trend: "up", icon: DollarSign },
    { label: "Sessions", value: "45.2K", change: "+32%", trend: "up", icon: Eye },
    { label: "Conversion", value: `${conversionRate.toFixed(1)}%`, change: "+12%", trend: "up", icon: Target },
  ];

  const trafficSources = [
    { source: "Organic", value: 42, color: "bg-emerald-400" },
    { source: "Direct", value: 28, color: "bg-cyan-400" },
    { source: "Referral", value: 18, color: "bg-violet-400" },
    { source: "Social", value: 12, color: "bg-amber-400" },
  ];

  const topPages = [
    { page: "/dashboard", views: 12847, bounce: "24%" },
    { page: "/products", views: 8934, bounce: "32%" },
    { page: "/checkout", views: 4521, bounce: "18%" },
    { page: "/blog", views: 3456, bounce: "45%" },
  ];

  const hourlyData = [12, 8, 5, 3, 4, 8, 15, 28, 45, 52, 48, 55, 62, 58, 54, 48, 52, 65, 72, 68, 55, 42, 28, 18];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-5-start))] to-[hsl(var(--gradient-5-end))] overflow-hidden">
      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Top Stats Cards */}
      <div className="absolute top-[6%] left-[4%] flex gap-2">
        {metrics.slice(0, 3).map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2 flex items-center gap-2">
              <Icon className="w-3 h-3 text-cyan-400" />
              <div>
                <div className="text-white text-xs font-medium">{metric.value}</div>
                <div className="flex items-center gap-1">
                  <span className="text-white/40 text-[8px]">{metric.label}</span>
                  <span className="text-emerald-400 text-[8px]">{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="absolute left-[4%] top-[18%] w-[36%] h-[38%]">
        <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3 h-3 text-white/60" />
              <span className="text-white/70 text-[10px] font-medium">PERFORMANCE</span>
            </div>
            <div className="flex gap-1">
              {["D", "W", "M", "Y"].map((period, i) => (
                <button
                  key={i}
                  className={`w-5 h-5 rounded text-[8px] ${
                    i === 2 ? "bg-white/20 text-white" : "text-white/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bar chart */}
          <div className="flex items-end justify-between h-[calc(100%-50px)] gap-1.5 px-1">
            {chartData.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-white/40 to-white/20 rounded-t transition-all duration-1000"
                  style={{ height: `${value}%` }}
                />
                <span className="text-white/40 text-[7px]">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Activity Graph */}
      <div className="absolute left-[4%] bottom-[22%] w-[36%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">24H ACTIVITY</span>
        </div>
        <div className="flex items-end gap-0.5 h-12">
          {hourlyData.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-400/60 to-cyan-400/20 rounded-t transition-all"
              style={{ height: `${(value / 72) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[7px] text-white/30">
          <span>00:00</span>
          <span>12:00</span>
          <span>NOW</span>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="absolute right-[4%] top-[6%] space-y-2 w-[26%]">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className={`p-3 bg-white/5 backdrop-blur-sm rounded-xl border transition-all duration-500 ${
                activeMetric === i
                  ? "border-white/30 bg-white/10 scale-[1.02]"
                  : "border-white/10"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white/40" />
                  <div>
                    <div className="text-white/50 text-[9px] mb-0.5">{metric.label}</div>
                    <div className="text-white text-base font-semibold">{metric.value}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className="text-emerald-400 text-[10px]">{metric.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Sources */}
      <div className="absolute right-[4%] bottom-[32%] w-[26%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <PieChart className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">TRAFFIC SOURCES</span>
        </div>
        <div className="space-y-1.5">
          {trafficSources.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-white/60 text-[9px] flex-1">{item.source}</span>
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} opacity-70`} style={{ width: `${item.value}%` }} />
              </div>
              <span className="text-white/40 text-[8px] w-6 text-right">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div className="absolute right-[32%] bottom-[22%] w-[24%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <span className="text-white/70 text-[10px] font-medium">TOP PAGES</span>
        <div className="space-y-1 mt-2">
          {topPages.map((page, i) => (
            <div key={i} className="flex items-center gap-2 text-[8px] py-1 border-b border-white/5 last:border-0">
              <span className="text-white/40 w-3">{i + 1}.</span>
              <span className="text-white/70 font-mono flex-1 truncate">{page.page}</span>
              <span className="text-white/50">{page.views.toLocaleString()}</span>
              <span className="text-white/30">{page.bounce}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute top-[45%] left-[42%] animate-float">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center">
          <span className="text-white text-lg font-bold">98%</span>
          <span className="text-white/50 text-[8px]">Uptime</span>
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Analytics
        </h2>
        <p className="text-white/60 text-sm mt-1">Real-time Insights</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsBackground;
