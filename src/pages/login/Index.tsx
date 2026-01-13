import { useState, useRef, useEffect, useCallback } from "react";
import WorkflowBackground from "@/pages/login/backgrounds/WorkflowBackground";
import DataFlowBackground from "@/pages/login/backgrounds/DataFlowBackground";
import SecurityBackground from "@/pages/login/backgrounds/SecurityBackground";
import IntegrationBackground from "@/pages/login/backgrounds/IntegrationBackground";
import AnalyticsBackground from "@/pages/login/backgrounds/AnalyticsBackground";
import AutomationBackground from "@/pages/login/backgrounds/AutomationBackground";
import LoginForm from "./login-form";

const backgroundComponents = [
  WorkflowBackground,
  DataFlowBackground,
  SecurityBackground,
  IntegrationBackground,
  AnalyticsBackground,
  AutomationBackground,
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  const totalSections = backgroundComponents.length;

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const scrollToSection = useCallback(
    (index: number) => {
      if (isScrollingRef.current) return;

      isScrollingRef.current = true;

      const normalizedIndex =
        ((index % totalSections) + totalSections) % totalSections;
      setCurrentSection(normalizedIndex);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    },
    [totalSections]
  );

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current && !isScrollingRef.current) {
        const nextSection = (currentSectionRef.current + 1) % totalSections;
        scrollToSection(nextSection);
      }
    }, 6000);
  }, [scrollToSection, totalSections]);

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 8000);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".login-form-container")) return;

      e.preventDefault();
      pauseAutoScroll();

      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSectionRef.current + direction;
      scrollToSection(nextSection);
    },
    [scrollToSection, pauseAutoScroll]
  );

  useEffect(() => {
    startAutoScroll();

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [handleWheel, startAutoScroll]);

  const CurrentBackground = backgroundComponents[currentSection];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0">
        {backgroundComponents.map((Background, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSection === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute h-full w-full bg-black/40 z-10" />
            <Background />
          </div>
        ))}
      </div>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {backgroundComponents.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              pauseAutoScroll();
              scrollToSection(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-150"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <div className="fixed top-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div
          className="h-full bg-white/50 transition-all duration-300"
          style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>

      <div className="login-form-container fixed inset-0 md:left-1/2 md:w-1/2 flex items-center justify-center z-20 p-4 md:p-8">
        <div className="absolute inset-0 md:hidden">
          <CurrentBackground />
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
