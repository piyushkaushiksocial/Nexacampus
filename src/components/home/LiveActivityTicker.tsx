"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, TrendingUp, ShieldCheck, Flame, Award } from "lucide-react";

const TICKER_ITEMS = [
  { icon: Flame, text: "LIVE 2026 ADMISSIONS", tag: "Round 2 Open", color: "bg-[#FFA4A4] text-[#14171A]" },
  { icon: ShieldCheck, text: "UGC-DEB & NAAC A++ CERTIFIED", tag: "38+ Campuses", color: "bg-[#BADFDB] text-[#14171A]" },
  { icon: TrendingUp, text: "AVERAGE PLACEMENT HIKE +68%", tag: "₹28.5 LPA Peak", color: "bg-[#FCF9EA] text-[#14171A]" },
  { icon: Award, text: "0% INTEREST NO-COST EMI", tag: "Instant Approval", color: "bg-[#FFA4A4] text-[#14171A]" },
  { icon: CheckCircle2, text: "CAMPUS & FLEXIBLE DEGREE EQUIVALENCY", tag: "Gazette Entitled", color: "bg-[#BADFDB] text-[#14171A]" },
  { icon: Sparkles, text: "INSTANT PROSPECTUS & SYLLABUS DESK", tag: "1-Click PDF", color: "bg-[#FCF9EA] text-[#14171A]" },
];

export function LiveActivityTicker() {
  return (
    <div className="w-full bg-[#14171A] text-[#FCF9EA] py-3.5 overflow-hidden border-y border-[#14171A] relative z-20 shadow-md">
      <div className="flex items-center">
        {/* Infinite gliding marquee */}
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="inline-flex items-center gap-3 text-xs font-bold tracking-wide">
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${item.color}`}>
                  {item.tag}
                </span>
                <span className="flex items-center gap-1.5 text-white/90">
                  <Icon className="w-3.5 h-3.5 text-[#FFA4A4]" />
                  {item.text}
                </span>
                <span className="text-white/20 select-none">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
