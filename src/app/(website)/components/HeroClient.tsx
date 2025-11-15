"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThreeDMarqueeDemo } from "./ThreeDMarquee";
import { ArrowRight, Sparkles } from "lucide-react";
import { InfiniteMovingCardsDemo } from "./Infinite";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:py-24 lg:py-32 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-pulse delay-75" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-sm mx-auto lg:mx-0"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-gray-200">
              Join Our Running Community
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            <span className="text-white">Wynnie</span>{" "}
            <span className="text-brand-primary inline-block bg-gradient-to-r from-brand-primary to-pink-400 bg-clip-text text-transparent">
              Runner
            </span>
            <br />
            <span className="text-white">Running Together,</span>
            <br />
            <span className="text-gray-300 text-4xl sm:text-5xl lg:text-6xl">
              Growing Stronger
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Join us as we celebrate the spirit of running, teamwork, and shared
            memories — together we move forward, one step at a time.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
          >
            <Button
              size="lg"
              className="group relative rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 transition-all duration-300"
            >
              Join the Team
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-gray-700 hover:border-brand-primary/50 bg-transparent text-gray-200 hover:bg-brand-primary/5 hover:text-white px-8 py-6 text-base font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8"
          >
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-brand-primary">500+</div>
              <div className="text-sm text-gray-500">Active Runners</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-brand-primary">50+</div>
              <div className="text-sm text-gray-500">Events Completed</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-brand-primary">10K+</div>
              <div className="text-sm text-gray-500">Miles Covered</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right content - 3D Marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-full"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <ThreeDMarqueeDemo />
          </div>
        </motion.div>
      </div>

      <InfiniteMovingCardsDemo />
    </section>
  );
}
