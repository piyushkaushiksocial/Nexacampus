"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Building2,
  Users,
  Compass,
  FileSpreadsheet
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { LeadBanner } from "@/components/leads/LeadBanner";
import { UniversityFinderModal } from "@/components/finder/UniversityFinderModal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LiveActivityTicker } from "@/components/home/LiveActivityTicker";
import { DynamicAmbitionShowcase } from "@/components/home/DynamicAmbitionShowcase";
import { AnimatedStatsStrip } from "@/components/home/AnimatedStatsStrip";
import { EligibilityCalculator } from "@/components/home/EligibilityCalculator";
import { InteractiveProgramFilter } from "@/components/home/InteractiveProgramFilter";
import { UniversityIntakeForecaster } from "@/components/home/UniversityIntakeForecaster";
import { submitLead, validateIndianPhone } from "@/lib/leads";
import { sound } from "@/lib/sound";

export default function Home() {
  const [heroPhone, setHeroPhone] = useState("");
  const [heroPhoneError, setHeroPhoneError] = useState("");
  const [heroCourse, setHeroCourse] = useState("MBA (Management & Tech)");
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [selectedBrochureProgram, setSelectedBrochureProgram] = useState<{ title: string; uni: string } | null>(null);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroPhoneError("");

    if (heroPhone.trim()) {
      const { isValid, cleanPhone, error } = validateIndianPhone(heroPhone);
      if (!isValid) {
        setHeroPhoneError(error || "Enter a valid 10-digit mobile number.");
        sound.tick();
        return;
      }

      sound.snap();
      await submitLead({
        fullName: "Fast Homepage Applicant",
        phone: cleanPhone,
        targetCourse: heroCourse,
        source: "Homepage Hero 1-Click Fast Intake",
      });
    }

    setIsFinderOpen(true);
  };

  const openBrochureModal = (title = "Top Online & Campus Degrees", uni = "Partner Universities") => {
    sound.tick();
    setSelectedBrochureProgram({ title, uni });
    setIsBrochureModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] overflow-x-hidden">
      <Header />

      <main>
        {/* ================= HERO SECTION (Student-First & High Visual Appeal) ================= */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden border-b border-[#14171A]/[0.08]">
          
          {/* Dynamic floating ambient spotlight with subtle continuous movement */}
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.35, 0.5, 0.35],
              x: ["-50%", "-48%", "-50%"]
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 w-[720px] h-[380px] bg-gradient-to-b from-[#BADFDB]/40 via-[#FFA4A4]/20 to-transparent blur-[110px] rounded-full pointer-events-none -z-0" 
          />

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Headlines & 1-Click Fast Intake (7 cols) */}
            <ScrollReveal direction="up" className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BADFDB]/70 border border-[#14171A]/10 text-[#14171A] text-xs font-bold shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                <span>2026 Admissions & Scholarship Portals Live</span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#14171A] leading-[1.08]">
                Find the Right College. <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">Cut Through the Noise.</span>
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 h-3.5 bg-[#FFA4A4]/60 -z-0 rounded-sm block" 
                  />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#555E68] max-w-xl font-medium leading-relaxed">
                Compare UGC-entitled Degrees and top Campus Programs. Check verified salaries, 0% monthly EMIs, and discover your matched colleges in 2 minutes.
              </p>

              {/* 1-Click Interactive Input Bar in Warm White Card */}
              <div className="w-full max-w-xl bg-white border-2 border-[#14171A]/12 p-2.5 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-[0_16px_40px_-8px_rgba(20,23,26,0.1)] transition-all hover:border-[#14171A]/25">
                <select
                  value={heroCourse}
                  onChange={(e) => setHeroCourse(e.target.value)}
                  className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3 py-3 text-xs text-[#14171A] font-bold focus:outline-none focus:ring-2 focus:ring-[#FFA4A4] cursor-pointer"
                >
                  <option value="MBA (Management & Tech)">MBA (Management & Tech)</option>
                  <option value="MCA (Cloud & AI)">MCA (Cloud & AI)</option>
                  <option value="BBA (Business & Startups)">BBA (Business & Startups)</option>
                  <option value="Executive MBA">Executive MBA</option>
                  <option value="B.Tech Engineering">B.Tech Engineering</option>
                </select>

                <form onSubmit={handleHeroSubmit} className="flex-1 flex items-center px-4 py-3 bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl focus-within:ring-2 focus-within:ring-[#FFA4A4] transition-all">
                  <span className="text-[#8A929B] mr-2 text-sm font-mono font-bold">+91</span>
                  <input 
                    type="tel" 
                    value={heroPhone}
                    onChange={(e) => {
                      setHeroPhone(e.target.value);
                      if (heroPhoneError) setHeroPhoneError("");
                    }}
                    placeholder="Enter 10-digit WhatsApp number" 
                    className="bg-transparent border-none outline-none text-[#14171A] font-semibold w-full placeholder:text-[#8A929B] text-sm"
                  />
                </form>

                <button 
                  onClick={handleHeroSubmit}
                  className="px-6 py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm hover:scale-102 active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Find Colleges
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Phone Error and Trust Statement */}
              {heroPhoneError && (
                <p className="text-xs text-red-600 font-bold -mt-2">
                  {heroPhoneError}
                </p>
              )}

              <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] text-[#555E68]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-semibold">Zero-Spam Guarantee: 1 Verified Academic Advisor via WhatsApp. DPDP Act 2023 Protected.</span>
              </div>

              {/* Sub-actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs pt-1">
                <button
                  onClick={() => {
                    sound.snap();
                    setIsFinderOpen(true);
                  }}
                  className="text-[#14171A] hover:opacity-75 flex items-center gap-1.5 font-bold underline underline-offset-4 decoration-[#FFA4A4] decoration-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFA4A4]" />
                  AI College Matcher (2-Min Wizard)
                </button>

                <button
                  onClick={() => openBrochureModal("2026 College Fee & Placement Guide", "All Top Universities")}
                  className="text-[#555E68] hover:text-[#14171A] underline underline-offset-4 flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Download className="w-3.5 h-3.5 text-[#555E68]" />
                  Download 2026 Fee Guide (PDF)
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xs text-[#555E68] font-bold">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#14171A]/10 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> UGC-DEB Entitled
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#14171A]/10 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#FFA4A4]" /> NAAC A++ Rated
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#14171A]/10 shadow-xs">
                  <Lock className="w-4 h-4 text-blue-600" /> WES Globally Recognized
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: High Quality Visual Showcase (5 cols) */}
            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#14171A]/10 shadow-[0_24px_60px_-12px_rgba(20,23,26,0.15)] bg-white group">
                <div className="relative h-96 w-full">
                  <Image 
                    src="/images/hero-student.jpg" 
                    alt="Indian university students collaborating on campus" 
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Overlay Stat Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#14171A]/10 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E68] block">Accredited Degrees</span>
                    <span className="text-base font-black text-[#14171A]">38+ Approved Campuses</span>
                  </div>
                  <Link href="/colleges">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#BADFDB] hover:bg-[#FFA4A4] text-[#14171A] font-bold text-xs transition-colors flex items-center gap-1 hover:scale-102">
                      Browse All →
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* ================= DYNAMIC CONTINUOUS MARQUEE TICKER (High-Contrast Ribbon) ================= */}
        <LiveActivityTicker />

        {/* ================= REAL TOOL 1: INSTANT SCHOLARSHIP & ELIGIBILITY CALCULATOR ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#BADFDB] px-3.5 py-1 rounded-full border border-[#14171A]/10 inline-block mb-3">
              Real-Time Academic Clearance
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
              Check Your Admission Probability & Fee Waiver
            </h2>
            <p className="text-[#555E68] text-sm sm:text-base mt-2 font-medium">
              Pick your target degree, background, and qualifying score. The system computes your admission clearance rate and checks institutional scholarship quotas in real time.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <EligibilityCalculator />
          </ScrollReveal>
        </section>

        {/* ================= SECTION: ANIMATED REAL-WORLD METRICS STRIP ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <AnimatedStatsStrip />
        </section>

        {/* ================= SECTION: DYNAMIC AMBITION & CAREER TRAJECTORY SHOWCASE ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3.5 py-1 rounded-full border border-[#14171A]/10 inline-block mb-3">
              Explore By Career Trajectory
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
              Where Do You Want to Be in 24 Months?
            </h2>
            <p className="text-[#555E68] text-sm sm:text-base mt-2 font-medium">
              Explore verified compensation packages, curriculum capstones, and hiring corporate partners across high-growth industries.
            </p>
          </ScrollReveal>

          <DynamicAmbitionShowcase />
        </section>

        {/* ================= REAL TOOL 2: LIVE MULTI-FACET DEGREE EXPLORER WITH FLUID RE-ORDER ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#BADFDB] px-3.5 py-1 rounded-full border border-[#14171A]/10 inline-block mb-2">
                Program Explorer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14171A]">
                Browse Approved Degrees & Campuses
              </h2>
              <p className="text-[#555E68] text-sm mt-1 max-w-xl font-medium">
                Filter by degree, format (Campus or Flexible), and tuition budget. Toggle &quot;Compare&quot; to inspect 2 or 3 colleges side-by-side.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/colleges">
                <button className="text-sm font-bold text-[#14171A] hover:opacity-75 flex items-center gap-1 underline underline-offset-4 decoration-[#FFA4A4] decoration-2">
                  View Full Directory (18+ Programs) <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <InteractiveProgramFilter />
          </ScrollReveal>
        </section>

        {/* ================= REAL TOOL 3: INSTITUTIONAL ADMISSIONS & TREASURY FORECASTER (FOR UNIVERSITIES) ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3.5 py-1 rounded-full border border-[#14171A]/10 inline-block mb-3">
              Institutional Partnership Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
              Admissions Yield & Treasury Forecaster
            </h2>
            <p className="text-[#555E68] text-sm sm:text-base mt-2 font-medium">
              Designed for Vice-Chancellors, Deans, and Admissions Directors. Forecast annual cohort capacity fill, upfront treasury disbursement, and acquisition efficiency.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <UniversityIntakeForecaster />
          </ScrollReveal>
        </section>

        {/* ================= REAL TOOL 4: ROI & SALARY BREAK-EVEN CALCULATOR ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="mb-10 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/40 px-3 py-1 rounded-full border border-[#14171A]/10 inline-block mb-2">
              Financial Return Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#14171A] mb-2">
              Tuition Fee Recovery & Salary Calculator
            </h2>
            <p className="text-[#555E68] text-sm sm:text-base max-w-2xl font-medium">
              Adjust tuition fee and expected salary hike to calculate your exact monthly EMI and number of months to break even on education investment.
            </p>
          </ScrollReveal>

          <RoiCalculator initialFee={196000} initialProgramName="Online MBA" />
        </section>

        {/* ================= FAST LEAD ACTION BANNER ================= */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <LeadBanner />
          </ScrollReveal>
        </section>

        {/* ================= SECTION: 2-MINUTE UNIVERSITY FINDER PROMO ================= */}
        <section className="py-20 px-6 bg-[#F6F2DE]/60 border-t border-[#14171A]/[0.08]">
          <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
              AI University Matching Engine
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#14171A]">
              Need Personal Guidance on Degree Formats & Campuses?
            </h2>
            <p className="text-[#555E68] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Answer 3 quick questions about your degree, budget, and learning style. Our system matches you with the top 3 approved universities in under 2 minutes.
            </p>

            <div>
              <button
                onClick={() => {
                  sound.snap();
                  setIsFinderOpen(true);
                }}
                className="px-8 py-4 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-md hover:scale-102"
              >
                <Sparkles className="w-4 h-4" />
                Suggest Colleges for Me (2 Min)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
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
