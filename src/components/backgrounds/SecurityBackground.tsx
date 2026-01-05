import { useEffect, useState } from "react";
import { Shield, Lock, Key, Fingerprint, Eye, AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";

const SecurityBackground = () => {
  const [scanLine, setScanLine] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const [threatCount, setThreatCount] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 30);

    const iconInterval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % 4);
    }, 2000);

    const threatInterval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    const progressInterval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 200);

    return () => {
      clearInterval(scanInterval);
      clearInterval(iconInterval);
      clearInterval(threatInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const icons = [
    { Icon: Shield, label: "Protected" },
    { Icon: Lock, label: "Encrypted" },
    { Icon: Key, label: "Secure" },
    { Icon: Fingerprint, label: "Verified" },
  ];

  const securityLogs = [
    { event: "Login Success", ip: "192.168.1.x", status: "ok", time: "now" },
    { event: "API Access", ip: "10.0.0.x", status: "ok", time: "2s" },
    { event: "Failed Auth", ip: "45.x.x.x", status: "blocked", time: "5s" },
    { event: "Token Refresh", ip: "192.168.1.x", status: "ok", time: "8s" },
  ];

  const threatTypes = [
    { type: "SQL Injection", blocked: 24, color: "bg-red-400" },
    { type: "XSS Attempts", blocked: 18, color: "bg-amber-400" },
    { type: "Brute Force", blocked: 156, color: "bg-orange-400" },
    { type: "DDoS", blocked: 3, color: "bg-rose-400" },
  ];

  const compliance = [
    { name: "GDPR", status: true },
    { name: "SOC2", status: true },
    { name: "HIPAA", status: false },
    { name: "PCI", status: true },
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

      {/* Top Security Stats */}
      <div className="absolute top-[6%] left-[4%] flex gap-3">
        {[
          { label: "Threats Blocked", value: threatCount.toString(), icon: Shield, color: "text-emerald-400" },
          { label: "Active Sessions", value: "247", icon: Eye, color: "text-cyan-400" },
          { label: "Encryption", value: "AES-256", icon: Lock, color: "text-violet-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2 flex items-center gap-2">
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <div>
              <div className="text-white text-xs font-medium">{stat.value}</div>
              <div className="text-white/40 text-[8px]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Central security shield */}
      <div className="absolute left-[15%] top-[45%] -translate-y-1/2 flex items-center justify-center">
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
          {/* Outer rings - centered */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/20 animate-ping left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${140 + i * 50}px`,
                height: `${140 + i * 50}px`,
                animationDuration: `${2 + i * 0.5}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}

          {/* Icon display */}
          <div className="w-28 h-28 md:w-36 md:h-36 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center relative z-10">
            {icons.map(({ Icon, label }, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  activeIcon === i ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <Icon className="w-10 h-10 md:w-14 md:h-14 text-white/80" strokeWidth={1.5} />
                <span className="text-white/60 text-[10px] mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Log */}
      <div className="absolute top-[6%] right-[4%] w-[26%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">SECURITY LOG</span>
          <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
        <div className="space-y-1">
          {securityLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-2 text-[8px] py-1 border-b border-white/5 last:border-0">
              {log.status === 'ok' ? (
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
              ) : (
                <XCircle className="w-2.5 h-2.5 text-red-400" />
              )}
              <span className="text-white/70 flex-1">{log.event}</span>
              <span className="text-white/40 font-mono">{log.ip}</span>
              <span className="text-white/30">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Analysis */}
      <div className="absolute top-[38%] right-[4%] w-[26%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          <span className="text-white/70 text-[10px] font-medium">THREATS BLOCKED</span>
        </div>
        <div className="space-y-1.5">
          {threatTypes.map((threat, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${threat.color}`} />
              <span className="text-white/60 text-[9px] flex-1">{threat.type}</span>
              <span className="text-white/40 text-[8px]">{threat.blocked}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="absolute bottom-[28%] right-[4%] w-[22%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <span className="text-white/70 text-[10px] font-medium">COMPLIANCE</span>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {compliance.map((item, i) => (
            <div key={i} className={`px-2 py-1.5 rounded-lg border text-center ${
              item.status 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <span className={`text-[9px] ${item.status ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scan Progress */}
      <div className="absolute bottom-[28%] left-[4%] w-[26%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-[10px] font-medium">ACTIVE SCAN</span>
          <span className="text-cyan-400 text-[9px]">{scanProgress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-200"
            style={{ width: `${scanProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[7px] text-white/40">
          <span>Scanning: /api/auth/*</span>
          <span>ETA: 2m 34s</span>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute left-[42%] top-[20%] space-y-2">
        {["Firewall Active", "SSL/TLS 1.3", "2FA Enabled", "Rate Limited"].map((status, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-white/70 animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px]">{status}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Security Center
        </h2>
        <p className="text-white/60 text-sm mt-1">Enterprise-Grade Protection</p>
      </div>
    </div>
  );
};

export default SecurityBackground;
