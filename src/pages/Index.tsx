import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const gradientClasses = [
  "bg-gradient-to-br from-[hsl(var(--gradient-1-start))] to-[hsl(var(--gradient-1-end))]",
  "bg-gradient-to-br from-[hsl(var(--gradient-2-start))] to-[hsl(var(--gradient-2-end))]",
  "bg-gradient-to-br from-[hsl(var(--gradient-3-start))] to-[hsl(var(--gradient-3-end))]",
  "bg-gradient-to-br from-[hsl(var(--gradient-4-start))] to-[hsl(var(--gradient-4-end))]",
  "bg-gradient-to-br from-[hsl(var(--gradient-5-start))] to-[hsl(var(--gradient-5-end))]",
];

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);
  const totalSections = gradientClasses.length;

  const scrollToSection = useCallback((index: number) => {
    if (!scrollContainerRef.current || isScrolling.current) return;
    
    isScrolling.current = true;
    const container = scrollContainerRef.current;
    const sectionHeight = window.innerHeight;
    
    // Handle infinite loop
    let targetIndex = index;
    if (index >= totalSections * 2) {
      targetIndex = totalSections;
    } else if (index < totalSections) {
      targetIndex = totalSections + index;
    }
    
    container.scrollTo({
      top: targetIndex * sectionHeight,
      behavior: "smooth",
    });
    
    setCurrentSection(index % totalSections);
    
    setTimeout(() => {
      isScrolling.current = false;
      // Reset position for infinite loop
      if (targetIndex >= totalSections * 2 - 1) {
        container.scrollTop = totalSections * sectionHeight;
      } else if (targetIndex <= totalSections) {
        container.scrollTop = totalSections * sectionHeight;
      }
    }, 500);
  }, [totalSections]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (isScrolling.current) return;
    
    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = currentSection + direction;
    scrollToSection((nextSection + totalSections) % totalSections);
  }, [currentSection, scrollToSection, totalSections]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initialize scroll position to middle set for infinite loop
    container.scrollTop = totalSections * window.innerHeight;

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel, totalSections]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  // Create triple sections for infinite loop effect
  const allSections = [...gradientClasses, ...gradientClasses, ...gradientClasses];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Scrolling gradient background - only visible on desktop */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 hide-scrollbar overflow-y-scroll hidden md:block md:w-1/2"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {allSections.map((gradient, index) => (
          <div
            key={index}
            className={`h-screen w-full ${gradient} animate-gradient`}
            style={{ scrollSnapAlign: "start" }}
          />
        ))}
      </div>

      {/* Static gradient for mobile */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-br from-[hsl(var(--gradient-1-start))] to-[hsl(var(--gradient-3-end))] animate-gradient" />

      {/* Section indicators - desktop only */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-20">
        {gradientClasses.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-[hsl(var(--glass-border))] scale-125"
                : "bg-[hsl(var(--glass-border)/0.4)] hover:bg-[hsl(var(--glass-border)/0.7)]"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Login form container */}
      <div className="absolute inset-0 md:left-1/2 md:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-[hsl(var(--glass-bg)/0.15)] backdrop-blur-xl border-[hsl(var(--glass-border)/0.2)] shadow-[0_8px_32px_hsl(var(--glass-shadow)/0.3)] rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Enter your credentials to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground/90">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[hsl(var(--glass-bg)/0.1)] border-[hsl(var(--glass-border)/0.2)] text-primary-foreground placeholder:text-primary-foreground/50 focus:border-[hsl(var(--glass-border)/0.5)] focus:ring-[hsl(var(--glass-border)/0.3)] transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-foreground/90">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[hsl(var(--glass-bg)/0.1)] border-[hsl(var(--glass-border)/0.2)] text-primary-foreground placeholder:text-primary-foreground/50 focus:border-[hsl(var(--glass-border)/0.5)] focus:ring-[hsl(var(--glass-border)/0.3)] transition-all duration-200"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[hsl(var(--glass-bg)/0.2)] hover:bg-[hsl(var(--glass-bg)/0.3)] text-primary-foreground border border-[hsl(var(--glass-border)/0.3)] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
