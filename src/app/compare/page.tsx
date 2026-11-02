"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCompare } from "@/context/CompareContext";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import { 
  Scale, 
  X, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Building, 
  ArrowRight, 
  Calculator,
  PhoneCall,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";

export default function ComparePage() {
  const { selectedPrograms, removeFromCompare, addToCompare, clearCompare } = useCompare();
  const [activeCalculatorProgram, setActiveCalculatorProgram] = useState<Program | null>(null);
  const [counselingTarget, setCounselingTarget] = useState<string | null>(null);

  const availableToAdd = PROGRAMS_DATA.filter(
    (p) => !selectedPrograms.some((sp) => sp.id === p.id)
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16">
      <Header />

      {/* Subtle overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-8 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
              Comparison Tool
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Compare Colleges Side-by-Side
            </h1>
            <p className="text-white/60 text-base mt-2 max-w-2xl font-normal">
              Compare fees, no-cost monthly EMI, average salary packages, and Govt (UGC/NAAC) approvals so you make the right choice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedPrograms.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-white/60 hover:text-white px-3 py-2 rounded-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                Clear All
              </button>
            )}
            <Link href="/colleges">
              <button className="text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl border border-white/15 transition-colors">
                ← Browse All Courses
              </button>
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {selectedPrograms.length === 0 ? (
          <div className="bg-[#121212] border border-white/15 rounded-3xl p-12 text-center max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-[#FFE15D]">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">No courses selected to compare yet</h2>
            <p className="text-white/60 text-sm mb-8">
              Click &quot;+ Add&quot; on any of the popular courses below to compare them side-by-side:
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {PROGRAMS_DATA.slice(0, 3).map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => addToCompare(prog)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FFE15D]" />
                  Add {prog.shortName}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[760px]">
              
              {/* Matrix Columns Header */}
              <div className="grid grid-cols-12 gap-4 items-stretch mb-6">
                
                {/* Metric label placeholder col (3 cols) */}
                <div className="col-span-3 flex flex-col justify-end p-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50">Details</span>
                  <span className="text-base font-semibold text-white mt-1">What We Compare</span>
                </div>

                {/* Programs Columns (up to 3) */}
                {selectedPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="col-span-3 bg-[#121212] border border-white/20 rounded-2xl p-5 flex flex-col justify-between relative group hover:border-[#FFE15D]/60 transition-colors shadow-lg"
                  >
                    <button
                      onClick={() => removeFromCompare(prog.id)}
                      className="absolute top-3 right-3 text-white/40 hover:text-red-400 p-1 rounded-lg hover:bg-white/10 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <span className="text-[11px] font-medium text-[#FFE15D] mb-1 block">
                        {prog.degreeLevel} • {prog.mode}
                      </span>
                      <h3 className="text-base font-semibold text-white leading-tight mb-1">
                        {prog.name}
                      </h3>
                      <p className="text-xs text-white/60">{prog.university}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        ₹{(prog.totalFee / 100000).toFixed(2)} Lakhs
                      </span>
                      <button
                        onClick={() => setActiveCalculatorProgram(prog)}
                        className="text-[#FFE15D] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Calculator className="w-3 h-3" />
                        EMI Calc
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add column slot if < 3 */}
                {selectedPrograms.length < 3 && (
                  <div className="col-span-3 bg-white/[0.02] border border-dashed border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 mb-2">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-white/80 mb-2">Add Another Course</span>
                    
                    <div className="w-full space-y-1.5 mt-2">
                      {availableToAdd.slice(0, 2).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addToCompare(item)}
                          className="w-full text-left text-xs text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 truncate transition-colors"
                        >
                          + {item.shortName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 1: GOVT RECOGNITION & APPROVALS */}
              <div className="mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-2 text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FFE15D]" />
                  Govt Approvals & University Ratings
                </div>

                {/* Row: Regulatory Approvals */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Govt Approvals</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 text-xs text-white flex flex-wrap gap-1.5 pl-2">
                      {prog.accreditations.map((acc, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[11px]">
                          {acc}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Row: NIRF / Ranking */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">National Ranking</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 text-xs font-semibold text-[#FFE15D] pl-2">
                      {prog.nirfRank || "Govt Recognized University"}
                    </div>
                  ))}
                </div>

                {/* Row: Examination Mode */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Exam Format</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 text-xs text-white pl-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                        {prog.examMode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: FEES, NO-COST EMI & SCHOLARSHIPS */}
              <div className="mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-2 text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  College Fees & Monthly EMI Options
                </div>

                {/* Row: Total Course Fee */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Total Fees</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2">
                      <div className="text-sm font-semibold text-white">
                        ₹{prog.totalFee.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[11px] text-white/50 block">₹{prog.semesterFee.toLocaleString("en-IN")} per semester</span>
                    </div>
                  ))}
                </div>

                {/* Row: 0% EMI Option */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">No-Cost EMI (per month)</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2">
                      <span className="text-xs font-bold text-[#FFE15D]">
                        From ₹{prog.emiStartsAt.toLocaleString("en-IN")} / month
                      </span>
                      <span className="text-[10px] text-white/50 block">0% interest loan available</span>
                    </div>
                  ))}
                </div>

                {/* Row: Scholarship Quota */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Scholarship Discount</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFE15D]/10 border border-[#FFE15D]/30 text-xs font-semibold text-[#FFE15D]">
                        <Sparkles className="w-3.5 h-3.5" />
                        {prog.nebsaScholarship.maxWaiver} Fee Waiver
                      </div>
                      <span className="text-[11px] text-red-400 block mt-1 font-medium">
                        Only {prog.nebsaScholarship.seatsRemaining} scholarship seats open
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: PLACEMENTS & AVERAGE SALARIES */}
              <div className="mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-2 text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-400" />
                  Placements & Average Salary
                </div>

                {/* Row: Average Package */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Average Salary (CTC)</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2 text-sm font-semibold text-white">
                      {prog.avgPlacementCtc}
                    </div>
                  ))}
                </div>

                {/* Row: Highest Package */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Highest Salary Offered</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2 text-sm font-bold text-emerald-400">
                      {prog.highestCtc}
                    </div>
                  ))}
                </div>

                {/* Row: Key Recruiters */}
                <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 items-center">
                  <div className="col-span-3 text-xs text-white/60 pl-4 font-medium">Top Hiring Companies</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 pl-2 flex flex-wrap gap-1">
                      {prog.topRecruiters.map((r, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-white/80">
                          {r}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: ACTIONS */}
              <div className="grid grid-cols-12 gap-4 pt-6 border-t border-white/10">
                <div className="col-span-3 text-xs text-white/50 pl-4 self-center font-medium">
                  Next Steps
                </div>
                {selectedPrograms.map((prog) => (
                  <div key={prog.id} className="col-span-3 pl-2 space-y-2">
                    <Link href="/exam/diagnostic">
                      <button className="w-full py-3 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Apply with {prog.nebsaScholarship.maxWaiver} Scholarship
                      </button>
                    </Link>

                    <button
                      onClick={() => setCounselingTarget(prog.name)}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      Talk to Counselor (Free)
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Dedicated ROI Calculator Section on page */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Fee & Monthly EMI Calculator</h2>
            <p className="text-white/60 text-sm mt-1">Move the sliders to see how your new salary will pay off your course fees.</p>
          </div>
          <RoiCalculator 
            initialFee={selectedPrograms[0]?.totalFee || 196000} 
            initialProgramName={selectedPrograms[0]?.shortName || "Selected Course"} 
          />
        </div>

      </main>

      {/* Counseling Drawer */}
      <CounselingDrawer
        isOpen={Boolean(counselingTarget)}
        onClose={() => setCounselingTarget(null)}
        defaultProgramName={counselingTarget || undefined}
      />

      <Footer />
    </div>
  );
}
