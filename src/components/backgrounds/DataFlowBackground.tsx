import { useEffect, useState } from "react";
import {
  Database,
  HardDrive,
  Cpu,
  Activity,
  Upload,
  Download,
  Layers,
  Server,
} from "lucide-react";

const DataFlowBackground = () => {
  const [streams, setStreams] = useState<number[]>([]);
  const [throughput, setThroughput] = useState(1247);
  const [activeDb, setActiveDb] = useState(0);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setStreams((prev) => {
        const newStream = Math.floor(Math.random() * 12);
        return [...prev.slice(-8), newStream];
      });
    }, 300);

    const throughputInterval = setInterval(() => {
      setThroughput((prev) => prev + Math.floor(Math.random() * 50) - 20);
    }, 1000);

    const dbInterval = setInterval(() => {
      setActiveDb((prev) => (prev + 1) % 4);
    }, 2000);

    return () => {
      clearInterval(streamInterval);
      clearInterval(throughputInterval);
      clearInterval(dbInterval);
    };
  }, []);

  const databases = [
    { name: "Primary", status: "active", records: "2.4M" },
    { name: "Replica", status: "syncing", records: "2.4M" },
    { name: "Archive", status: "idle", records: "12.8M" },
    { name: "Cache", status: "active", records: "847K" },
  ];

  const dataTypes = [
    { type: "JSON", count: 4521, color: "bg-emerald-400" },
    { type: "Binary", count: 1203, color: "bg-cyan-400" },
    { type: "Text", count: 8934, color: "bg-violet-400" },
    { type: "Stream", count: 2156, color: "bg-amber-400" },
  ];

  const recentTransfers = [
    { from: "API", to: "DB", size: "2.4 MB", time: "now" },
    { from: "ETL", to: "Cache", size: "847 KB", time: "2s" },
    { from: "Stream", to: "Archive", size: "12 MB", time: "5s" },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-2-start))] to-[hsl(var(--gradient-2-end))] overflow-hidden">
      {/* Floating data cards */}
      <div className="absolute top-[15%] left-[30%] w-32 h-20 bg-gray-700/40 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float">
        <div className="w-full h-2 bg-white/30 rounded mb-2" />
        <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
        <div className="w-1/2 h-2 bg-white/20 rounded" />
      </div>

      <div
        className="absolute top-[45%] left-[40%] w-28 h-16 bg-gray-700/40 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg" />
          <div className="flex-1">
            <div className="w-full h-2 bg-white/30 rounded mb-1" />
            <div className="w-2/3 h-2 bg-white/20 rounded" />
          </div>
        </div>
      </div>

      <div
        className="absolute top-[70%] left-[10%] w-36 h-24 bg-gray-700/40 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex gap-1 mb-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-12 bg-white/20 rounded"
              style={{ height: `${20 + Math.random() * 30}px` }}
            />
          ))}
        </div>
        <div className="w-full h-2 bg-white/30 rounded" />
      </div>

      {/* Data streams background */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-full w-px"
          style={{ left: `${8 + i * 8}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          {streams.includes(i) && (
            <div
              className="absolute w-0.5 h-16 blur-[1px] bg-white/20 rounded-full"
              style={{ animation: "dataFlow 5s ease-in-out forwards" }}
            />
          )}
        </div>
      ))}

      {/* Top stats */}
      <div className="absolute top-[6%] left-[4%] flex gap-3">
        {[
          {
            label: "Throughput",
            value: `${throughput}/s`,
            icon: Activity,
            color: "text-emerald-400",
          },
          {
            label: "Latency",
            value: "12ms",
            icon: Cpu,
            color: "text-cyan-400",
          },
          {
            label: "Active",
            value: "847",
            icon: Layers,
            color: "text-violet-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-700/40 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2 flex items-center gap-2"
          >
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <div>
              <div className="text-white text-xs font-medium">{stat.value}</div>
              <div className="text-white/40 text-[8px]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Database Status Grid */}
      <div className="absolute top-[6%] right-[30%] w-[24%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            DATABASES
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {databases.map((db, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                activeDb === i
                  ? "bg-gray-700 border-white/30"
                  : "bg-gray-700/40 border-white/10"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    db.status === "active"
                      ? "bg-emerald-400"
                      : db.status === "syncing"
                      ? "bg-cyan-400 animate-pulse"
                      : "bg-white/30"
                  }`}
                />
                <span className="text-white/80 text-[9px]">{db.name}</span>
              </div>
              <div className="text-white/40 text-[8px]">{db.records}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Type Distribution */}
      <div className="absolute top-[35%] left-[4%] w-[22%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            DATA TYPES
          </span>
        </div>
        <div className="space-y-2">
          {dataTypes.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-white/60 text-[9px] flex-1">
                {item.type}
              </span>
              <span className="text-white/40 text-[8px]">
                {item.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1.5 bg-gray-700/40 rounded-full flex overflow-hidden">
          {dataTypes.map((item, i) => (
            <div
              key={i}
              className={`h-full ${item.color} opacity-60`}
              style={{ width: `${(item.count / 16814) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Live Transfer Monitor */}
      <div className="absolute top-[20%] right-[4%] w-[24%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-white/60" />
            <span className="text-white/70 text-[10px] font-medium">
              LIVE TRANSFERS
            </span>
          </div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        </div>
        <div className="space-y-1.5">
          {recentTransfers.map((transfer, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[9px] py-1.5 border-b border-white/5 last:border-0"
            >
              <span className="text-cyan-400 w-10">{transfer.from}</span>
              <Upload className="w-2.5 h-2.5 text-white/30" />
              <Download className="w-2.5 h-2.5 text-white/30" />
              <span className="text-emerald-400 w-12">{transfer.to}</span>
              <span className="text-white/50 flex-1 text-right">
                {transfer.size}
              </span>
              <span className="text-white/30">{transfer.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Server Pipeline */}
      <div className="absolute bottom-[28%] left-[24%] w-[34%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            DATA PIPELINE
          </span>
        </div>
        <div className="flex items-center justify-between">
          {["Ingest", "Transform", "Validate", "Store", "Index"].map(
            (stage, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[8px] ${
                    i <= 3
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                      : "bg-gray-700/40 border border-white/20 text-white/40"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-white/40 text-[7px] mt-1">{stage}</span>
                {i < 4 && (
                  <div
                    className="absolute"
                    style={{ left: `${12 + i * 18}%`, marginTop: "-12px" }}
                  >
                    <div
                      className={`w-8 h-0.5 ${
                        i < 3 ? "bg-emerald-500/50" : "bg-gray-700/40"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Storage Metrics */}
      <div className="absolute bottom-[10%] right-[15%] w-[20%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <HardDrive className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">STORAGE</span>
        </div>
        <div className="text-center mb-2">
          <div className="text-white text-lg font-medium">847 GB</div>
          <div className="text-white/40 text-[8px]">of 1 TB used</div>
        </div>
        <div className="h-2 bg-gray-700/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
            style={{ width: "84.7%" }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Data Flow
        </h2>
        <p className="text-white/60 text-sm mt-1">
          Real-time Pipeline Management
        </p>
      </div>

      <style>{`
        @keyframes dataFlow {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DataFlowBackground;
