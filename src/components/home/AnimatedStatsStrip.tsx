"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, ShieldAlert, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { AnimatedScoreCounter } from "@/components/motion/AnimatedScoreCounter";

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  sublabel: string;
  badge: string;
  badgeColor: string;
}

const STATS: StatItem[] = [
  {
    icon: Building2,
    value: 38,
    suffix: "+",
    decimals: 0,
    label: "Accredited Campuses",
    sublabel: "NAAC A++ & Category 1 Ranked",
    badge: "100% Entitled",
    badgeColor: "bg-[#BADFDB] text-[#14171A]",
  },
  {
    icon: TrendingUp,
    value: 28.5,
    suffix: " LPA",
    decimals: 1,
    label: "Peak Salary Package",
    sublabel: "Verified 2025-26 Placement Audit",
    badge: "+72% Avg Hike",
    badgeColor: "bg-[#FFA4A4] text-[#14171A]",
  },
  {
    icon: Users,
    value: 94.2,
    suffix: "%",
    decimals: 1,
    label: "Placement Assistance",
    sublabel: "480+ Corporate Hiring Partners",
    badge: "Active Drives",
    badgeColor: "bg-[#BADFDB] text-[#14171A]",
  },
  {
    icon: Award,
    value: 0,
    suffix: "%",
    decimals: 0,
    label: "No-Cost EMI Interest",
    sublabel: "Flexible 12-24 Month Tenures",
    badge: "₹0 Processing",
    badgeColor: "bg-[#FFA4A4] text-[#14171A]",
  },
];

export function AnimatedStatsStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {STATS.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-[#14171A]/10 hover:border-[#14171A]/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FCF9EA] border border-[#14171A]/10 flex items-center justify-center text-[#14171A]">
                  <Icon className="w-5 h-5 text-[#14171A]" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-[#14171A] tracking-tight mb-1">
                {stat.value === 0 ? (
                  <span>0{stat.suffix}</span>
                ) : (
                  <>
                    <AnimatedScoreCounter targetValue={stat.value} decimals={stat.decimals ?? 0} />
                    <span>{stat.suffix}</span>
                  </>
                )}
              </div>

              <h4 className="text-sm font-bold text-[#14171A] leading-tight mb-1">
                {stat.label}
              </h4>
            </div>

            <p className="text-xs text-[#555E68] font-medium pt-3 border-t border-[#14171A]/10 mt-3">
              {stat.sublabel}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
