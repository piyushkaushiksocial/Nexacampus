"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, DollarSign } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function UniversityIntakeForecaster() {
  const [quotaCapacity, setQuotaCapacity] = useState<number>(1200);
  const [avgTuition, setAvgTuition] = useState<number>(180000);
  const [programType, setProgramType] = useState<"pg" | "ug">("pg");

  // Calculations
  const metrics = useMemo(() => {
    const conversionRate = programType === "pg" ? 0.34 : 0.28;
    const projectedApplicants = Math.round(quotaCapacity / conversionRate);
    const estimatedEnrolled = Math.round(quotaCapacity * 0.92);
    const grossTreasuryDisbursementCrores = ((estimatedEnrolled * avgTuition) / 10000000).toFixed(2);
    const savedCpaLakhs = Math.round((estimatedEnrolled * 12500) / 100000);

    return {
      projectedApplicants,
      estimatedEnrolled,
      grossTreasuryDisbursementCrores,
      savedCpaLakhs,
    };
  }, [quotaCapacity, avgTuition, programType]);

  return (
    <div className="w-full bg-[#14171A] text-[#FCF9EA] rounded-3xl p-6 sm:p-10 border border-[#14171A] shadow-xl relative overflow-hidden">
      
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FFA4A4]/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: Explanatory & Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FCF9EA] text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#BADFDB]" />
              <span>For Universities & Institutional Leadership</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Institutional Admissions & Treasury Forecaster
            </h3>

            <p className="text-xs sm:text-sm text-white/70 mt-2 font-medium leading-relaxed">
              Model your annual intake yield across Nexa Campus&apos;s verified candidate pipeline. Calculate direct treasury disbursements and reduced acquisition overhead.
            </p>
          </div>

          {/* Program Type Switcher */}
          <div>
            <label className="text-xs font-bold text-white/80 block mb-2">
              Academic Degree Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { sound.tick(); setProgramType("pg"); }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                  programType === "pg"
                    ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                    : "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                }`}
              >
                Postgraduate (MBA / MCA / MS)
              </button>

              <button
                onClick={() => { sound.tick(); setProgramType("ug"); }}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all ${
                  programType === "ug"
                    ? "bg-[#BADFDB] text-[#14171A] border-[#BADFDB] shadow-xs"
                    : "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                }`}
              >
                Undergraduate (BBA / B.Tech / BCA)
              </button>
            </div>
          </div>

          {/* Slider 1: Annual Intake Quota */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/90">
                Annual Targeted Student Intake Capacity
              </span>
              <span className="text-sm font-black text-[#FFA4A4] font-mono">
                {quotaCapacity.toLocaleString("en-IN")} Seats
              </span>
            </div>
            <input
              type="range"
              min={300}
              max={5000}
              step={100}
              value={quotaCapacity}
              onChange={(e) => setQuotaCapacity(Number(e.target.value))}
              className="w-full accent-[#FFA4A4] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>300 Seats</span>
              <span>2,500 Seats</span>
              <span>5,000 Seats</span>
            </div>
          </div>

          {/* Slider 2: Average Tuition Fee */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/90">
                Average Institutional Tuition Fee (Per Student)
              </span>
              <span className="text-sm font-black text-[#BADFDB] font-mono">
                ₹{(avgTuition / 100000).toFixed(2)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={350000}
              step={10000}
              value={avgTuition}
              onChange={(e) => setAvgTuition(Number(e.target.value))}
              className="w-full accent-[#BADFDB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/40 font-mono">
              <span>₹1.00 Lakh</span>
              <span>₹2.25 Lakh</span>
              <span>₹3.50 Lakh</span>
            </div>
          </div>
        </div>

        {/* Right: Live Dynamic Projection Output (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#BADFDB] block">
              Projected Cohort Impact
            </span>

            {/* Metric 1: Treasury Disbursement */}
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs text-white/70 block">
                Upfront Institutional Treasury Inflow
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-5xl font-black text-white font-mono">
                  ₹{metrics.grossTreasuryDisbursementCrores} Cr
                </span>
                <span className="text-[11px] font-bold text-emerald-400">
                  0% Default Risk
                </span>
              </div>
              <p className="text-[11px] text-white/50 mt-1">
                Funded via approved education financing partners with direct upfront payout to university.
              </p>
            </div>

            {/* Sub Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase text-white/60 font-bold block">
                  Projected Verified Enrolments
                </span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  {metrics.estimatedEnrolled.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-[#FFA4A4] font-bold">~92% Capacity Fill</span>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-2xl p-3.5">
                <span className="text-[10px] uppercase text-white/60 font-bold block">
                  Saved Marketing Overhead
                </span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  ₹{metrics.savedCpaLakhs}L+
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">Reduced Dropout</span>
              </div>
            </div>

            {/* Institutional Compliance Badges */}
            <div className="space-y-2 pt-1 text-xs text-white/80 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#BADFDB] shrink-0" />
                <span>Zero broker friction: direct ERP integration with student registrar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFA4A4] shrink-0" />
                <span>Full UGC-DEB, AICTE, and NAAC disclosure adherence</span>
              </div>
            </div>

            {/* Direct Partner Action */}
            <div className="pt-2">
              <Link href="/partners" className="block">
                <button className="w-full py-3.5 bg-[#BADFDB] hover:bg-[#FFA4A4] text-[#14171A] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:scale-101">
                  <span>Explore Institutional Partnership Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
