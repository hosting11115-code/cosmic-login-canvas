import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <Card className="w-full max-w-md p-10 bg-white/5 backdrop-blur border border-white/20 shadow-[10px_10px_30px_1px_hsl(var(--glass-shadow)/0.4)] relative z-10">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-white">
          {/* Welcome Back */}
          <img src={logo} className="h-12 mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-full w-full top-0 left-0 opacity-20 -z-10"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>

          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <form onSubmit={handleSubmit} className="space-y-4 z-10">
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
  );
};

export default LoginForm;
