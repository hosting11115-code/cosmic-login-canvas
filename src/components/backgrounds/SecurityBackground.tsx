import { useEffect, useState } from "react";
import { Shield, Lock, Key, Fingerprint } from "lucide-react";

const SecurityBackground = () => {
  const [scanLine, setScanLine] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 30);

    const iconInterval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % 4);
    }, 2000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const icons = [
    { Icon: Shield, label: "Protected" },
    { Icon: Lock, label: "Encrypted" },
    { Icon: Key, label: "Secure" },
    { Icon: Fingerprint, label: "Verified" },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-3-start))] to-[hsl(var(--gradient-3-end))] overflow-hidden">
      {/* Hexagonal pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path
                d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ top: `${scanLine}%`, transition: "top 0.03s linear" }}
      />

      {/* Central security shield */}
      <div className="absolute left-[15%] top-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Outer rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/20 animate-ping"
              style={{
                width: `${180 + i * 60}px`,
                height: `${180 + i * 60}px`,
                left: `${-30 - i * 30}px`,
                top: `${-30 - i * 30}px`,
                animationDuration: `${2 + i * 0.5}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}

          {/* Icon display */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center relative z-10">
            {icons.map(({ Icon, label }, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  activeIcon === i ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/80" strokeWidth={1.5} />
                <span className="text-white/60 text-xs mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute right-[10%] top-[20%] space-y-4">
        {["System Active", "Firewall On", "SSL Enabled", "2FA Ready"].map((status, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-white/70 animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm">{status}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute bottom-20 left-10 md:left-20">
        <h2 className="text-white/90 text-3xl md:text-5xl font-light tracking-wide">
          Security
        </h2>
        <p className="text-white/60 text-lg mt-2">Enterprise Grade</p>
      </div>
    </div>
  );
};

export default SecurityBackground;
