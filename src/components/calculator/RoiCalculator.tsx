"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

interface RoiCalculatorProps {
  initialFee?: number;
  initialProgramName?: string;
  onClose?: () => void;
}

export function RoiCalculator({ initialFee = 196000, initialProgramName = "Online MBA", onClose }: RoiCalculatorProps) {
  const [courseFee, setCourseFee] = useState<number>(initialFee);
  const [currentCtc, setCurrentCtc] = useState<number>(450000);
  const [targetCtc, setTargetCtc] = useState<number>(920000);
  const [tenureMonths, setTenureMonths] = useState<number>(24);
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(40);

  // Calcs
  const effectiveFee = useMemo(() => {
    return Math.round(courseFee * (1 - scholarshipPercent / 100));
  }, [courseFee, scholarshipPercent]);

  const monthlyEmi = useMemo(() => {
    return Math.round(effectiveFee / tenureMonths);
  }, [effectiveFee, tenureMonths]);

  const annualSalaryDelta = useMemo(() => {
    return Math.max(0, targetCtc - currentCtc);
  }, [targetCtc, currentCtc]);

  const salaryHikePercent = useMemo(() => {
    if (currentCtc === 0) return 100;
    return Math.round(((targetCtc - currentCtc) / currentCtc) * 100);
  }, [targetCtc, currentCtc]);

  const paybackPeriodMonths = useMemo(() => {
    if (annualSalaryDelta <= 0) return 0;
    const monthlyDelta = annualSalaryDelta / 12;
    return Number((effectiveFee / monthlyDelta).toFixed(1));
  }, [effectiveFee, annualSalaryDelta]);

  const threeYearNetGain = useMemo(() => {
    return (annualSalaryDelta * 3) - effectiveFee;
  }, [annualSalaryDelta, effectiveFee]);

  const formatInr = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  return (
    <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFE15D]/5 blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFE15D]/15 border border-[#FFE15D]/30 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-[#FFE15D]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
              Fee & Monthly EMI Calculator
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-white/60">
              Showing figures for: <span className="text-white font-medium">{initialProgramName}</span>
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/30 transition-colors"
          >
            Close
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/50 mr-1">Quick Examples:</span>
            <button
              onClick={() => { setCourseFee(196000); setCurrentCtc(450000); setTargetCtc(980000); setScholarshipPercent(40); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 transition-colors"
            >
              Online MBA
            </button>
            <button
              onClick={() => { setCourseFee(158000); setCurrentCtc(400000); setTargetCtc(840000); setScholarshipPercent(50); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 transition-colors"
            >
              Online MCA (Tech)
            </button>
            <button
              onClick={() => { setCourseFee(240000); setCurrentCtc(800000); setTargetCtc(1450000); setScholarshipPercent(50); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 transition-colors"
            >
              Executive 1-Year MBA
            </button>
          </div>

          {/* Slider 1: Total College Fee */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-white/70 font-medium">Standard College Fees</label>
              <span className="text-sm font-semibold text-white">{formatInr(courseFee)}</span>
            </div>
            <input
              type="range"
              min={75000}
              max={500000}
              step={5000}
              value={courseFee}
              onChange={(e) => setCourseFee(Number(e.target.value))}
              className="w-full accent-[#FFE15D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>₹75,000</span>
              <span>₹2.5 Lakhs</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          {/* Slider 2: Scholarship Discount */}
          <div className="bg-[#FFE15D]/5 border border-[#FFE15D]/25 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-[#FFE15D] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Scholarship Discount on Fees
              </label>
              <span className="text-sm font-bold text-[#FFE15D]">{scholarshipPercent}% Scholarship</span>
            </div>
            <input
              type="range"
              min={0}
              max={75}
              step={5}
              value={scholarshipPercent}
              onChange={(e) => setScholarshipPercent(Number(e.target.value))}
              className="w-full accent-[#FFE15D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-white/50 mt-1">
              <span>0% (Standard)</span>
              <span>40% (Average)</span>
              <span>75% (Merit Score)</span>
            </div>
          </div>

          {/* 2-Col: Salaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Salary */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/70 font-medium">Your Current Salary (Annual)</label>
                <span className="text-xs font-semibold text-white">{formatInr(currentCtc)}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={1500000}
                step={25000}
                value={currentCtc}
                onChange={(e) => setCurrentCtc(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
              <span className="text-[11px] text-white/40 block mt-1">Per year before degree</span>
            </div>

            {/* Target Salary */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/70 font-medium">Expected Salary (Annual)</label>
                <span className="text-xs font-semibold text-emerald-400">{formatInr(targetCtc)}</span>
              </div>
              <input
                type="range"
                min={400000}
                max={3000000}
                step={25000}
                value={targetCtc}
                onChange={(e) => setTargetCtc(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[11px] text-emerald-400 block mt-1 font-medium">
                +{salaryHikePercent}% Salary Increase
              </span>
            </div>
          </div>

          {/* EMI Tenure Select */}
          <div className="flex items-center justify-between text-xs text-white/70 pt-1">
            <span>Choose 0% Interest EMI Plan:</span>
            <div className="flex gap-2">
              {[12, 18, 24, 36].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenureMonths(t)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    tenureMonths === t
                      ? "bg-white text-black border-white font-bold"
                      : "bg-white/5 text-white/70 border-white/15 hover:border-white/30"
                  }`}
                >
                  {t} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Calculated Metrics Display (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/70 border border-white/15 rounded-2xl p-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs text-white/50 block mb-1">
                Final Fees You Pay (After Scholarship)
              </span>
              <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                {formatInr(effectiveFee)}
                {scholarshipPercent > 0 && (
                  <span className="text-xs font-normal text-white/40 line-through">
                    {formatInr(courseFee)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[11px] text-white/60 block mb-1">
                  Monthly EMI (0% Interest)
                </span>
                <span className="text-lg font-bold text-[#FFE15D]">
                  {formatInr(monthlyEmi)}
                </span>
                <span className="text-[10px] text-white/40 block mt-0.5">for {tenureMonths} months</span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-[11px] text-white/60 block mb-1">
                  Fees Recovered In
                </span>
                <span className="text-lg font-bold text-emerald-400">
                  {paybackPeriodMonths} Months
                </span>
                <span className="text-[10px] text-white/40 block mt-0.5">from salary hike</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">Extra Earnings in 3 Years</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                +{formatInr(threeYearNetGain)}
              </div>
              <p className="text-[11px] text-emerald-300/80 mt-1 leading-normal">
                Total extra money you earn in 3 years even after paying your full college fees.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Link href="/exam/diagnostic">
              <button className="w-full py-3.5 bg-[#FFE15D] text-black font-semibold text-xs tracking-wide rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Apply for {scholarshipPercent}% Scholarship (Free Quiz)
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
