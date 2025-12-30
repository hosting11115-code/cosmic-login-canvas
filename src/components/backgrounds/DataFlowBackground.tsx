import { useEffect, useState } from "react";

const DataFlowBackground = () => {
  const [streams, setStreams] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => {
        const newStream = Math.floor(Math.random() * 12);
        return [...prev.slice(-8), newStream];
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-2-start))] to-[hsl(var(--gradient-2-end))] overflow-hidden">
      {/* Data streams - contained to left 45% */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute h-full w-px"
          style={{ left: `${5 + i * 4}%` }}
        >
          {/* Stream line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          {/* Data packets */}
          {streams.includes(i) && (
            <div
              className="absolute w-3 h-8 bg-white/60 rounded-full blur-sm animate-[dataFlow_1.5s_ease-in-out]"
              style={{
                animation: "dataFlow 1.5s ease-in-out forwards",
              }}
            />
          )}
        </div>
      ))}

      {/* Floating data cards - contained to left side */}
      <div className="absolute top-[15%] left-[5%] w-32 h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float">
        <div className="w-full h-2 bg-white/30 rounded mb-2" />
        <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
        <div className="w-1/2 h-2 bg-white/20 rounded" />
      </div>

      <div className="absolute top-[40%] left-[25%] w-28 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float" style={{ animationDelay: "1s" }}>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg" />
          <div className="flex-1">
            <div className="w-full h-2 bg-white/30 rounded mb-1" />
            <div className="w-2/3 h-2 bg-white/20 rounded" />
          </div>
        </div>
      </div>

      <div className="absolute top-[65%] left-[8%] w-36 h-24 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="flex gap-1 mb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 h-12 bg-white/20 rounded" style={{ height: `${20 + Math.random() * 30}px` }} />
          ))}
        </div>
        <div className="w-full h-2 bg-white/30 rounded" />
      </div>

      {/* Binary rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60 text-xs font-mono animate-[fall_3s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute bottom-20 left-10 md:left-20">
        <h2 className="text-white/90 text-3xl md:text-5xl font-light tracking-wide">
          Data Flow
        </h2>
        <p className="text-white/60 text-lg mt-2">Seamless Integration</p>
      </div>

      <style>{`
        @keyframes dataFlow {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DataFlowBackground;
