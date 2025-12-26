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
  const isScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const totalSections = gradientClasses.length;

  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container || isScrollingRef.current) {
      console.log("Scroll blocked:", { container: !!container, isScrolling: isScrollingRef.current });
      return;
    }
    
    console.log("Scrolling to section:", index);
    isScrollingRef.current = true;
    const sectionHeight = window.innerHeight;
    
    // Normalize index for infinite loop
    const normalizedIndex = ((index % totalSections) + totalSections) % totalSections;
    const targetScrollTop = (totalSections + normalizedIndex) * sectionHeight;
    
    console.log("Target scroll:", { normalizedIndex, targetScrollTop, sectionHeight });
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
    
    setCurrentSection(normalizedIndex);
    
    setTimeout(() => {
      isScrollingRef.current = false;
      console.log("Scroll complete, unlocked");
    }, 600);
  }, [totalSections]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initialize scroll position to middle set for infinite loop
    const initialScrollTop = totalSections * window.innerHeight;
    container.scrollTop = initialScrollTop;
    console.log("Initialized scroll position:", initialScrollTop);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrollingRef.current) {
        console.log("Wheel event ignored - already scrolling");
        return;
      }
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const current = currentSectionRef.current;
      const nextSection = current + direction;
      
      console.log("Wheel event:", { deltaY: e.deltaY, direction, current, nextSection });
      
      scrollToSection(nextSection);
    };

    // Add wheel listener to the document to capture all wheel events
    document.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [scrollToSection, totalSections]);

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
