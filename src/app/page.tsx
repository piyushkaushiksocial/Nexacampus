"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  TrendingUp, 
  AlertTriangle, 
  Scale, 
  Sparkles, 
  Building2, 
  Check, 
  Plus, 
  ArrowRight, 
  Calculator, 
  Download, 
  PhoneCall,
  Search
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PROGRAMS_DATA } from "@/data/programs";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { LeadBanner } from "@/components/leads/LeadBanner";
import { UniversityFinderModal } from "@/components/finder/UniversityFinderModal";

export default function Home() {
  const router = useRouter();
  const { addToCompare, removeFromCompare, isComparing } = useCompare();
  
  const [heroPhone, setHeroPhone] = useState("");
  const [heroCourse, setHeroCourse] = useState("Online MBA");
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [selectedBrochureProgram, setSelectedBrochureProgram] = useState<{ title: string; uni: string } | null>(null);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPhone) {
      try {
        const existing = localStorage.getItem("nebsa_captured_leads");
        const list = existing ? JSON.parse(existing) : [];
        list.push({
          fullName: "Homepage Fast Applicant",
          phone: heroPhone,
          targetCourse: heroCourse,
          source: "Homepage Hero 1-Click Form",
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("nebsa_captured_leads", JSON.stringify(list));
      } catch {}

      // Open the finder directly prefilled or show confirmation
      setIsFinderOpen(true);
    } else {
      setIsFinderOpen(true);
    }
  };

  const openBrochureModal = (title = "Top Online & Campus Degrees", uni = "Partner Universities") => {
    setSelectedBrochureProgram({ title, uni });
    setIsBrochureModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black">
      <Header />

      {/* Subtle texture overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden border-b border-white/10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
          
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 mb-6 text-xs font-medium text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#FFE15D]" />
              2026 Direct Admissions & College Guide
            </div>

            {/* Clear, Simple Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl">
              Find the Right Course at the <span className="text-[#FFE15D]">Right College.</span>
            </h1>

            {/* Clear, Human Subtitle */}
            <p className="text-base sm:text-xl text-white/70 max-w-2xl mb-10 font-normal leading-relaxed">
              Compare fees, average salaries, and Govt approvals across India&apos;s top universities. See whether an Online or Campus degree fits your career in 2 minutes.
            </p>

            {/* Simple One-Step Phone Input Form */}
            <div className="w-full max-w-xl bg-[#161616] border border-white/20 p-2.5 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl shadow-black/80">
              <select
                value={heroCourse}
                onChange={(e) => setHeroCourse(e.target.value)}
                className="bg-black/70 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#FFE15D]"
              >
                <option value="Online MBA">Online MBA</option>
                <option value="Online MCA (AI)">Online MCA (AI)</option>
                <option value="Online BBA">Online BBA</option>
                <option value="Executive MBA">Executive MBA</option>
                <option value="B.Tech Engineering">B.Tech Engineering</option>
              </select>

              <form onSubmit={handleHeroSubmit} className="flex-1 flex items-center px-4 py-3 bg-black/60 border border-white/10 rounded-xl focus-within:border-[#FFE15D] transition-colors">
                <span className="text-white/40 mr-2 text-sm font-mono">+91</span>
                <input 
                  type="tel" 
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  placeholder="Enter WhatsApp number" 
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/40 text-sm"
                />
              </form>

              <button 
                onClick={handleHeroSubmit}
                className="px-6 py-3.5 bg-[#FFE15D] text-black font-semibold text-xs tracking-wide rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Find Colleges
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Link to 2-Min Wizard & Brochure */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="text-[#FFE15D] hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Want AI to suggest your top 3 colleges? (2-Min Wizard)
              </button>

              <button
                onClick={() => openBrochureModal("2026 College Fee & Placement Guide", "All Top Universities")}
                className="text-white/70 hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-white/50" />
                Download 2026 Fee Guide (PDF)
              </button>
            </div>

            {/* Trust Badges in Simple English */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> UGC-DEB & Govt Approved
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFE15D]" /> Up to 50% Fee Scholarships
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-400" /> 100% Free & No Spam Calls
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: POPULAR DEGREES TO COMPARE ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
                Side-by-Side Comparison
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                Compare Top Colleges & Courses
              </h2>
              <p className="text-white/60 text-sm mt-1 max-w-xl">
                Click &quot;Compare&quot; on any course below to see fees, monthly EMI, and placement salaries side-by-side.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/colleges">
                <button className="text-sm font-semibold text-[#FFE15D] hover:underline flex items-center gap-1">
                  View All Courses <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS_DATA.slice(0, 3).map((prog) => {
              const inCompare = isComparing(prog.id);

              return (
                <div
                  key={prog.id}
                  className="bg-[#121212] border border-white/15 hover:border-white/30 rounded-2xl p-6 flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Top Tag & Compare Button */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                        {prog.mode}
                      </span>
                      
                      <button
                        onClick={() => inCompare ? removeFromCompare(prog.id) : addToCompare(prog)}
                        className={`text-xs px-3 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
                          inCompare
                            ? "bg-[#FFE15D] text-black border-[#FFE15D]"
                            : "bg-white/5 border-white/15 text-white/70 hover:text-white hover:border-white/30"
                        }`}
                      >
                        {inCompare ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        {inCompare ? "Added" : "Compare"}
                      </button>
                    </div>

                    <Link href={`/colleges/${prog.id}`} className="block">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#FFE15D] transition-colors mb-1">
                        {prog.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-white/60 mb-4">{prog.university}</p>

                    {/* Simple Stats Box */}
                    <div className="bg-black/50 border border-white/10 rounded-xl p-3 mb-4 space-y-2 text-xs">
                      <div className="flex justify-between text-white/70">
                        <span>Total Fees:</span>
                        <span className="font-semibold text-white">₹{(prog.totalFee / 100000).toFixed(2)} Lakhs</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Monthly EMI:</span>
                        <span className="font-semibold text-[#FFE15D]">From ₹{prog.emiStartsAt}/month</span>
                      </div>
                      <div className="flex justify-between text-white/70 border-t border-white/5 pt-1.5">
                        <span>Average Salary:</span>
                        <span className="font-semibold text-emerald-400">{prog.avgPlacementCtc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <Link href={`/colleges/${prog.id}`} className="block">
                      <button className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-[#FFE15D] transition-colors flex items-center justify-center gap-1.5">
                        <span>View Syllabus & Full Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>

                    <button
                      onClick={() => openBrochureModal(prog.name, prog.university)}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#FFE15D]" />
                      Download Fee & Syllabus PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION: INSTANT FEE GUIDE BANNER ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <LeadBanner />
        </section>

        {/* ================= SECTION: SIMPLE FEE & SALARY CALCULATOR ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
              Free Financial Tool
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
              College Fee & Salary Calculator
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl">
              Move the sliders below to see your monthly EMI, expected salary increase, and how many months it will take to recover your college fees.
            </p>
          </div>

          <RoiCalculator initialFee={196000} initialProgramName="Online MBA" />
        </section>

        {/* ================= SECTION: WHY COURSE CHOICE MATTERS ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/10">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
              Smart Advice
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              Don&apos;t Make the 4-Year College Mistake
            </h2>
            <p className="text-white/60 max-w-2xl text-sm sm:text-base leading-relaxed">
              Many students choose a college just because it has a big name, but end up in a branch with no real placements. Here is how to avoid that:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Mistake Card */}
            <div className="border border-red-500/20 bg-red-500/[0.03] rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-base mb-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                The Common Mistake: Famous College, Wrong Course
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Students pay high commercial fees (₹10 Lakhs+) to join a famous campus, but pick an outdated branch. The result? Very low campus placements and heavy student loan burden.
              </p>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex justify-between text-xs">
                <span className="text-white/60">Typical Placement Rate:</span>
                <span className="font-semibold text-red-400">Only 25% – 35%</span>
              </div>
            </div>

            {/* The Right Way Card */}
            <div className="border border-emerald-500/30 bg-emerald-500/[0.04] rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-base mb-3">
                <TrendingUp className="w-5 h-5 shrink-0" />
                The Smart Way: Right Course + Verified College
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                We help you pick the college where your chosen course is the flagship program — with modern curriculum, top hiring partners, and up to 50% scholarship.
              </p>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex justify-between text-xs">
                <span className="text-white/60">Average Placement Rate:</span>
                <span className="font-semibold text-emerald-400">85%+ in Top Companies</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION: 2-MINUTE UNIVERSITY FINDER PROMO ================= */}
        <section className="py-20 px-6 bg-[#0E0E0E]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE15D]/15 border border-[#FFE15D]/30 text-[#FFE15D] text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              AI University Matching Engine
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Confused between Online & Campus Colleges?
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Answer 3 quick questions about your degree, budget, and learning style. Our system matches you with the top 3 approved universities in under 2 minutes.
            </p>

            <div>
              <button
                onClick={() => setIsFinderOpen(true)}
                className="px-8 py-4 bg-[#FFE15D] text-black font-semibold text-sm rounded-xl hover:bg-white transition-colors inline-flex items-center gap-2 shadow-xl shadow-[#FFE15D]/10"
              >
                <Sparkles className="w-4 h-4" />
                Suggest Colleges for Me (2 Min)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Compare Dock */}
      <CompareDock />

      {/* 2-Min College Finder Wizard Modal */}
      <UniversityFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
      />

      {/* Global Brochure Lead Collection Modal */}
      <LeadCaptureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        prefilledCourse={selectedBrochureProgram?.title || "Online MBA & Tech Degrees"}
        prefilledUniversity={selectedBrochureProgram?.uni || "Top Partner Universities"}
        source="Homepage Brochure Request"
      />

      <Footer />
    </div>
  );
}
