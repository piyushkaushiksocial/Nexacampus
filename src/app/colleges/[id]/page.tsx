"use client";

import { use } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import { notFound } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Award, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  HelpCircle, 
  Plus, 
  Check, 
  ArrowRight,
  Share2
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import Link from "next/link";
import { useState } from "react";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const program = PROGRAMS_DATA.find((p) => p.id === resolvedParams.id);

  const { addToCompare, removeFromCompare, isComparing } = useCompare();
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "syllabus" | "fees" | "placements" | "faqs">("overview");

  if (!program) {
    notFound();
  }

  const inCompare = isComparing(program.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16">
      <Header />

      {/* Subtle overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-white/10 bg-[#0E0E0E] py-3 px-6 text-xs text-white/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/colleges" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{program.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => inCompare ? removeFromCompare(program.id) : addToCompare(program)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                inCompare
                  ? "bg-[#FFE15D] text-black border-[#FFE15D] font-semibold"
                  : "bg-white/5 border-white/15 text-white/80 hover:text-white hover:border-white/30"
              }`}
            >
              {inCompare ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {inCompare ? "In Compare Matrix" : "Add to Compare"}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE15D]/5 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FFE15D]/15 text-[#FFE15D] border border-[#FFE15D]/30">
                  {program.degreeLevel} • {program.mode}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                  {program.duration}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {program.examMode}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                {program.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                <div className="flex items-center gap-1.5 font-medium text-white">
                  <Building2 className="w-4 h-4 text-[#FFE15D]" />
                  <span>{program.university}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  <span>{program.location}</span>
                </div>
                {program.nirfRank && (
                  <>
                    <span>•</span>
                    <span className="text-[#FFE15D] font-medium">{program.nirfRank}</span>
                  </>
                )}
              </div>

              {/* Accreditations tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {program.accreditations.map((acc, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                    ✓ {acc}
                  </span>
                ))}
              </div>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed pt-2">
                {program.bestFor}
              </p>
            </div>

            {/* Right 4 Cols: Quick Fee Card */}
            <div className="lg:col-span-4 bg-black/60 border border-white/15 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Total Course Fee</span>
                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                  ₹{program.totalFee.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-white/40">all semesters</span>
                </div>
                <span className="text-xs text-emerald-400 block mt-1">
                  0% EMI starts at ₹{program.emiStartsAt.toLocaleString("en-IN")}/month
                </span>
              </div>

              {/* Scholarship Highlight */}
              <div className="bg-[#FFE15D]/10 border border-[#FFE15D]/30 rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#FFE15D] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {program.nebsaScholarship.maxWaiver} Scholarship
                  </span>
                  <span className="text-red-400 font-bold">{program.nebsaScholarship.seatsRemaining} seats left</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Take the free 5-minute quiz to claim your fee waiver.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="w-full py-3 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Get Syllabus & Fee PDF
                </button>

                <button
                  onClick={() => setIsCounselingOpen(true)}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  Talk to Counselor (Free)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= STICKY SECTION TABS ================= */}
        <div className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2">
          {[
            { id: "overview", label: "Overview & USPs" },
            { id: "syllabus", label: "Curriculum & Syllabus" },
            { id: "fees", label: "Fees & EMI Calculator" },
            { id: "placements", label: "Placements & Companies" },
            { id: "faqs", label: "Frequently Asked Questions" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TAB CONTENT 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Highlights Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.highlights.map((highlight, index) => (
                <div key={index} className="bg-[#121212] border border-white/15 rounded-2xl p-6">
                  <div className="w-8 h-8 rounded-lg bg-[#FFE15D]/15 border border-[#FFE15D]/30 flex items-center justify-center text-[#FFE15D] mb-4 font-bold text-xs">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">Program Pillar</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Eligibility & Admission Process */}
            <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Eligibility Criteria & Who Can Apply
              </h2>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 mb-6 text-sm text-white/80 leading-relaxed">
                {program.eligibility}
              </div>

              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">
                Available Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.specializations.map((spec, i) => (
                  <span key={i} className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Student Reviews */}
            {program.reviews && program.reviews.length > 0 && (
              <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Verified Student Experiences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {program.reviews.map((rev, i) => (
                    <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-semibold text-white text-sm block">{rev.author}</span>
                          <span className="text-xs text-white/50">{rev.role}</span>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ✓ Verified Student
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB CONTENT 2: SYLLABUS ================= */}
        {activeTab === "syllabus" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121212] border border-white/15 rounded-2xl p-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Semester-Wise Syllabus & Subjects</h2>
                <p className="text-xs text-white/60 mt-1">Curriculum updated for 2026-27 academic session</p>
              </div>

              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="px-4 py-2.5 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Complete Syllabus PDF
              </button>
            </div>

            {program.syllabus ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {program.syllabus.map((sem, i) => (
                  <div key={i} className="bg-[#121212] border border-white/15 rounded-2xl p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] block mb-2">
                      {sem.semester}
                    </span>
                    <ul className="space-y-2">
                      {sem.subjects.map((sub, j) => (
                        <li key={j} className="text-xs sm:text-sm text-white/80 flex items-start gap-2">
                          <span className="text-[#FFE15D] mt-1">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#121212] border border-white/15 rounded-2xl p-8 text-center text-white/60 text-sm">
                Syllabus details available in the official downloadable brochure.
              </div>
            )}
          </div>
        )}

        {/* ================= TAB CONTENT 3: FEES & EMI ================= */}
        {activeTab === "fees" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#121212] border border-white/15 rounded-2xl p-6">
                <span className="text-xs text-white/50 uppercase block mb-1">One-Time / Total Fees</span>
                <span className="text-2xl font-bold text-white">₹{program.totalFee.toLocaleString("en-IN")}</span>
                <span className="text-xs text-white/40 block mt-1">Covers all semester tuition and digital LMS</span>
              </div>

              <div className="bg-[#121212] border border-white/15 rounded-2xl p-6">
                <span className="text-xs text-white/50 uppercase block mb-1">Per-Semester Fee</span>
                <span className="text-2xl font-bold text-white">₹{program.semesterFee.toLocaleString("en-IN")}</span>
                <span className="text-xs text-white/40 block mt-1">Payable in equal semester installments</span>
              </div>

              <div className="bg-[#121212] border border-[#FFE15D]/30 bg-[#FFE15D]/5 rounded-2xl p-6">
                <span className="text-xs text-[#FFE15D] uppercase font-semibold block mb-1">0% Interest Monthly EMI</span>
                <span className="text-2xl font-bold text-[#FFE15D]">From ₹{program.emiStartsAt}/mo</span>
                <span className="text-xs text-[#FFE15D]/70 block mt-1">Paperless 10-minute digital approval</span>
              </div>
            </div>

            {/* Embedded Live Calculator */}
            <div className="border border-white/15 rounded-3xl overflow-hidden">
              <RoiCalculator initialFee={program.totalFee} initialProgramName={program.name} />
            </div>
          </div>
        )}

        {/* ================= TAB CONTENT 4: PLACEMENTS ================= */}
        {activeTab === "placements" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121212] border border-white/15 rounded-2xl p-6">
                <span className="text-xs text-white/50 uppercase block mb-1">Average Salary (CTC)</span>
                <span className="text-3xl font-bold text-white">{program.avgPlacementCtc}</span>
                <span className="text-xs text-white/40 block mt-1">Reported median package across corporate drives</span>
              </div>

              <div className="bg-[#121212] border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-6">
                <span className="text-xs text-emerald-400 uppercase font-semibold block mb-1">Highest Salary Offered</span>
                <span className="text-3xl font-bold text-emerald-400">{program.highestCtc}</span>
                <span className="text-xs text-emerald-400/70 block mt-1">Highest offer in the previous placement cycle</span>
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Top Hiring Partners & Recruiters
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {program.topRecruiters.map((recruiter, i) => (
                  <div key={i} className="bg-black/50 border border-white/10 rounded-xl p-4 text-center text-xs font-semibold text-white flex items-center justify-center">
                    {recruiter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB CONTENT 5: FAQS ================= */}
        {activeTab === "faqs" && (
          <div className="space-y-4 max-w-4xl">
            {program.faqs && program.faqs.length > 0 ? (
              program.faqs.map((faq, i) => (
                <div key={i} className="bg-[#121212] border border-white/15 rounded-2xl p-6 space-y-2">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#FFE15D] shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-[#121212] border border-white/15 rounded-2xl p-8 text-center text-white/60 text-sm">
                Have specific questions about this course? Connect with an academic counselor on WhatsApp.
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating Compare Dock */}
      <CompareDock />

      {/* Counseling Drawer */}
      <CounselingDrawer
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        defaultProgramName={program.name}
      />

      {/* Brochure Modal */}
      <LeadCaptureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        title={`Download ${program.name} Brochure`}
        subtitle={`Official 2026 fee matrix, syllabus, and placement stats for ${program.university}.`}
        prefilledCourse={program.name}
        prefilledUniversity={program.university}
        source="Program Detail Page"
      />

      <Footer />
    </div>
  );
}
