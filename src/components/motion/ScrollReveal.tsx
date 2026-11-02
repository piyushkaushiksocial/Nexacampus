"use client";

import { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 30,
  direction = "up",
  className = "",
  ...props
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: yOffset };
      case "down":
        return { opacity: 0, y: -yOffset };
      case "left":
        return { opacity: 0, x: yOffset };
      case "right":
        return { opacity: 0, x: -yOffset };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: yOffset };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth fluid cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
