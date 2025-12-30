import { useEffect, useState } from "react";

const AnalyticsBackground = () => {
  const [chartData, setChartData] = useState<number[]>([40, 65, 45, 80, 55, 90, 70, 85]);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setChartData(prev => prev.map(v => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 20))));
    }, 2000);

    const metricInterval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(metricInterval);
    };
  }, []);

  const metrics = [
    { label: "Users", value: "12.4K", change: "+24%" },
    { label: "Revenue", value: "$84K", change: "+18%" },
    { label: "Sessions", value: "45.2K", change: "+32%" },
    { label: "Conversions", value: "8.7%", change: "+12%" },
  ];

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

      {/* Main chart */}
      <div className="absolute left-[5%] top-[15%] w-[40%] h-[50%]">
        <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-sm">Performance</span>
            <div className="flex gap-2">
              {["D", "W", "M", "Y"].map((period, i) => (
                <button
                  key={i}
                  className={`w-6 h-6 rounded text-xs ${
                    i === 2 ? "bg-white/20 text-white" : "text-white/50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bar chart */}
          <div className="flex items-end justify-between h-[calc(100%-60px)] gap-2 px-2">
            {chartData.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-white/40 to-white/20 rounded-t-md transition-all duration-1000"
                  style={{ height: `${value}%` }}
                />
                <span className="text-white/40 text-[10px]">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="absolute right-[5%] top-[15%] space-y-3 w-[30%]">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`p-4 bg-white/5 backdrop-blur-sm rounded-xl border transition-all duration-500 ${
              activeMetric === i
                ? "border-white/30 bg-white/10 scale-105"
                : "border-white/10"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white/50 text-xs mb-1">{metric.label}</div>
                <div className="text-white text-xl md:text-2xl font-semibold">{metric.value}</div>
              </div>
              <span className="text-emerald-400 text-sm">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Line chart decoration */}
      <svg className="absolute bottom-[25%] left-[10%] w-[35%] h-[20%]" viewBox="0 0 400 100">
        <path
          d="M 0 80 Q 50 60, 100 50 T 200 40 T 300 30 T 400 20"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        <path
          d="M 0 80 Q 50 60, 100 50 T 200 40 T 300 30 T 400 20"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="800"
          className="animate-[dash_3s_ease-in-out_infinite]"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating stats */}
      <div className="absolute bottom-[30%] right-[15%] animate-float">
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center">
          <span className="text-white text-2xl font-bold">98%</span>
          <span className="text-white/50 text-xs">Uptime</span>
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-20 left-10 md:left-20">
        <h2 className="text-white/90 text-3xl md:text-5xl font-light tracking-wide">
          Analytics
        </h2>
        <p className="text-white/60 text-lg mt-2">Real-time Insights</p>
      </div>

      <style>{`
        @keyframes dash {
          0% { stroke-dashoffset: 800; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -800; }
        }
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
