import { useEffect, useState } from "react";
import {
  Plug,
  Webhook,
  Cloud,
  Database,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";

const IntegrationBackground = () => {
  const [connections, setConnections] = useState<number[]>([]);
  const [activeSync, setActiveSync] = useState(0);
  const [apiCalls, setApiCalls] = useState(12847);

  useEffect(() => {
    const connectionInterval = setInterval(() => {
      const newConnections = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 8)
      );
      setConnections(newConnections);
    }, 2000);

    const syncInterval = setInterval(() => {
      setActiveSync((prev) => (prev + 1) % 6);
    }, 1500);

    const apiInterval = setInterval(() => {
      setApiCalls((prev) => prev + Math.floor(Math.random() * 20));
    }, 1000);

    return () => {
      clearInterval(connectionInterval);
      clearInterval(syncInterval);
      clearInterval(apiInterval);
    };
  }, []);

  const platforms = [
    {
      name: "Salesforce",
      x: 28,
      y: 22,
      color: "from-blue-400/30 to-blue-600/30",
      status: "connected",
    },
    {
      name: "Slack",
      x: 45,
      y: 15,
      color: "from-purple-400/30 to-purple-600/30",
      status: "connected",
    },
    {
      name: "AWS",
      x: 58,
      y: 24,
      color: "from-amber-400/30 to-amber-600/30",
      status: "syncing",
    },
    {
      name: "Stripe",
      x: 70,
      y: 30,
      color: "from-violet-400/30 to-violet-600/30",
      status: "connected",
    },
    {
      name: "GitHub",
      x: 20,
      y: 52,
      color: "from-gray-400/30 to-gray-600/30",
      status: "connected",
    },
    {
      name: "Jira",
      x: 33,
      y: 70,
      color: "from-blue-400/30 to-blue-600/30",
      status: "error",
    },
    {
      name: "Twilio",
      x: 55,
      y: 85,
      color: "from-red-400/30 to-red-600/30",
      status: "connected",
    },
    {
      name: "Zapier",
      x: 73,
      y: 50,
      color: "from-orange-400/30 to-orange-600/30",
      status: "connected",
    },
  ];

  const centerX = 50;
  const centerY = 50;

  const recentSyncs = [
    {
      app: "Salesforce",
      action: "Contact sync",
      records: 247,
      status: "success",
    },
    { app: "Slack", action: "Message sent", records: 1, status: "success" },
    { app: "AWS S3", action: "File upload", records: 12, status: "pending" },
    { app: "GitHub", action: "Webhook", records: 3, status: "success" },
  ];

  const webhooks = [
    { endpoint: "/api/webhook/orders", calls: 1247, status: "active" },
    { endpoint: "/api/webhook/users", calls: 892, status: "active" },
    { endpoint: "/api/webhook/events", calls: 456, status: "paused" },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-4-start))] to-[hsl(var(--gradient-4-end))] overflow-hidden">
      {/* Top Stats */}
      <div className="absolute top-[6%] left-[4%] flex gap-3">
        {[
          {
            label: "API Calls",
            value: apiCalls.toLocaleString(),
            icon: Zap,
            color: "text-emerald-400",
          },
          {
            label: "Connected",
            value: "24",
            icon: Plug,
            color: "text-cyan-400",
          },
          {
            label: "Webhooks",
            value: "18",
            icon: Webhook,
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

      {/* Connection lines to center */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {platforms.map((platform, i) => (
          <g key={i}>
            <line
              x1={platform.x}
              y1={platform.y}
              x2={centerX}
              y2={centerY}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.1}
              strokeDasharray={connections.includes(i) ? "0" : ".4,.6"}
            />

            {connections.includes(i) && (
              <circle r=".2" fill="#fff6">
                <animateMotion
                  dur="1.2s"
                  repeatCount="indefinite"
                  path={`M ${platform.x} ${platform.y} L ${centerX} ${centerY}`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Central hub */}
      <div
        className="absolute w-20 h-20 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${centerX}%`, top: `${centerY}%` }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 flex items-center justify-center">
          <div className="text-center">
            <Cloud className="w-6 h-6 text-white/80 mx-auto" />
            <div className="text-white/60 text-[8px] mt-1">HUB</div>
          </div>
        </div>
        <div className="absolute inset-[-16px] rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Platform nodes */}
      {platforms.map((platform, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 md:w-14 md:h-14 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            connections.includes(i) ? "scale-110" : "scale-100"
          }`}
          style={{ left: `${platform.x}%`, top: `${platform.y}%` }}
        >
          <div
            className={`w-full h-full rounded-lg bg-gradient-to-br ${
              platform.color
            } backdrop-blur-md border border-white/20 flex flex-col items-center justify-center ${
              connections.includes(i)
                ? "shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                : ""
            }`}
          >
            <span className="text-white/80 text-[8px] font-medium">
              {platform.name}
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full mt-1 ${
                platform.status === "connected"
                  ? "bg-emerald-400"
                  : platform.status === "syncing"
                  ? "bg-cyan-400 animate-pulse"
                  : "bg-red-400"
              }`}
            />
          </div>
        </div>
      ))}

      {/* Recent Syncs Panel */}
      <div className="absolute top-[6%] right-[4%] w-[26%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw
            className={`w-3 h-3 text-white/60 ${
              activeSync % 2 === 0 ? "animate-spin" : ""
            }`}
          />
          <span className="text-white/70 text-[10px] font-medium">
            RECENT SYNCS
          </span>
        </div>
        <div className="space-y-1">
          {recentSyncs.map((sync, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[8px] py-1 border-b border-white/5 last:border-0"
            >
              {sync.status === "success" ? (
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
              ) : (
                <RefreshCw className="w-2.5 h-2.5 text-cyan-400 animate-spin" />
              )}
              <span className="text-white/70 flex-1">{sync.app}</span>
              <span className="text-white/40">{sync.action}</span>
              <span className="text-white/30">{sync.records}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook Monitor */}
      <div className="absolute bottom-[10%] right-[4%] w-[26%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Webhook className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            WEBHOOKS
          </span>
        </div>
        <div className="space-y-1.5">
          {webhooks.map((webhook, i) => (
            <div key={i} className="flex items-center gap-2 text-[8px]">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  webhook.status === "active"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              <span className="text-white/50 font-mono flex-1 truncate">
                {webhook.endpoint}
              </span>
              <span className="text-white/30">{webhook.calls}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Health */}
      <div className="absolute bottom-[20%] left-[4%] w-[24%] bg-gray-700/40 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-3 h-3 text-white/60 animate-[spin_4s_linear_infinite]" />
          <span className="text-white/70 text-[10px] font-medium">HEALTH</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Uptime", value: "99.9%", status: "good" },
            { label: "Latency", value: "45ms", status: "good" },
            { label: "Errors", value: "0.1%", status: "warning" },
            { label: "Queue", value: "12", status: "good" },
          ].map((metric, i) => (
            <div
              key={i}
              className="text-center p-1.5 bg-gray-700/40 rounded-lg"
            >
              <div
                className={`text-xs font-medium ${
                  metric.status === "good"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {metric.value}
              </div>
              <div className="text-white/40 text-[7px]">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Integration Hub
        </h2>
        <p className="text-white/60 text-sm mt-1">Connect Everything</p>
      </div>
    </div>
  );
};

export default IntegrationBackground;
