import { useEffect, useState } from "react";

const WorkflowBackground = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodes = Array.from({ length: 3 }, () => Math.floor(Math.random() * 8));
      setActiveNodes(randomNodes);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { x: 8, y: 20, label: "Start" },
    { x: 20, y: 15, label: "Auth" },
    { x: 32, y: 25, label: "Validate" },
    { x: 44, y: 18, label: "Process" },
    { x: 12, y: 50, label: "Check" },
    { x: 28, y: 55, label: "Transform" },
    { x: 40, y: 48, label: "API" },
    { x: 24, y: 75, label: "Complete" },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [3, 6], [5, 7], [6, 7]
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-1-start))] to-[hsl(var(--gradient-1-end))] overflow-hidden">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Workflow connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([from, to], i) => (
          <line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Workflow nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            activeNodes.includes(i) ? "scale-110" : "scale-100"
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 ${
              activeNodes.includes(i)
                ? "bg-white/30 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                : "bg-white/10"
            }`}
          >
            <span className="text-white/80 text-xs font-medium">{node.label}</span>
          </div>
        </div>
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Title */}
      <div className="absolute bottom-20 left-10 md:left-20">
        <h2 className="text-white/90 text-3xl md:text-5xl font-light tracking-wide">
          Workflow
        </h2>
        <p className="text-white/60 text-lg mt-2">Automation</p>
      </div>
    </div>
  );
};

export default WorkflowBackground;
