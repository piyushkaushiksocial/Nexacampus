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
import { PROGRAMS_DATA, Program } from "@/data/programs";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { LeadBanner } from "@/components/leads/LeadBanner";

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
  const studyModes = ["All", "100% Online", "Campus Full-time", "Hybrid / Blended"];
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
    if (isComparing(prog.id)) {
      removeFromCompare(prog.id);
    } else {
      addToCompare(prog);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16">
      <Header />
      
      {/* Texture overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 pb-32">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
                Approved Universities & Colleges
              </span>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                All Courses & Degrees
              </h1>
              <p className="text-white/60 text-base mt-2 max-w-2xl font-normal">
                Compare fees, salary packages, and eligibility across Govt & UGC approved colleges. Pick any courses to compare side-by-side or download the official fee brochure.
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBrochureTarget(PROGRAMS_DATA[0])}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#FFE15D]" />
                Get 2026 College Fee Guide (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Search & Simple Filter Bar */}
        <div className="bg-[#121212] border border-white/15 rounded-2xl p-4 mb-8 space-y-4">
          
          {/* Top row: Search input + Degree level tabs */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by university (NMIMS, Manipal), degree (MBA, MCA, BBA), or subject..."
                className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Degree Level Switcher */}
            <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 rounded-xl overflow-x-auto">
              {degreeLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveDegreeLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeDegreeLevel === lvl
                      ? "bg-[#FFE15D] text-black font-semibold shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row: Mode & Category filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
            
            {/* Mode selection */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/50 font-medium">Study Mode:</span>
              {studyModes.map((m) => (
                <button
                  key={m}
                  onClick={() => setActiveMode(m)}
                  className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                    activeMode === m
                      ? "bg-white text-black font-semibold border-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-white/50 font-medium">Subject:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    activeCategory === cat
                      ? "bg-[#FFE15D]/20 text-[#FFE15D] font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-white/60 mb-6 px-1">
          <span>Showing {filteredPrograms.length} verified courses</span>
          <span className="text-[#FFE15D] font-medium">
            💡 Tip: Click &quot;Compare&quot; to see 2 or 3 courses side-by-side
          </span>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-[#121212] border border-white/15 rounded-2xl p-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No matching courses found</h3>
            <p className="text-sm text-white/60 mb-6">Try clearing your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveDegreeLevel("All"); setActiveMode("All"); setActiveCategory("All"); }}
              className="px-4 py-2 bg-white text-black font-semibold rounded-xl text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPrograms.map((prog) => {
              const inCompare = isComparing(prog.id);

              return (
                <div
                  key={prog.id}
                  className="bg-[#121212] border border-white/15 hover:border-white/30 rounded-2xl p-6 flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                        {prog.degreeLevel} • {prog.mode}
                      </span>
                      
                      {/* Compare Toggle */}
                      <button
                        onClick={() => handleToggleCompare(prog)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
                          inCompare
                            ? "bg-[#FFE15D] text-black border-[#FFE15D] font-semibold"
                            : "bg-white/5 border-white/15 text-white/70 hover:text-white"
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
                      <h3 className="text-lg font-semibold text-white tracking-tight leading-snug hover:text-[#FFE15D] transition-colors mb-1">
                        {prog.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-white/60 mb-3 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span className="truncate">{prog.university}</span>
                    </p>

                    {/* Approvals */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prog.accreditations.slice(0, 3).map((acc, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                          {acc}
                        </span>
                      ))}
                    </div>

                    {/* Fees & Salary Box */}
                    <div className="grid grid-cols-2 gap-2 bg-black/50 border border-white/10 rounded-xl p-3 mb-4 text-xs">
                      <div>
                        <span className="text-white/50 block text-[11px]">Total Fees</span>
                        <span className="text-sm font-semibold text-white">
                          ₹{(prog.totalFee / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-white/40 block text-[10px]">EMI: ₹{prog.emiStartsAt}/mo</span>
                      </div>
                      
                      <div className="border-l border-white/10 pl-2.5">
                        <span className="text-white/50 block text-[11px]">Avg Salary</span>
                        <span className="text-sm font-semibold text-emerald-400">
                          {prog.avgPlacementCtc}
                        </span>
                        <span className="text-white/40 block text-[10px]">Highest: {prog.highestCtc}</span>
                      </div>
                    </div>

                    {/* Scholarship Badge */}
                    <div className="bg-[#FFE15D]/10 border border-[#FFE15D]/25 rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#FFE15D] font-medium">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>{prog.nebsaScholarship.maxWaiver} Scholarship</span>
                      </div>
                      <span className="text-red-400 font-semibold text-[11px]">
                        {prog.nebsaScholarship.seatsRemaining} seats left
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    
                    {/* View Full Details Button */}
                    <Link href={`/colleges/${prog.id}`} className="block">
                      <button className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-[#FFE15D] transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        <span>View Syllabus, Fees & Placements</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setBrochureTarget(prog)}
                        className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-[#FFE15D]" />
                        Brochure PDF
                      </button>

                      <button
                        onClick={() => setCounselingTarget(prog.name)}
                        className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white/80 hover:text-white flex items-center justify-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        Ask Counselor
                      </button>
                    </div>

                    <Link href="/exam/diagnostic" className="block">
                      <button className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-[#FFE15D] transition-colors flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Check My Scholarship Eligibility
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>

                </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
