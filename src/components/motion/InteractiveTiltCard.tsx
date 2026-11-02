"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { sound } from "@/lib/sound";

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InteractiveTiltCard({
  children,
  className = "",
  onClick,
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords relative to card (-0.5 to 0.5)
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Smooth springs for tilt angles
  const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseRelX = e.clientX - rect.left;
    const mouseRelY = e.clientY - rect.top;

    spotlightX.set(mouseRelX);
    spotlightY.set(mouseRelY);

    const normX = (mouseRelX / rect.width) - 0.5;
    const normY = (mouseRelY / rect.height) - 0.5;

    // Subtle 3D tilt (max 6 degrees)
    rotateX.set(-normY * 6);
    rotateY.set(normX * 6);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.tick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleClick = () => {
    sound.snap();
    if (onClick) onClick();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", damping: 18, stiffness: 300 }}
      className={`relative overflow-hidden rounded-3xl border border-[#14171A]/[0.08] bg-white text-[#14171A] shadow-[0_8px_30px_-6px_rgba(20,23,26,0.06)] hover:shadow-[0_16px_40px_-8px_rgba(20,23,26,0.12)] transition-shadow duration-300 group ${className}`}
    >
      {/* 3D Dynamic Pastel Spotlight follow */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, rgba(186, 223, 219, 0.35), transparent 70%)`,
          }}
        />
      )}

      {/* Shimmer Border line following mouse */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#FFA4A4] transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(220px circle at ${spotlightX.get()}px ${spotlightY.get()}px, black, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(220px circle at ${spotlightX.get()}px ${spotlightY.get()}px, black, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
