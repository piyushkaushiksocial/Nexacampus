"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Program } from "@/data/programs";
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
  ArrowRight
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { CompareDock } from "@/components/compare/CompareDock";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { sound } from "@/lib/sound";

export function ProgramDetailView({ program }: { program: Program }) {
  const { addToCompare, removeFromCompare, isComparing } = useCompare();
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "syllabus" | "fees" | "placements" | "faqs">("overview");

  const inCompare = isComparing(program.id);

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] pt-16">
      <Header />

      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-[#14171A]/10 bg-[#F6F2DE] py-3 px-6 text-xs text-[#555E68]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#14171A] transition-colors font-medium">Home</Link>
            <span>/</span>
            <Link href="/colleges" className="hover:text-[#14171A] transition-colors font-medium">Courses</Link>
            <span>/</span>
            <span className="text-[#14171A] font-bold truncate max-w-[200px] sm:max-w-none">{program.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.snap();
                inCompare ? removeFromCompare(program.id) : addToCompare(program);
              }}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                inCompare
                  ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                  : "bg-white border-[#14171A]/10 text-[#14171A] hover:border-[#14171A]/30"
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
        <div className="bg-white border border-[#14171A]/12 rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-[0_16px_40px_-8px_rgba(20,23,26,0.06)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#BADFDB]/20 blur-[100px] pointer-events-none" />

          {program.coverImage && (
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-8 border border-[#14171A]/10 shadow-xs">
              <Image 
                src={program.coverImage} 
                alt={program.name} 
                fill 
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#BADFDB] text-[#14171A] border border-[#14171A]/10">
                  {program.degreeLevel} • {program.mode}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#FCF9EA] border border-[#14171A]/10 text-[#14171A] font-semibold">
                  {program.duration}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-800 font-bold border border-emerald-600/20">
                  {program.examMode}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#14171A] leading-tight">
                {program.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#555E68]">
                <div className="flex items-center gap-1.5 font-bold text-[#14171A]">
                  <Building2 className="w-4 h-4 text-[#FFA4A4]" />
                  <span>{program.university}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8A929B]" />
                  <span>{program.location}</span>
                </div>
                {program.nirfRank && (
                  <>
                    <span>•</span>
                    <span className="text-[#14171A] font-bold bg-[#BADFDB]/40 px-2 py-0.5 rounded">{program.nirfRank}</span>
                  </>
                )}
              </div>

              {/* Accreditations tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {program.accreditations.map((acc, i) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 rounded-lg bg-[#FCF9EA] border border-[#14171A]/10 text-[#14171A]">
                    ✓ {acc}
                  </span>
                ))}
              </div>

              <p className="text-[#555E68] text-sm sm:text-base leading-relaxed pt-2 font-medium">
                {program.bestFor}
              </p>
            </div>

            {/* Right 4 Cols: Quick Fee Card */}
            <div className="lg:col-span-4 bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-xs text-[#555E68] font-bold uppercase tracking-wider block mb-1">Total Course Fee</span>
                <div className="text-3xl font-black text-[#14171A] flex items-baseline gap-2">
                  ₹{program.totalFee.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-[#8A929B]">all semesters</span>
                </div>
                <span className="text-xs text-emerald-700 font-bold block mt-1">
                  0% EMI starts at ₹{program.emiStartsAt.toLocaleString("en-IN")}/month
                </span>
              </div>

              {/* Scholarship Highlight */}
              <div className="bg-[#BADFDB]/40 border border-[#BADFDB] rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#14171A] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFA4A4]" />
                    {program.nexaScholarship.maxWaiver} Scholarship
                  </span>
                  <span className="text-red-700 font-bold">{program.nexaScholarship.seatsRemaining} seats left</span>
                </div>
                <p className="text-[#555E68] text-[11px] font-medium">
                  Direct counseling with official admission desk.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    sound.snap();
                    setIsBrochureModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Get Syllabus & Fee PDF
                </button>

                <button
                  onClick={() => {
                    sound.snap();
                    setIsCounselingOpen(true);
                  }}
                  className="w-full py-2.5 bg-white hover:bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  Talk to Counselor (Free)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= STICKY SECTION TABS ================= */}
        <div className="sticky top-16 z-30 bg-[#FCF9EA]/95 backdrop-blur-md border-b border-[#14171A]/10 mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2">
          {[
            { id: "overview", label: "Overview & USPs" },
            { id: "syllabus", label: "Curriculum & Syllabus" },
            { id: "fees", label: "Fees & EMI Calculator" },
            { id: "placements", label: "Placements & Companies" },
            { id: "faqs", label: "Frequently Asked Questions" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.tick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#14171A] text-[#FCF9EA] shadow-xs"
                  : "text-[#555E68] hover:text-[#14171A] hover:bg-white"
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
                <div key={index} className="bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FFA4A4] flex items-center justify-center text-[#14171A] mb-4 font-black text-xs">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#14171A] mb-2">Program Pillar</h3>
                  <p className="text-sm text-[#555E68] leading-relaxed font-medium">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Eligibility & Admission Process */}
            <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#14171A] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                Eligibility Criteria & Who Can Apply
              </h2>
              <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-5 mb-6 text-sm text-[#14171A] font-semibold leading-relaxed">
                {program.eligibility}
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#555E68] mb-3">
                Available Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.specializations.map((spec, i) => (
                  <span key={i} className="px-3.5 py-2 rounded-xl bg-[#FCF9EA] border border-[#14171A]/10 text-xs text-[#14171A] font-bold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Student Reviews */}
            {program.reviews && program.reviews.length > 0 && (
              <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-[#14171A] mb-6">
                  Verified Student Experiences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {program.reviews.map((rev, i) => (
                    <div key={i} className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-[#14171A] text-sm block">{rev.author}</span>
                          <span className="text-xs text-[#555E68] font-medium">{rev.role}</span>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#BADFDB] text-[#14171A]">
                          ✓ Verified Student
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed font-medium">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-[#14171A]">Semester-Wise Syllabus & Subjects</h2>
                <p className="text-xs text-[#555E68] mt-1 font-medium">Curriculum updated for 2026-27 academic session</p>
              </div>

              <button
                onClick={() => {
                  sound.snap();
                  setIsBrochureModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Complete Syllabus PDF
              </button>
            </div>

            {program.syllabus ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {program.syllabus.map((sem, i) => (
                  <div key={i} className="bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#BADFDB]/60 px-3 py-1 rounded-full border border-[#14171A]/10 inline-block mb-3">
                      {sem.semester}
                    </span>
                    <ul className="space-y-2.5">
                      {sem.subjects.map((sub, j) => (
                        <li key={j} className="text-xs sm:text-sm text-[#555E68] font-medium flex items-start gap-2">
                          <span className="text-[#FFA4A4] font-bold mt-0.5">•</span>
                          <span className="text-[#14171A]">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#14171A]/10 rounded-2xl p-8 text-center text-[#555E68] text-sm font-medium">
                Syllabus details available in the official downloadable brochure.
              </div>
            )}
          </div>
        )}

        {/* ================= TAB CONTENT 3: FEES & EMI ================= */}
        {activeTab === "fees" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-[#555E68] font-bold uppercase block mb-1">One-Time / Total Fees</span>
                <span className="text-2xl font-black text-[#14171A]">₹{program.totalFee.toLocaleString("en-IN")}</span>
                <span className="text-xs text-[#8A929B] block mt-1">Covers all semester tuition and digital LMS</span>
              </div>

              <div className="bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-[#555E68] font-bold uppercase block mb-1">Per-Semester Fee</span>
                <span className="text-2xl font-black text-[#14171A]">₹{program.semesterFee.toLocaleString("en-IN")}</span>
                <span className="text-xs text-[#8A929B] block mt-1">Payable in equal semester installments</span>
              </div>

              <div className="bg-white border border-[#FFA4A4] rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-[#14171A] uppercase font-bold block mb-1">0% Interest Monthly EMI</span>
                <span className="text-2xl font-black text-[#14171A]">From ₹{program.emiStartsAt}/mo</span>
                <span className="text-xs text-[#555E68] font-medium block mt-1">Paperless 10-minute digital approval</span>
              </div>
            </div>

            {/* Embedded Live Calculator */}
            <div className="border border-[#14171A]/10 rounded-3xl overflow-hidden">
              <RoiCalculator initialFee={program.totalFee} initialProgramName={program.name} />
            </div>
          </div>
        )}

        {/* ================= TAB CONTENT 4: PLACEMENTS ================= */}
        {activeTab === "placements" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#14171A]/10 rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-[#555E68] font-bold uppercase block mb-1">Average Salary (CTC)</span>
                <span className="text-3xl font-black text-[#14171A]">{program.avgPlacementCtc}</span>
                <span className="text-xs text-[#8A929B] block mt-1">Reported median package across corporate drives</span>
              </div>

              <div className="bg-white border border-[#BADFDB] rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-emerald-800 uppercase font-bold block mb-1">Highest Salary Offered</span>
                <span className="text-3xl font-black text-emerald-700">{program.highestCtc}</span>
                <span className="text-xs text-[#555E68] font-medium block mt-1">Highest offer in the previous placement cycle</span>
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-[#14171A] mb-4">
                Top Hiring Partners & Recruiters
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {program.topRecruiters.map((recruiter, i) => (
                  <div key={i} className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl p-4 text-center text-xs font-bold text-[#14171A] flex items-center justify-center">
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
                <div key={i} className="bg-white border border-[#14171A]/10 rounded-2xl p-6 space-y-2 shadow-xs">
                  <h3 className="text-base font-bold text-[#14171A] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#FFA4A4] shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed pl-6 font-medium">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#14171A]/10 rounded-2xl p-8 text-center text-[#555E68] text-sm font-medium">
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
