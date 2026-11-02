"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  MapPin, 
  ShieldCheck, 
  Search, 
  Filter, 
  Scale, 
  Calculator, 
  MessageSquare, 
  Check, 
  Plus, 
  Sparkles,
  Building2,
  ChevronRight,
  Download
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { LeadBanner } from "@/components/leads/LeadBanner";
import { InteractiveTiltCard } from "@/components/motion/InteractiveTiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { sound } from "@/lib/sound";

export default function CollegesRoster() {
  const { addToCompare, removeFromCompare, isComparing } = useCompare();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDegreeLevel, setActiveDegreeLevel] = useState("All");
  const [activeMode, setActiveMode] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Interactive Modals State
  const [selectedRoiProgram, setSelectedRoiProgram] = useState<Program | null>(null);
  const [counselingTarget, setCounselingTarget] = useState<string | null>(null);
  const [brochureTarget, setBrochureTarget] = useState<Program | null>(null);

  const degreeLevels = ["All", "Master's", "Bachelor's", "Executive"];
  const studyModes = ["All", "Campus Full-time", "Flexible Learning", "Hybrid / Blended"];
  const categories = ["All", "Management", "Technology & AI", "Commerce & Finance", "Engineering"];

  // Filtered dataset
  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((prog) => {
      const matchesDegree = activeDegreeLevel === "All" || prog.degreeLevel === activeDegreeLevel;
      const matchesMode = activeMode === "All" || prog.mode === activeMode;
      const matchesCategory = activeCategory === "All" || prog.category === activeCategory;
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        prog.name.toLowerCase().includes(q) ||
        prog.university.toLowerCase().includes(q) ||
        prog.location.toLowerCase().includes(q) ||
        prog.specializations.some((s) => s.toLowerCase().includes(q)) ||
        prog.accreditations.some((a) => a.toLowerCase().includes(q));

      return matchesDegree && matchesMode && matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeDegreeLevel, activeMode, activeCategory]);

  const handleToggleCompare = (prog: Program) => {
    sound.snap();
    if (isComparing(prog.id)) {
      removeFromCompare(prog.id);
    } else {
      addToCompare(prog);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] pt-16">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 pb-32">
        
        {/* Header Section */}
        <ScrollReveal direction="up" className="border-b border-[#14171A]/10 pb-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3 py-1 rounded-full border border-[#14171A]/10 mb-2 inline-block">
                Approved Universities & Colleges
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#14171A]">
                All Courses & Degrees
              </h1>
              <p className="text-[#555E68] text-base mt-2 max-w-2xl font-medium">
                Compare fees, salary packages, and eligibility across Govt & UGC approved colleges. Pick any courses to compare side-by-side or download the official fee brochure.
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.tick();
                  setBrochureTarget(PROGRAMS_DATA[0]);
                }}
                className="px-4 py-2.5 bg-white hover:bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs hover:scale-102"
              >
                <Download className="w-3.5 h-3.5 text-[#14171A]" />
                Get 2026 College Fee Guide (PDF)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Search & Filter Bar */}
        <ScrollReveal direction="up" delay={0.1} className="bg-white border border-[#14171A]/12 rounded-3xl p-5 mb-8 space-y-4 shadow-[0_10px_30px_-5px_rgba(20,23,26,0.05)]">
          
          {/* Top row: Search input + Degree level tabs */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A929B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by university (NMIMS, Manipal), degree (MBA, MCA, BBA), or specialization..."
                className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#BADFDB] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555E68] hover:text-[#14171A] text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Degree Level Switcher */}
            <div className="flex items-center gap-1 bg-[#FCF9EA] border border-[#14171A]/10 p-1 rounded-xl overflow-x-auto">
              {degreeLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    sound.tick();
                    setActiveDegreeLevel(lvl);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    activeDegreeLevel === lvl
                      ? "bg-[#FFA4A4] text-[#14171A] shadow-xs"
                      : "text-[#555E68] hover:text-[#14171A]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row: Mode & Category filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#14171A]/10 text-xs">
            
            {/* Mode selection */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#555E68] font-bold">Study Mode:</span>
              {studyModes.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    sound.tick();
                    setActiveMode(m);
                  }}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                    activeMode === m
                      ? "bg-[#14171A] text-[#FCF9EA] border-[#14171A]"
                      : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#555E68] font-bold">Subject:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.tick();
                    setActiveCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    activeCategory === cat
                      ? "bg-[#BADFDB] text-[#14171A]"
                      : "text-[#555E68] hover:text-[#14171A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </ScrollReveal>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#555E68] mb-6 px-1 font-bold">
          <span>Showing {filteredPrograms.length} verified courses</span>
          <span className="text-[#14171A] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FFA4A4]" />
            Tip: Click &quot;Compare&quot; to inspect 2 or 3 courses side-by-side
          </span>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-white border border-[#14171A]/12 rounded-3xl p-12 text-center shadow-xs">
            <h3 className="text-lg font-bold text-[#14171A] mb-2">No matching courses found</h3>
            <p className="text-sm text-[#555E68] mb-6 font-medium">Try clearing your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveDegreeLevel("All"); setActiveMode("All"); setActiveCategory("All"); }}
              className="px-4 py-2 bg-[#14171A] text-[#FCF9EA] font-bold rounded-xl text-xs hover:bg-[#FFA4A4] hover:text-[#14171A]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPrograms.map((prog, idx) => {
              const inCompare = isComparing(prog.id);

              return (
                <ScrollReveal key={prog.id} direction="up" delay={idx * 0.06}>
                  <InteractiveTiltCard
                    className="flex flex-col justify-between overflow-hidden h-full"
                  >
                  {/* Card Cover Image */}
                  {prog.coverImage && (
                    <div className="relative h-44 w-full border-b border-[#14171A]/10 overflow-hidden">
                      <Image
                        src={prog.coverImage}
                        alt={prog.name}
                        fill
                        priority={idx < 2}
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
                            handleToggleCompare(prog);
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
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#BADFDB]/60 text-[#14171A] border border-[#14171A]/10">
                        {prog.degreeLevel} • {prog.mode}
                      </span>
                      
                      {/* Compare Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCompare(prog);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 transition-all ${
                          inCompare
                            ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                            : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                        }`}
                        title="Add or remove from side-by-side comparison"
                      >
                        {inCompare ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Compare
                          </>
                        )}
                      </button>
                    </div>

                    {/* Course Title */}
                    <Link href={`/colleges/${prog.id}`} className="block">
                      <h3 className="text-lg font-bold text-[#14171A] tracking-tight leading-snug hover:text-[#FFA4A4] transition-colors mb-1">
                        {prog.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#555E68] mb-3 flex items-center gap-1.5 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-[#8A929B] shrink-0" />
                      <span className="truncate">{prog.university}</span>
                    </p>

                    {/* Approvals */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prog.accreditations.slice(0, 3).map((acc, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FCF9EA] border border-[#14171A]/10 text-[#14171A] font-semibold">
                          {acc}
                        </span>
                      ))}
                    </div>

                    {/* Fees & Salary Box */}
                    <div className="grid grid-cols-2 gap-2 bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-3.5 mb-4 text-xs">
                      <div>
                        <span className="text-[#555E68] block text-[11px] font-bold">Total Fees</span>
                        <span className="text-sm font-black text-[#14171A]">
                          ₹{(prog.totalFee / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-[#8A929B] block text-[10px]">EMI: ₹{prog.emiStartsAt}/mo</span>
                      </div>
                      
                      <div className="border-l border-[#14171A]/10 pl-2.5">
                        <span className="text-[#555E68] block text-[11px] font-bold">Avg Salary</span>
                        <span className="text-sm font-black text-emerald-700">
                          {prog.avgPlacementCtc}
                        </span>
                        <span className="text-[#8A929B] block text-[10px]">Highest: {prog.highestCtc}</span>
                      </div>
                    </div>

                    {/* Scholarship Badge */}
                    <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#14171A] font-bold">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#FFA4A4]" />
                        <span>{prog.nexaScholarship.maxWaiver} Scholarship</span>
                      </div>
                      <span className="text-red-700 font-bold text-[11px]">
                        {prog.nexaScholarship.seatsRemaining} seats left
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2 pt-2 border-t border-[#14171A]/10">
                    <Link href={`/colleges/${prog.id}`} className="block">
                      <button className="w-full py-2.5 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        <span>View Syllabus, Fees & Placements</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.tick();
                          setBrochureTarget(prog);
                        }}
                        className="py-2 px-3 bg-[#FCF9EA] hover:bg-white border border-[#14171A]/10 text-[#14171A] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-[#14171A]" />
                        Brochure PDF
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.snap();
                          setCounselingTarget(prog.name);
                        }}
                        className="py-2 px-3 bg-[#FCF9EA] hover:bg-white border border-[#14171A]/10 rounded-xl text-xs font-semibold text-[#14171A] flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                        Ask Counselor
                      </button>
                    </div>
                  </div>
                </div>

              </InteractiveTiltCard>
            </ScrollReveal>
            );
          })}
          </div>
        )}

        {/* In-Page Lead Banner */}
        <div className="my-12">
          <LeadBanner />
        </div>

      </main>

      {/* Floating Compare Dock */}
      <CompareDock />

      {/* Program Brochure Modal */}
      {brochureTarget && (
        <LeadCaptureModal
          isOpen={Boolean(brochureTarget)}
          onClose={() => setBrochureTarget(null)}
          title={`Download ${brochureTarget.name} Brochure`}
          subtitle={`Get the complete 2026 fee breakdown, syllabus, and placement stats for ${brochureTarget.university}.`}
          prefilledCourse={brochureTarget.name}
          prefilledUniversity={brochureTarget.university}
          source="Colleges Catalog Brochure Download"
        />
      )}

      {/* Fee Calculator Modal */}
      {selectedRoiProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14171A]/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <RoiCalculator
              initialFee={selectedRoiProgram.totalFee}
              initialProgramName={selectedRoiProgram.name}
              onClose={() => setSelectedRoiProgram(null)}
            />
          </div>
        </div>
      )}

      {/* 1-on-1 Counseling Drawer */}
      <CounselingDrawer
        isOpen={Boolean(counselingTarget)}
        onClose={() => setCounselingTarget(null)}
        defaultProgramName={counselingTarget || undefined}
      />

      <Footer />
    </div>
  );
}
