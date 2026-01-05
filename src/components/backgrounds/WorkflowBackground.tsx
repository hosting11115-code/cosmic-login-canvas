import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  CheckCircle,
  Clock,
  GitBranch,
  ArrowRight,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

const WorkflowBackground = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [runningTask, setRunningTask] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(24);

  useEffect(() => {
    const nodeInterval = setInterval(() => {
      const randomNodes = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 8)
      );
      setActiveNodes(randomNodes);
    }, 1500);

    const taskInterval = setInterval(() => {
      setRunningTask((prev) => (prev + 1) % 5);
      setCompletedTasks((prev) => prev + 1);
    }, 2000);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(taskInterval);
    };
  }, []);

  const nodes = [
    { x: 15, y: 25, label: "Trigger", icon: Play },
    { x: 32, y: 18, label: "Validate", icon: CheckCircle },
    { x: 50, y: 28, label: "Process", icon: GitBranch },
    { x: 68, y: 20, label: "Transform", icon: RotateCcw },
    { x: 22, y: 48, label: "Branch", icon: GitBranch },
    { x: 42, y: 55, label: "API Call", icon: ArrowRight },
    { x: 60, y: 50, label: "Wait", icon: Clock },
    { x: 35, y: 75, label: "Complete", icon: CheckCircle },
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 6],
    [3, 6],
    [5, 7],
    [6, 7],
  ];

  const recentRuns = [
    { name: "Order Processing", status: "success", time: "2m ago" },
    { name: "User Sync", status: "running", time: "now" },
    { name: "Report Gen", status: "success", time: "5m ago" },
    { name: "Email Campaign", status: "warning", time: "8m ago" },
  ];

  const taskQueue = [
    "Validate Order",
    "Check Inventory",
    "Process Payment",
    "Send Confirmation",
    "Update CRM",
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gradient-1-start))] to-[hsl(var(--gradient-1-end))] overflow-hidden">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top stats bar */}
      <div className="absolute top-[6%] left-[4%] flex gap-3">
        {[
          {
            label: "Active",
            value: "12",
            icon: Play,
            color: "text-emerald-400",
          },
          {
            label: "Queued",
            value: "47",
            icon: Clock,
            color: "text-amber-400",
          },
          {
            label: "Completed",
            value: completedTasks.toString(),
            icon: CheckCircle,
            color: "text-cyan-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2 flex items-center gap-2"
          >
            <stat.icon className={`w-3 h-3 ${stat.color}`} />
            <div>
              <div className="text-white text-xs font-medium">{stat.value}</div>
              <div className="text-white/40 text-[8px]">{stat.label}</div>
            </div>
          </div>
        ))}
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
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <div
            key={i}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              activeNodes.includes(i) ? "scale-110" : "scale-100"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl backdrop-blur-md border border-white/20 flex flex-col items-center justify-center transition-all duration-500 ${
                activeNodes.includes(i)
                  ? "bg-white/30 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  : "bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4 text-white/70 mb-1" />
              <span className="text-white/80 text-[8px] font-medium">
                {node.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Recent Runs Panel */}
      <div className="absolute top-[6%] right-[4%] w-[22%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <RotateCcw className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            RECENT RUNS
          </span>
        </div>
        <div className="space-y-1.5">
          {recentRuns.map((run, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[9px] py-1 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    run.status === "success"
                      ? "bg-emerald-400"
                      : run.status === "running"
                      ? "bg-cyan-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-white/70">{run.name}</span>
              </div>
              <span className="text-white/40">{run.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task Queue */}
      <div className="absolute bottom-[6%] right-[10%] w-[22%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-white/60" />
            <span className="text-white/70 text-[10px] font-medium">
              TASK QUEUE
            </span>
          </div>
          <span className="text-white/40 text-[8px]">5 pending</span>
        </div>
        <div className="space-y-1">
          {taskQueue.map((task, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-[9px] py-1.5 px-2 rounded transition-all duration-300 ${
                runningTask === i ? "bg-white/10 border border-white/20" : ""
              }`}
            >
              {runningTask === i ? (
                <div className="w-2 h-2 border border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20" />
              )}
              <span
                className={runningTask === i ? "text-white" : "text-white/50"}
              >
                {task}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="absolute bottom-[28%] left-[4%] w-[26%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[10px] font-medium">
            EXECUTION FLOW
          </span>
        </div>
        <div className="flex items-center gap-1">
          {["Start", "Validate", "Process", "Complete"].map((step, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[7px] ${
                  i <= 2
                    ? "bg-emerald-500/30 text-emerald-400 border border-emerald-500/50"
                    : "bg-white/10 text-white/40 border border-white/20"
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`flex-1 h-0.5 ${
                    i < 2 ? "bg-emerald-500/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5 text-[7px] text-white/40">
          <span>Start</span>
          <span>Validate</span>
          <span>Process</span>
          <span>Done</span>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
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
      <div className="absolute bottom-10 left-6 md:left-12">
        <h2 className="text-white/90 text-2xl md:text-4xl font-light tracking-wide">
          Workflow Engine
        </h2>
        <p className="text-white/60 text-sm mt-1">Visual Automation Builder</p>
      </div>
    </div>
  );
};

export default WorkflowBackground;
