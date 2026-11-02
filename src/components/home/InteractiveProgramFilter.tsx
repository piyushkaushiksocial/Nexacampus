"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Check, 
  Plus, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import { useCompare } from "@/context/CompareContext";
import { InteractiveTiltCard } from "@/components/motion/InteractiveTiltCard";
import { sound } from "@/lib/sound";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";

export function InteractiveProgramFilter() {
  const { addToCompare, removeFromCompare, isComparing } = useCompare();

  const [selectedDegree, setSelectedDegree] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");

  const [brochureProgram, setBrochureProgram] = useState<Program | null>(null);

  const degreeOptions = ["All", "MBA", "MCA", "BBA", "B.Tech"];
  const modeOptions = ["All", "Campus Full-time", "Flexible Learning", "Hybrid / Blended"];

  const filtered = useMemo(() => {
    return PROGRAMS_DATA.filter((p) => {
      const matchesDegree = 
        selectedDegree === "All" ||
        p.name.toLowerCase().includes(selectedDegree.toLowerCase()) ||
        p.degreeLevel.toLowerCase().includes(selectedDegree.toLowerCase());

      const matchesMode = selectedMode === "All" || p.mode === selectedMode;

      let matchesBudget = true;
      if (selectedBudget === "under_1_5") {
        matchesBudget = p.totalFee <= 150000;
      } else if (selectedBudget === "1_5_to_2_5") {
        matchesBudget = p.totalFee > 150000 && p.totalFee <= 250000;
      } else if (selectedBudget === "above_2_5") {
        matchesBudget = p.totalFee > 250000;
      }

      return matchesDegree && matchesMode && matchesBudget;
    });
  }, [selectedDegree, selectedMode, selectedBudget]);

  return (
    <div className="w-full space-y-6">
      
      {/* Real Interactive Filter Controls Bar */}
      <div className="bg-white border-2 border-[#14171A]/10 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Degree Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#555E68] mr-1.5">Degree:</span>
          {degreeOptions.map((deg) => (
            <button
              key={deg}
              onClick={() => {
                sound.tick();
                setSelectedDegree(deg);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDegree === deg
                  ? "bg-[#14171A] text-[#FCF9EA] shadow-xs"
                  : "bg-[#FCF9EA] text-[#555E68] hover:text-[#14171A] hover:bg-black/5"
              }`}
            >
              {deg}
            </button>
          ))}
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#555E68] mr-1.5">Mode:</span>
          {modeOptions.map((m) => (
            <button
              key={m}
              onClick={() => {
                sound.tick();
                setSelectedMode(m);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMode === m
                  ? "bg-[#BADFDB] text-[#14171A] shadow-xs"
                  : "bg-[#FCF9EA] text-[#555E68] hover:text-[#14171A] hover:bg-black/5"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Budget Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#555E68]">Fee:</span>
          <select
            value={selectedBudget}
            onChange={(e) => {
              sound.tick();
              setSelectedBudget(e.target.value);
            }}
            className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-2.5 py-1.5 text-xs text-[#14171A] font-bold focus:outline-none focus:ring-2 focus:ring-[#FFA4A4] cursor-pointer"
          >
            <option value="All">All Budgets</option>
            <option value="under_1_5">Under ₹1.5 Lakhs</option>
            <option value="1_5_to_2_5">₹1.5L – ₹2.5L</option>
            <option value="above_2_5">Above ₹2.5 Lakhs</option>
          </select>
        </div>

      </div>

      {/* Results Count & Comparison Hint */}
      <div className="flex items-center justify-between text-xs font-bold text-[#555E68] px-1">
        <span>Showing {filtered.length} matching degrees</span>
        <span className="text-[#14171A]">
          Select &quot;Compare&quot; on any card to evaluate 2 or 3 colleges side-by-side
        </span>
      </div>

      {/* Dynamic Animated Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((prog) => {
            const inCompare = isComparing(prog.id);

            return (
              <motion.div
                key={prog.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <InteractiveTiltCard className="flex flex-col justify-between overflow-hidden h-full">
                  {/* Card Cover Image */}
                  {prog.coverImage && (
                    <div className="relative h-44 w-full border-b border-[#14171A]/10 overflow-hidden">
                      <Image
                        src={prog.coverImage}
                        alt={prog.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[#14171A] shadow-xs">
                          {prog.mode}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.snap();
                            inCompare ? removeFromCompare(prog.id) : addToCompare(prog);
                          }}
                          className={`text-xs px-3 py-1 rounded-full border font-bold flex items-center gap-1 shadow-sm transition-all ${
                            inCompare
                              ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4]"
                              : "bg-white text-[#14171A] border-[#14171A]/10 hover:bg-[#BADFDB]"
                          }`}
                        >
                          {inCompare ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          {inCompare ? "Added" : "Compare"}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#BADFDB] text-[#14171A]">
                          {prog.accreditations.find((a) => a.includes("NAAC")) || prog.accreditations[0] || "NAAC A+"}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          UGC Entitled
                        </span>
                      </div>

                      <Link href={`/colleges/${prog.id}`} className="block">
                        <h3 className="text-base font-bold text-[#14171A] hover:text-[#FFA4A4] transition-colors mb-1 leading-snug">
                          {prog.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#555E68] mb-4 font-medium">{prog.university}</p>

                      {/* Stats Bento */}
                      <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl p-3 mb-4 space-y-1.5 text-xs">
                        <div className="flex justify-between text-[#555E68]">
                          <span>Total Fees:</span>
                          <span className="font-bold text-[#14171A]">₹{(prog.totalFee / 100000).toFixed(2)} Lakhs</span>
                        </div>
                        <div className="flex justify-between text-[#555E68]">
                          <span>0% EMI:</span>
                          <span className="font-bold text-[#14171A]">From ₹{prog.emiStartsAt}/mo</span>
                        </div>
                        <div className="flex justify-between text-[#555E68] border-t border-[#14171A]/10 pt-1.5">
                          <span>Avg Placement:</span>
                          <span className="font-bold text-emerald-700">{prog.avgPlacementCtc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-[#14171A]/10">
                      <Link href={`/colleges/${prog.id}`} className="block">
                        <button className="w-full py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm">
                          <span>View Syllabus & Placements</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.tick();
                          setBrochureProgram(prog);
                        }}
                        className="w-full py-2 bg-[#FCF9EA] hover:bg-white border border-[#14171A]/10 text-[#14171A] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-[#14171A]" />
                        Download 2026 Prospectus
                      </button>
                    </div>
                  </div>
                </InteractiveTiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Brochure Modal */}
      {brochureProgram && (
        <LeadCaptureModal
          isOpen={Boolean(brochureProgram)}
          onClose={() => setBrochureProgram(null)}
          title={`Download ${brochureProgram.name} Prospectus`}
          subtitle={`We will send the official 2026 fee schedule, semester syllabus, and admissions checklist for ${brochureProgram.university} to your WhatsApp.`}
          prefilledCourse={brochureProgram.name}
          prefilledUniversity={brochureProgram.university}
          source="Interactive Program Filter"
        />
      )}

    </div>
  );
}
