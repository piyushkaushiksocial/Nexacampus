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
import { sound } from "@/lib/sound";

export default function ComparePage() {
  const { selectedPrograms, removeFromCompare, addToCompare, clearCompare } = useCompare();
  const [activeCalculatorProgram, setActiveCalculatorProgram] = useState<Program | null>(null);
  const [counselingTarget, setCounselingTarget] = useState<string | null>(null);

  const availableToAdd = PROGRAMS_DATA.filter(
    (p) => !selectedPrograms.some((sp) => sp.id === p.id)
  );

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] pt-16">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#14171A]/10 pb-8 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3 py-1 rounded-full border border-[#14171A]/10 mb-2 inline-block">
              Comparison Matrix
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#14171A]">
              Compare Colleges Side-by-Side
            </h1>
            <p className="text-[#555E68] text-base mt-2 max-w-2xl font-medium">
              Compare fees, no-cost monthly EMI, average salary packages, and Govt (UGC/NAAC) approvals so you make the right choice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedPrograms.length > 0 && (
              <button
                onClick={() => {
                  sound.tick();
                  clearCompare();
                }}
                className="text-xs text-[#555E68] hover:text-[#14171A] px-3.5 py-2 rounded-xl border border-[#14171A]/10 hover:border-[#14171A]/30 transition-colors font-bold"
              >
                Clear All
              </button>
            )}
            <Link href="/colleges">
              <button className="text-xs font-bold bg-white hover:bg-[#BADFDB] text-[#14171A] px-4 py-2.5 rounded-xl border border-[#14171A]/10 transition-colors shadow-xs">
                ← Browse All Courses
              </button>
            </Link>
          </div>
        </div>

        {/* UGC Gazette Parity & Anti-Spam Trust Ribbon */}
        <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <span className="font-bold text-[#14171A] block">100% Legal Degree Parity (UGC Gazette Notification No. F. 1-24/2021)</span>
              <span className="text-[#555E68] text-[11px]">All partner degrees are legally equivalent to on-campus degrees for UPSC, SSC, PSCs, PSU bank exams, and international WES credential evaluations.</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#14171A]/10 text-[10px] font-mono font-bold text-[#14171A] shrink-0">
            Government Gazette Protected
          </span>
        </div>

        {/* Empty State */}
        {selectedPrograms.length === 0 ? (
          <div className="bg-white border border-[#14171A]/12 rounded-3xl p-12 text-center max-w-2xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#BADFDB] flex items-center justify-center mx-auto mb-6 text-[#14171A]">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#14171A] mb-2">No courses selected to compare yet</h2>
            <p className="text-[#555E68] text-sm mb-8 font-medium">
              Click &quot;+ Add&quot; on any of the popular courses below to compare them side-by-side:
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {PROGRAMS_DATA.slice(0, 3).map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => {
                    sound.snap();
                    addToCompare(prog);
                  }}
                  className="px-4 py-2 bg-[#FCF9EA] hover:bg-[#FFA4A4] border border-[#14171A]/10 rounded-xl text-xs text-[#14171A] font-bold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#14171A]" />
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
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#555E68]">Metrics</span>
                  <span className="text-base font-black text-[#14171A] mt-1">What We Compare</span>
                </div>

                {/* Programs Columns (up to 3) */}
                {selectedPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="col-span-3 bg-white border border-[#14171A]/12 rounded-2xl p-5 flex flex-col justify-between relative group hover:border-[#FFA4A4] transition-colors shadow-xs"
                  >
                    <button
                      onClick={() => {
                        sound.tick();
                        removeFromCompare(prog.id);
                      }}
                      className="absolute top-3 right-3 text-[#8A929B] hover:text-red-500 p-1 rounded-lg hover:bg-[#FCF9EA] transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <span className="text-[11px] font-bold text-[#14171A] bg-[#BADFDB]/50 px-2 py-0.5 rounded mb-2 inline-block">
                        {prog.degreeLevel} • {prog.mode}
                      </span>
                      <h3 className="text-base font-bold text-[#14171A] leading-tight mb-1">
                        {prog.name}
                      </h3>
                      <p className="text-xs text-[#555E68] font-medium">{prog.university}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#14171A]/10 flex items-center justify-between text-xs">
                      <span className="font-black text-[#14171A]">
                        ₹{(prog.totalFee / 100000).toFixed(2)} Lakhs
                      </span>
                      <button
                        onClick={() => {
                          sound.snap();
                          setActiveCalculatorProgram(prog);
                        }}
                        className="text-[#14171A] font-bold hover:underline flex items-center gap-1"
                      >
                        <Calculator className="w-3 h-3" />
                        EMI Calc
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add column slot if < 3 */}
                {selectedPrograms.length < 3 && (
                  <div className="col-span-3 bg-white/60 border border-dashed border-[#14171A]/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[#BADFDB] flex items-center justify-center text-[#14171A] mb-2 font-bold">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#14171A] mb-2">Add Another Course</span>
                    
                    <div className="w-full space-y-1.5 mt-2">
                      {availableToAdd.slice(0, 2).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            sound.snap();
                            addToCompare(item);
                          }}
                          className="w-full text-left text-xs text-[#14171A] font-medium hover:font-bold px-2.5 py-1.5 rounded-lg bg-white border border-[#14171A]/10 truncate transition-colors shadow-2xs"
                        >
                          + {item.shortName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 0: OPINIONATED VERDICT & BEST FIT */}
              <div className="mb-8">
                <div className="bg-[#FFA4A4]/40 border border-[#FFA4A4] rounded-xl px-4 py-2.5 mb-2 text-xs font-bold text-[#14171A] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#14171A]" />
                  Nexa Editorial Verdict: Who Is Each Program Best For?
                </div>

                <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs font-medium">
                  <div className="col-span-3 text-[#555E68] font-bold">
                    <span>Strategic Verdict</span>
                    <p className="text-[10px] text-[#8A929B] font-normal mt-0.5">Based on corporate hiring and curriculum focus</p>
                  </div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl p-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-[#BADFDB] px-2 py-0.5 rounded block w-fit mb-1.5">
                        Recommended For
                      </span>
                      <p className="text-xs font-bold text-[#14171A] leading-relaxed">
                        {prog.bestFor}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 1: GOVT RECOGNITION & APPROVALS */}
              <div className="mb-8">
                <div className="bg-[#BADFDB]/40 border border-[#BADFDB] rounded-xl px-4 py-2.5 mb-2 text-xs font-bold text-[#14171A] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#14171A]" />
                  Government Approvals & UGC Accreditation
                </div>

                <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs font-medium">
                  <div className="col-span-3 text-[#555E68] font-bold">Accreditations</div>
                  {selectedPrograms.map((prog) => (
                    <div key={prog.id} className="col-span-3 space-y-1">
                      {prog.accreditations.map((acc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[#14171A] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{acc}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: FEES & EMI */}
              <div className="mb-8">
                <div className="bg-[#FFA4A4]/40 border border-[#FFA4A4] rounded-xl px-4 py-2.5 mb-2 text-xs font-bold text-[#14171A] uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#14171A]" />
                  Fee Structure & 0% EMI Breakdown
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs">
                    <div className="col-span-3 text-[#555E68] font-bold">Total Course Fee</div>
                    {selectedPrograms.map((prog) => (
                      <div key={prog.id} className="col-span-3 font-black text-sm text-[#14171A]">
                        ₹{prog.totalFee.toLocaleString("en-IN")}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs">
                    <div className="col-span-3 text-[#555E68] font-bold">0% Interest Monthly EMI</div>
                    {selectedPrograms.map((prog) => (
                      <div key={prog.id} className="col-span-3 font-bold text-[#14171A]">
                        ₹{prog.emiStartsAt}/month
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: PLACEMENTS */}
              <div className="mb-8">
                <div className="bg-[#BADFDB]/40 border border-[#BADFDB] rounded-xl px-4 py-2.5 mb-2 text-xs font-bold text-[#14171A] uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#14171A]" />
                  Average & Highest Placement Salaries
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs">
                    <div className="col-span-3 text-[#555E68] font-bold">Average CTC</div>
                    {selectedPrograms.map((prog) => (
                      <div key={prog.id} className="col-span-3 font-black text-sm text-emerald-700">
                        {prog.avgPlacementCtc}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-4 text-xs">
                    <div className="col-span-3 text-[#555E68] font-bold">Highest CTC Offered</div>
                    {selectedPrograms.map((prog) => (
                      <div key={prog.id} className="col-span-3 font-black text-sm text-[#14171A]">
                        {prog.highestCtc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Matrix Actions */}
              <div className="grid grid-cols-12 gap-4 pt-4">
                <div className="col-span-3" />
                {selectedPrograms.map((prog) => (
                  <div key={prog.id} className="col-span-3 space-y-2">
                    <Link href={`/colleges/${prog.id}`} className="block">
                      <button className="w-full py-2.5 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Embedded Live Calculator Modal */}
      {activeCalculatorProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14171A]/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <RoiCalculator
              initialFee={activeCalculatorProgram.totalFee}
              initialProgramName={activeCalculatorProgram.name}
              onClose={() => setActiveCalculatorProgram(null)}
            />
          </div>
        </div>
      )}

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
