"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring physics (inspired by nomonkey.work)
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over clickable elements
      const interactiveEl = target.closest("button, a, input, select, [data-cursor]");
      if (interactiveEl) {
        setIsPointer(true);
        const customText = interactiveEl.getAttribute("data-cursor");
        setCursorText(customText || "");
      } else {
        setIsPointer(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer Follower Ring for Light Theme */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 90 : isPointer ? 48 : 26,
          height: cursorText ? 90 : isPointer ? 48 : 26,
          backgroundColor: cursorText 
            ? "rgba(255, 164, 164, 0.25)" 
            : isPointer 
              ? "rgba(186, 223, 219, 0.35)" 
              : "rgba(20, 23, 26, 0.04)",
          borderColor: cursorText 
            ? "#FFA4A4" 
            : isPointer 
              ? "#14171A" 
              : "rgba(20, 23, 26, 0.25)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 320 }}
        className="rounded-full border backdrop-blur-[2px] flex items-center justify-center text-center shadow-sm"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-black tracking-wider uppercase text-[#14171A] px-2 leading-tight"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Precision Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorText ? 0 : isPointer ? 1.4 : 1,
          backgroundColor: isPointer ? "#FFA4A4" : "#14171A",
        }}
        className="w-1.5 h-1.5 rounded-full absolute shadow-sm"
      />
    </div>
  );
}
