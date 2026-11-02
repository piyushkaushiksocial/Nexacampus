"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { springConfig } from "@/lib/motion-physics";
import { cn } from "@/lib/utils";

interface TactileCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function TactileCard({ children, className, ...props }: TactileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={springConfig.reveal}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-[#14171A]/10 p-6 shadow-xs",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
