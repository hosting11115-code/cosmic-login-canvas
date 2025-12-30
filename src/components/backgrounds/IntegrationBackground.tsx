import { useEffect, useState } from "react";

const IntegrationBackground = () => {
  const [connections, setConnections] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newConnections = Array.from({ length: 4 }, () => Math.floor(Math.random() * 8));
      setConnections(newConnections);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const platforms = [
    { name: "CRM", x: 10, y: 25, color: "from-blue-400/30 to-blue-600/30" },
    { name: "ERP", x: 25, y: 15, color: "from-purple-400/30 to-purple-600/30" },
    { name: "API", x: 38, y: 22, color: "from-pink-400/30 to-pink-600/30" },
    { name: "DB", x: 45, y: 35, color: "from-cyan-400/30 to-cyan-600/30" },
    { name: "Cloud", x: 8, y: 55, color: "from-indigo-400/30 to-indigo-600/30" },
    { name: "AI", x: 22, y: 65, color: "from-violet-400/30 to-violet-600/30" },
    { name: "IoT", x: 35, y: 58, color: "from-fuchsia-400/30 to-fuchsia-600/30" },
    { name: "Auth", x: 42, y: 75, color: "from-rose-400/30 to-rose-600/30" },
  ];

  const centerX = 25;
  const centerY = 42;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-4-start))] to-[hsl(var(--gradient-4-end))] overflow-hidden">
      {/* Connection lines to center */}
      <svg className="absolute inset-0 w-full h-full">
        {platforms.map((platform, i) => (
          <g key={i}>
            <line
              x1={`${platform.x}%`}
              y1={`${platform.y}%`}
              x2={`${centerX}%`}
              y2={`${centerY}%`}
              stroke={connections.includes(i) ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"}
              strokeWidth={connections.includes(i) ? "3" : "1"}
              strokeDasharray={connections.includes(i) ? "0" : "5,5"}
              className="transition-all duration-500"
            />
            {connections.includes(i) && (
              <circle r="4" fill="white" className="animate-pulse">
                <animateMotion
                  dur="1s"
                  repeatCount="indefinite"
                  path={`M ${platform.x * 10} ${platform.y * 10} L ${centerX * 10} ${centerY * 10}`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Central hub */}
      <div
        className="absolute w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${centerX}%`, top: `${centerY}%` }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="text-white/90 text-lg md:text-xl font-semibold">HUB</div>
            <div className="text-white/60 text-xs">Central</div>
          </div>
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Platform nodes */}
      {platforms.map((platform, i) => (
        <div
          key={i}
          className={`absolute w-16 h-16 md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            connections.includes(i) ? "scale-110" : "scale-100"
          }`}
          style={{ left: `${platform.x}%`, top: `${platform.y}%` }}
        >
          <div
            className={`w-full h-full rounded-xl bg-gradient-to-br ${platform.color} backdrop-blur-md border border-white/20 flex items-center justify-center ${
              connections.includes(i) ? "shadow-[0_0_25px_rgba(255,255,255,0.3)]" : ""
            }`}
          >
            <span className="text-white/80 text-xs md:text-sm font-medium">{platform.name}</span>
          </div>
        </div>
      ))}

      {/* Bottom row icons - moved to left side */}
      <div className="absolute bottom-32 left-[20%] flex gap-6">
        {["Sync", "Deploy", "Monitor", "Scale"].map((label, i) => (
          <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 mb-2" />
            <span className="text-white/50 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute bottom-20 left-10 md:left-20">
        <h2 className="text-white/90 text-3xl md:text-5xl font-light tracking-wide">
          Integration
        </h2>
        <p className="text-white/60 text-lg mt-2">Connect Everything</p>
      </div>
    </div>
  );
};

export default IntegrationBackground;
