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
    <div className="bg-white border border-[#14171A]/12 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-[0_16px_40px_-8px_rgba(20,23,26,0.08)]">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#BADFDB]/20 blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#14171A]/10 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFA4A4] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-[#14171A]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#14171A] tracking-tight flex items-center gap-2">
              Fee & Monthly EMI Calculator
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#BADFDB] text-[#14171A]">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-[#555E68] font-medium">
              Showing figures for: <span className="text-[#14171A] font-bold">{initialProgramName}</span>
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-[#555E68] hover:text-[#14171A] text-xs px-3 py-1.5 rounded-lg border border-[#14171A]/10 hover:border-[#14171A]/30 transition-colors font-medium"
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
            <span className="text-xs text-[#555E68] font-medium mr-1">Quick Presets:</span>
            <button
              onClick={() => { setCourseFee(196000); setCurrentCtc(450000); setTargetCtc(980000); setScholarshipPercent(40); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FCF9EA] hover:bg-[#FFA4A4]/40 text-[#14171A] border border-[#14171A]/10 font-medium transition-colors"
            >
              Online MBA
            </button>
            <button
              onClick={() => { setCourseFee(158000); setCurrentCtc(400000); setTargetCtc(840000); setScholarshipPercent(50); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FCF9EA] hover:bg-[#FFA4A4]/40 text-[#14171A] border border-[#14171A]/10 font-medium transition-colors"
            >
              Online MCA (Tech)
            </button>
            <button
              onClick={() => { setCourseFee(240000); setCurrentCtc(800000); setTargetCtc(1450000); setScholarshipPercent(50); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FCF9EA] hover:bg-[#FFA4A4]/40 text-[#14171A] border border-[#14171A]/10 font-medium transition-colors"
            >
              Executive 1-Year MBA
            </button>
          </div>

          {/* Slider 1: Total College Fee */}
          <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-[#555E68] font-bold">Standard College Fees</label>
              <span className="text-sm font-bold text-[#14171A]">{formatInr(courseFee)}</span>
            </div>
            <input
              type="range"
              min={75000}
              max={500000}
              step={5000}
              value={courseFee}
              onChange={(e) => setCourseFee(Number(e.target.value))}
              className="w-full accent-[#14171A] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#8A929B] font-mono mt-1">
              <span>₹75,000</span>
              <span>₹2.5 Lakhs</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>

          {/* Slider 2: Scholarship Discount */}
          <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-[#14171A] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#14171A]" />
                Institutional Scholarship Subsidy
              </label>
              <span className="text-sm font-black text-[#14171A]">{scholarshipPercent}% Grant</span>
            </div>
            <input
              type="range"
              min={0}
              max={75}
              step={5}
              value={scholarshipPercent}
              onChange={(e) => setScholarshipPercent(Number(e.target.value))}
              className="w-full accent-[#14171A] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#555E68] font-mono mt-1">
              <span>0% (Standard)</span>
              <span>40% (Average)</span>
              <span>75% (Merit Score)</span>
            </div>
          </div>

          {/* 2-Col: Salaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Salary */}
            <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-[#555E68] font-bold">Your Current Salary (Annual)</label>
                <span className="text-xs font-bold text-[#14171A]">{formatInr(currentCtc)}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={1500000}
                step={25000}
                value={currentCtc}
                onChange={(e) => setCurrentCtc(Number(e.target.value))}
                className="w-full accent-[#14171A] cursor-pointer"
              />
              <span className="text-[11px] text-[#8A929B] block mt-1">Per year before degree</span>
            </div>

            {/* Target Salary */}
            <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-[#555E68] font-bold">Expected Salary (Annual)</label>
                <span className="text-xs font-bold text-emerald-700">{formatInr(targetCtc)}</span>
              </div>
              <input
                type="range"
                min={400000}
                max={3000000}
                step={25000}
                value={targetCtc}
                onChange={(e) => setTargetCtc(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[11px] text-emerald-700 block mt-1 font-bold">
                +{salaryHikePercent}% Salary Increase
              </span>
            </div>
          </div>

          {/* EMI Tenure Select */}
          <div className="flex items-center justify-between text-xs text-[#555E68] pt-1">
            <span className="font-bold">Choose 0% Interest EMI Plan:</span>
            <div className="flex gap-2">
              {[12, 18, 24, 36].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenureMonths(t)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                    tenureMonths === t
                      ? "bg-[#14171A] text-[#FCF9EA] border-[#14171A]"
                      : "bg-[#FCF9EA] text-[#555E68] border-[#14171A]/10 hover:border-[#14171A]/30"
                  }`}
                >
                  {t} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Calculated Metrics Display (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs text-[#555E68] font-bold block mb-1">
                Final Fees You Pay (After Scholarship)
              </span>
              <div className="text-3xl font-black text-[#14171A] flex items-baseline gap-2">
                {formatInr(effectiveFee)}
                {scholarshipPercent > 0 && (
                  <span className="text-xs font-normal text-[#8A929B] line-through">
                    {formatInr(courseFee)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#14171A]/10">
              <div className="bg-white rounded-xl p-3 border border-[#14171A]/10">
                <span className="text-[11px] text-[#555E68] font-bold block mb-1">
                  Monthly EMI (0% Interest)
                </span>
                <span className="text-lg font-black text-[#14171A]">
                  {formatInr(monthlyEmi)}
                </span>
                <span className="text-[10px] text-[#8A929B] block mt-0.5">for {tenureMonths} months</span>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#14171A]/10">
                <span className="text-[11px] text-[#555E68] font-bold block mb-1">
                  Fees Recovered In
                </span>
                <span className="text-lg font-black text-emerald-700">
                  {paybackPeriodMonths} Months
                </span>
                <span className="text-[10px] text-[#8A929B] block mt-0.5">from salary hike</span>
              </div>
            </div>

            <div className="bg-white border border-emerald-600/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-700">Extra Earnings in 3 Years</span>
              </div>
              <div className="text-2xl font-black text-emerald-700">
                +{formatInr(threeYearNetGain)}
              </div>
              <p className="text-[11px] text-[#555E68] mt-1 leading-normal font-medium">
                Total extra money you earn in 3 years even after paying your full college fees.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button 
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/colleges";
                }
              }}
              className="w-full py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              Explore Colleges with {scholarshipPercent}% Scholarship
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
