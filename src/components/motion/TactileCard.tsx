"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { springConfig } from "@/lib/motion-physics";
import { cn } from "@/lib/utils";

interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function TactileCard({ children, className, ...props }: TactileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const smoothX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.975 }}
      transition={springConfig.reveal}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-royal-plum)]/30 p-6",
        className
      )}
      {...props}
    >
      {/* Mouse Follow Radial Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(244, 157, 26, 0.12), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
