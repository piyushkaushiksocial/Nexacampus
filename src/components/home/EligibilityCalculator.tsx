"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  Percent, 
  ChevronRight,
  ShieldCheck,
  Send
} from "lucide-react";
import { sound } from "@/lib/sound";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";

interface MatchedUniversity {
  name: string;
  campus: string;
  naac: string;
  course: string;
  baseFee: number;
  waiverPercent: number;
  mode: string;
}

export function EligibilityCalculator() {
  const [degree, setDegree] = useState<"MBA" | "MCA" | "BBA" | "B.Tech">("MBA");
  const [profile, setProfile] = useState<"graduate" | "working_1_3" | "working_3_plus" | "twelfth">("graduate");
  const [percentage, setPercentage] = useState<number>(72);
  const [modePreference, setModePreference] = useState<"all" | "campus" | "flexible">("all");
  
  // Lead form modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<{ uni: string; course: string; waiver: string } | null>(null);

  // Live dynamic calculation based on real inputs
  const calculation = useMemo(() => {
    let waiverPct = 0;
    let tier = "Standard Admission";
    let tierColor = "bg-[#FCF9EA] text-[#14171A]";
    let matchProbability = 70;

    // Academic merit
    if (percentage >= 85) {
      waiverPct += 25;
      matchProbability += 25;
      tier = "Platinum Merit Quota";
      tierColor = "bg-[#BADFDB] text-[#14171A]";
    } else if (percentage >= 75) {
      waiverPct += 15;
      matchProbability += 18;
      tier = "Gold Scholar Quota";
      tierColor = "bg-[#FFA4A4] text-[#14171A]";
    } else if (percentage >= 60) {
      waiverPct += 10;
      matchProbability += 10;
      tier = "Silver Academic Quota";
      tierColor = "bg-[#BADFDB]/60 text-[#14171A]";
    }

    // Professional bonus for MBA/MCA
    if ((degree === "MBA" || degree === "MCA") && (profile === "working_1_3" || profile === "working_3_plus")) {
      waiverPct += 5;
      matchProbability = Math.min(matchProbability + 5, 98);
    }

    // Universities matching the chosen degree
    const matchedUnis: MatchedUniversity[] = [];

    if (degree === "MBA") {
      matchedUnis.push({
        name: "NMIMS Global Access",
        campus: "Mumbai (West)",
        naac: "A++ (3.59)",
        course: "MBA (Dual Specialization)",
        baseFee: 196000,
        waiverPercent: waiverPct,
        mode: "Campus & Flexible Executive",
      });
      matchedUnis.push({
        name: "Manipal University (MUJ)",
        campus: "Jaipur (North)",
        naac: "A+ (3.28)",
        course: "MBA (FinTech & Analytics)",
        baseFee: 175000,
        waiverPercent: Math.max(waiverPct - 2, 5),
        mode: "Flexible Learning",
      });
      matchedUnis.push({
        name: "Amity University",
        campus: "Noida NCR (North)",
        naac: "A+ (3.27)",
        course: "MBA (Marketing & Global Sales)",
        baseFee: 199000,
        waiverPercent: waiverPct,
        mode: "Campus Full-time & Hybrid",
      });
    } else if (degree === "MCA") {
      matchedUnis.push({
        name: "Manipal University (MUJ)",
        campus: "Jaipur (North)",
        naac: "A+ (3.28)",
        course: "MCA (Cloud & Applied AI)",
        baseFee: 158000,
        waiverPercent: waiverPct,
        mode: "Flexible Learning",
      });
      matchedUnis.push({
        name: "Jain University",
        campus: "Bangalore (South)",
        naac: "A++ (3.71)",
        course: "MCA (Full Stack & DevOps)",
        baseFee: 140000,
        waiverPercent: waiverPct,
        mode: "Flexible Learning",
      });
    } else if (degree === "BBA") {
      matchedUnis.push({
        name: "Amity University",
        campus: "Noida NCR (North)",
        naac: "A+ (3.27)",
        course: "BBA (Entrepreneurship)",
        baseFee: 165000,
        waiverPercent: waiverPct,
        mode: "Campus Full-time & Hybrid",
      });
      matchedUnis.push({
        name: "Jain University",
        campus: "Bangalore (South)",
        naac: "A++ (3.71)",
        course: "BBA (Digital Marketing)",
        baseFee: 135000,
        waiverPercent: waiverPct,
        mode: "Campus & Flexible",
      });
    } else {
      matchedUnis.push({
        name: "Shivalik College of Engineering",
        campus: "Dehradun (North)",
        naac: "A+ (AICTE)",
        course: "B.Tech Civil & Infrastructure",
        baseFee: 310000,
        waiverPercent: waiverPct,
        mode: "Campus Full-Time",
      });
      matchedUnis.push({
        name: "DPU Institute of Technology",
        campus: "Pune (West)",
        naac: "A++ (3.62)",
        course: "B.Tech Computer Engineering",
        baseFee: 345000,
        waiverPercent: Math.max(waiverPct - 5, 5),
        mode: "Campus Full-Time",
      });
    }

    return {
      waiverPct,
      tier,
      tierColor,
      matchProbability: Math.min(matchProbability, 98),
      matchedUnis,
    };
  }, [degree, profile, percentage]);

  const handleOpenClaim = (uni: MatchedUniversity) => {
    sound.snap();
    const waiverAmount = Math.round((uni.baseFee * uni.waiverPercent) / 100);
    setSelectedMatch({
      uni: uni.name,
      course: uni.course,
      waiver: `₹${waiverAmount.toLocaleString("en-IN")} (${uni.waiverPercent}% Waiver)`,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-white border-2 border-[#14171A]/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(20,23,26,0.08)]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#14171A] bg-[#BADFDB] px-3 py-1 rounded-full border border-[#14171A]/10 inline-block mb-2">
              Instant Eligibility & Waiver Check
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#14171A] tracking-tight">
              Calculate Your Match & Scholarship
            </h3>
            <p className="text-xs sm:text-sm text-[#555E68] mt-1 font-medium">
              Adjust your target degree and marks. The system instantly recalculates your admission clearance probability and institutional fee waiver across partner campuses.
            </p>
          </div>

          {/* Input 1: Target Degree */}
          <div>
            <label className="text-xs font-bold text-[#14171A] block mb-2">
              1. Select Target Degree
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["MBA", "MCA", "BBA", "B.Tech"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    sound.tick();
                    setDegree(d);
                    if (d === "BBA" || d === "B.Tech") {
                      setProfile("twelfth");
                    } else if (profile === "twelfth") {
                      setProfile("graduate");
                    }
                  }}
                  className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    degree === d
                      ? "bg-[#14171A] text-[#FCF9EA] border-[#14171A] shadow-xs"
                      : "bg-[#FCF9EA] hover:bg-white text-[#555E68] border-[#14171A]/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Input 2: Current Background */}
          <div>
            <label className="text-xs font-bold text-[#14171A] block mb-2">
              2. Your Background
            </label>
            <div className="grid grid-cols-1 gap-2">
              {degree === "BBA" || degree === "B.Tech" ? (
                <button
                  onClick={() => { sound.tick(); setProfile("twelfth"); }}
                  className="py-2.5 px-3 rounded-xl font-bold text-xs border text-left bg-[#BADFDB]/50 border-[#BADFDB] text-[#14171A]"
                >
                  12th Standard / Higher Secondary Graduate
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { sound.tick(); setProfile("graduate"); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border text-left transition-all flex items-center justify-between ${
                      profile === "graduate"
                        ? "bg-[#BADFDB]/50 border-[#BADFDB] text-[#14171A]"
                        : "bg-[#FCF9EA] hover:bg-white text-[#555E68] border-[#14171A]/10"
                    }`}
                  >
                    <span>Bachelor&apos;s Graduate (Any Stream)</span>
                    {profile === "graduate" && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  </button>

                  <button
                    onClick={() => { sound.tick(); setProfile("working_1_3"); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border text-left transition-all flex items-center justify-between ${
                      profile === "working_1_3"
                        ? "bg-[#BADFDB]/50 border-[#BADFDB] text-[#14171A]"
                        : "bg-[#FCF9EA] hover:bg-white text-[#555E68] border-[#14171A]/10"
                    }`}
                  >
                    <span>Working Professional (1 to 3 Years Experience)</span>
                    {profile === "working_1_3" && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  </button>

                  <button
                    onClick={() => { sound.tick(); setProfile("working_3_plus"); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border text-left transition-all flex items-center justify-between ${
                      profile === "working_3_plus"
                        ? "bg-[#BADFDB]/50 border-[#BADFDB] text-[#14171A]"
                        : "bg-[#FCF9EA] hover:bg-white text-[#555E68] border-[#14171A]/10"
                    }`}
                  >
                    <span>Mid-Senior Professional (3+ Years Experience)</span>
                    {profile === "working_3_plus" && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Input 3: Academic Score Slider */}
          <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#14171A]">
                3. Qualifying Exam Score / Graduation %
              </span>
              <span className="text-base font-black text-[#14171A] font-mono px-2 py-0.5 rounded bg-white border border-[#14171A]/10">
                {percentage}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={95}
              step={1}
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full accent-[#14171A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#555E68] font-bold mt-1">
              <span>50% (Passing)</span>
              <span>70% (First Class)</span>
              <span>85%+ (Distinction)</span>
            </div>
          </div>
        </div>

        {/* Right Output: Live Calculated Probability & Matched Campuses (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Live Meter Card */}
          <div className="bg-[#FCF9EA] border-2 border-[#14171A]/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E68] block">
                  Admission Probability Score
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-[#14171A] font-mono">
                    {calculation.matchProbability}%
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    High Clearance Chance
                  </span>
                </div>
                {/* Visual dynamic bar */}
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden mt-3 border border-[#14171A]/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#BADFDB] via-[#FFA4A4] to-[#14171A]"
                    initial={{ width: 0 }}
                    animate={{ width: `${calculation.matchProbability}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="sm:border-l sm:border-[#14171A]/10 sm:pl-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E68] block">
                  Unlocked Institutional Quota
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${calculation.tierColor}`}>
                  {calculation.tier}
                </span>
                <div className="text-sm font-bold text-[#14171A] pt-1">
                  {calculation.waiverPct > 0 ? (
                    <span className="text-emerald-700 font-black">
                      {calculation.waiverPct}% Fee Waiver Unlocked
                    </span>
                  ) : (
                    <span>Direct Admission Qualified</span>
                  )}
                </div>
                <p className="text-[11px] text-[#555E68]">
                  Verified under direct institutional partnership allocation.
                </p>
              </div>
            </div>
          </div>

          {/* Matched Universities List */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-[#14171A] uppercase tracking-wider">
                Matching Partner Campuses ({calculation.matchedUnis.length} Qualified)
              </span>
              <span className="text-[11px] text-[#555E68] font-medium">
                Official 2026 Academic Seats
              </span>
            </div>

            <div className="space-y-3">
              {calculation.matchedUnis.map((uni) => {
                const discount = Math.round((uni.baseFee * uni.waiverPercent) / 100);
                const finalFee = uni.baseFee - discount;
                const monthlyEmi = Math.round(finalFee / 24);

                return (
                  <motion.div
                    key={uni.name + uni.course}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-[#14171A]/10 hover:border-[#14171A]/30 rounded-2xl p-4 sm:p-5 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#BADFDB] text-[#14171A]">
                          NAAC {uni.naac}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCF9EA] text-[#555E68] border border-[#14171A]/10">
                          {uni.mode}
                        </span>
                        <span className="text-[10px] text-[#555E68] font-medium">
                          {uni.campus}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-[#14171A]">{uni.name}</h4>
                      <p className="text-xs text-[#555E68] font-semibold">{uni.course}</p>

                      <div className="flex items-center gap-3 text-xs pt-1">
                        <div>
                          <span className="text-[#555E68] text-[11px]">Tuition: </span>
                          <strong className="text-[#14171A]">₹{(finalFee / 100000).toFixed(2)}L</strong>
                          {discount > 0 && (
                            <span className="line-through text-[#8A929B] text-[10px] ml-1">
                              ₹{(uni.baseFee / 100000).toFixed(2)}L
                            </span>
                          )}
                        </div>
                        <span className="text-[#14171A]/20">•</span>
                        <div>
                          <span className="text-[#555E68] text-[11px]">0% EMI: </span>
                          <strong className="text-emerald-700">₹{monthlyEmi.toLocaleString("en-IN")}/mo</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenClaim(uni)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-xs hover:scale-102"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Lock In Seat</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Claim Seat & Brochure Modal */}
      {selectedMatch && (
        <LeadCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Lock In ${selectedMatch.uni} Eligibility`}
          subtitle={`Your calculated score has been recorded. Complete your mobile number to lock in ${selectedMatch.waiver} and receive the official prospectus.`}
          prefilledCourse={selectedMatch.course}
          prefilledUniversity={selectedMatch.uni}
          source="Eligibility Calculator Widget"
        />
      )}
    </div>
  );
}
