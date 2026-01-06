import { useEffect, useState } from "react";
import {
  Calendar,
  BarChart3,
  Table2,
  Cog,
  RefreshCw,
  Radio,
  Clock,
  Users,
  Zap,
} from "lucide-react";

const AutomationBackground = () => {
  const [syncPulse, setSyncPulse] = useState(false);
  const [liveValue, setLiveValue] = useState(847);
  const [machineStatus, setMachineStatus] = useState([
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
  ]);
  const [shiftProgress, setShiftProgress] = useState(65);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSyncPulse((prev) => !prev);
    }, 1500);

    const liveInterval = setInterval(() => {
      setLiveValue((prev) => prev + Math.floor(Math.random() * 10) - 3);
    }, 800);

    const machineInterval = setInterval(() => {
      setMachineStatus((prev) => prev.map(() => Math.random() > 0.15));
    }, 3000);

    const shiftInterval = setInterval(() => {
      setShiftProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 500);

    return () => {
      clearInterval(syncInterval);
      clearInterval(liveInterval);
      clearInterval(machineInterval);
      clearInterval(shiftInterval);
    };
  }, []);

  const miniChartData = [35, 45, 30, 60, 45, 75, 55, 80, 65, 70, 85, 60];
  const tableRows = [
    { id: "ORD-001", status: "active", value: 234 },
    { id: "ORD-002", status: "pending", value: 156 },
    { id: "ORD-003", status: "active", value: 421 },
    { id: "ORD-004", status: "done", value: 89 },
  ];

  const calendarDays = Array.from({ length: 14 }, (_, i) => ({
    day: i + 15,
    hasEvent: [0, 3, 5, 8, 11].includes(i),
    isToday: i === 4,
  }));

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-6-start))] to-[hsl(var(--gradient-6-end))] overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="automation-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#automation-grid)" />
        </svg>
      </div>

      {/* Live data pulse effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          syncPulse ? "opacity-5" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-radial from-cyan-400 to-transparent" />
      </div>

      {/* Top left - Mini Dashboard Cards */}
      <div className="absolute top-[8%] left-[4%] flex gap-2">
        {[
          { icon: Users, label: "Active", value: "1,247" },
          { icon: Zap, label: "Events/s", value: liveValue.toString() },
          { icon: Clock, label: "Uptime", value: "99.9%" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-gray-700/40 backdrop-blur-sm rounded-lg border border-white/10 p-2 w-20"
          >
            <card.icon className="w-3 h-3 text-cyan-400 mb-1" />
            <div className="text-white text-xs font-medium">{card.value}</div>
            <div className="text-white/40 text-[8px]">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Top right - Sync indicator */}
      <div className="absolute top-[8%] right-[4%] flex items-center gap-2">
        <RefreshCw
          className={`w-4 h-4 text-emerald-400 ${
            syncPulse ? "animate-spin" : ""
          }`}
        />
        <div className="flex flex-col">
          <span className="text-emerald-400 text-xs font-medium">SYNCED</span>
          <span className="text-white/40 text-[8px]">Real-time</span>
        </div>
        <div className="ml-2 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-3 rounded-full transition-all duration-300 ${
                i <= (syncPulse ? 3 : 1) ? "bg-emerald-400" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Left side - Mini Table */}
      <div className="absolute top-[22%] left-[4%] w-[28%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Table2 className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">ORDERS</span>
        </div>
        <div className="space-y-1">
          {tableRows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[9px] py-1 border-b border-white/5"
            >
              <span className="text-white/60 font-mono">{row.id}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[7px] ${
                  row.status === "active"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : row.status === "pending"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {row.status}
              </span>
              <span className="text-white/80">${row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center - Live Chart */}
      <div className="absolute top-[22%] left-[35%] w-[30%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3 text-white/60" />
            <span className="text-white/70 text-[10px] font-medium">
              LIVE METRICS
            </span>
          </div>
          <Radio className="w-3 h-3 text-red-400 animate-pulse" />
        </div>
        <div className="h-16 flex items-end gap-1">
          {miniChartData.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-indigo-500/60 to-cyan-400/40 rounded-t transition-all duration-500"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/30 text-[7px]">00:00</span>
          <span className="text-white/30 text-[7px]">NOW</span>
        </div>
      </div>

      {/* Right side - Calendar */}
      <div className="absolute top-[22%] right-[4%] w-[24%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            SCHEDULE
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((d, i) => (
            <div
              key={i}
              className={`aspect-square rounded flex items-center justify-center text-[8px] relative ${
                d.isToday
                  ? "bg-indigo-500 text-white"
                  : d.hasEvent
                  ? "bg-white/10 text-white/80"
                  : "text-white/40"
              }`}
            >
              {d.day}
              {d.hasEvent && !d.isToday && (
                <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-cyan-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom left - Machine Status Grid */}
      <div className="absolute bottom-[25%] left-[4%] w-[28%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Cog className="w-3 h-3 text-white/60 animate-[spin_4s_linear_infinite]" />
          <span className="text-white/70 text-[10px] font-medium">
            MACHINES
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {machineStatus.map((active, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg border flex items-center justify-center transition-all duration-500 ${
                active
                  ? "bg-emerald-500/20 border-emerald-500/40"
                  : "bg-red-500/20 border-red-500/40"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  active ? "bg-emerald-400" : "bg-red-400 animate-pulse"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[8px]">
          <span className="text-emerald-400">
            ● {machineStatus.filter(Boolean).length} Online
          </span>
          <span className="text-red-400">
            ● {machineStatus.filter((s) => !s).length} Offline
          </span>
        </div>
      </div>

      {/* Bottom center - Shift Progress */}
      <div className="absolute bottom-[25%] left-[35%] w-[30%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-[10px] font-medium">
            SHIFT PROGRESS
          </span>
          <span className="text-white/50 text-[9px]">08:00 - 16:00</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${shiftProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-center">
            <div className="text-white text-sm font-medium">247</div>
            <div className="text-white/40 text-[7px]">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-white text-sm font-medium">53</div>
            <div className="text-white/40 text-[7px]">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-white text-sm font-medium">12</div>
            <div className="text-white/40 text-[7px]">Pending</div>
          </div>
        </div>
      </div>

      {/* Bottom right - Data Streams */}
      <div className="absolute bottom-[25%] right-[4%] w-[24%] space-y-2">
        {["API Gateway", "Database", "Cache", "Queue"].map((service, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-700/40 rounded-lg px-2 py-1.5 border border-white/10"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                i === 2 ? "bg-amber-400" : "bg-emerald-400"
              } animate-pulse`}
            />
            <span className="text-white/60 text-[9px] flex-1">{service}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <div
                  key={j}
                  className="w-0.5 h-2 bg-cyan-400/60 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${j * 100}ms`,
                    height: `${4 + Math.random() * 8}px`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(99, 179, 237, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 100 200 Q 200 150, 300 200 T 500 180"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-[dash_10s_linear_infinite]"
        />
        <path
          d="M 600 300 Q 700 250, 800 300 T 1000 280"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-[dash_8s_linear_infinite]"
        />
      </svg>

      {/* Title */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Automation Hub
        </h2>
        <p className="text-white/60 text-sm mt-1">
          Everything. Connected. Live.
        </p>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};

export default AutomationBackground;
