import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import WorkflowBackground from "@/components/backgrounds/WorkflowBackground";
import DataFlowBackground from "@/components/backgrounds/DataFlowBackground";
import SecurityBackground from "@/components/backgrounds/SecurityBackground";
import IntegrationBackground from "@/components/backgrounds/IntegrationBackground";
import AnalyticsBackground from "@/components/backgrounds/AnalyticsBackground";

const backgroundComponents = [
  WorkflowBackground,
  DataFlowBackground,
  SecurityBackground,
  IntegrationBackground,
  AnalyticsBackground,
];

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  
  const totalSections = backgroundComponents.length;

  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const scrollToSection = useCallback((index: number) => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    
    const normalizedIndex = ((index % totalSections) + totalSections) % totalSections;
    setCurrentSection(normalizedIndex);
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, [totalSections]);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current && !isScrollingRef.current) {
        const nextSection = (currentSectionRef.current + 1) % totalSections;
        scrollToSection(nextSection);
      }
    }, 4000); // Auto-scroll every 4 seconds
  }, [scrollToSection, totalSections]);

  // Pause auto-scroll on user interaction
  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 5000); // Resume after 5 seconds
  }, []);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    // Only handle wheel on left side (background area)
    const target = e.target as HTMLElement;
    if (target.closest('.login-form-container')) return;
    
    e.preventDefault();
    pauseAutoScroll();
    
    if (isScrollingRef.current) return;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = currentSectionRef.current + direction;
    scrollToSection(nextSection);
  }, [scrollToSection, pauseAutoScroll]);

  // Initialize auto-scroll
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  const CurrentBackground = backgroundComponents[currentSection];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Full-screen background with component slides */}
      <div className="fixed inset-0">
        {backgroundComponents.map((Background, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSection === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Background />
          </div>
        ))}
      </div>

      {/* Section indicators - left side */}
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

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div
          className="h-full bg-white/50 transition-all duration-300"
          style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>

      {/* Login form - fixed on right side */}
      <div className="login-form-container fixed inset-0 md:left-1/2 md:w-1/2 flex items-center justify-center z-20 p-4 md:p-8">
        {/* Mobile gradient background */}
        <div className="absolute inset-0 md:hidden">
          <CurrentBackground />
        </div>
        
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_hsl(var(--glass-shadow)/0.3)] relative z-10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your automation platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-white hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
