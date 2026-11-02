"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface ScoreCounterProps {
  targetValue: number;
  durationMs?: number;
  decimals?: number;
}

export function AnimatedScoreCounter({
  targetValue,
  durationMs = 1800,
  decimals = 1,
}: ScoreCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView || !spanRef.current) return;

    let startTime: number | null = null;

    // Power4 ease-out curve for natural physical deceleration
    const easeOutPower4 = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const easedProgress = easeOutPower4(progress);
      const currentValue = easedProgress * targetValue;

      if (spanRef.current) {
        spanRef.current.textContent = currentValue.toFixed(decimals);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, targetValue, durationMs, decimals]);

  return <span ref={spanRef}>0.0</span>;
}
