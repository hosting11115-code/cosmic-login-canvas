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
      {/* Full-screen scrolling gradient background */}
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 hide-scrollbar overflow-y-scroll"
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

      {/* Section indicators */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {gradientClasses.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Login form container - positioned on right half on desktop, centered on mobile */}
      <div className="fixed inset-0 flex items-center justify-center md:justify-end p-6 md:pr-12 lg:pr-24 z-10">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white/70">
              Enter your credentials to sign in
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
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30 transition-all duration-200"
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
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/30 transition-all duration-200"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
