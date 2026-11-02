"use client";

import { useState } from "react";
import { GraduationCap, Scale, PhoneCall, ChevronRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { UniversityFinderModal } from "@/components/finder/UniversityFinderModal";

export function Header() {
  const { selectedPrograms } = useCompare();
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#FFE15D] flex items-center justify-center text-black font-bold">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-base tracking-tight text-white block">
                NEBSA
              </span>
              <span className="text-[10px] text-white/50 -mt-1 block">College & Degree Guide</span>
            </div>
          </Link>
          
          {/* Main Navigation - Simple Plain English */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
            <Link href="/colleges" className="hover:text-white transition-colors">
              All Courses
            </Link>
            
            <Link href="/compare" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Compare</span>
              {selectedPrograms.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#FFE15D] text-black font-semibold text-[11px]">
                  {selectedPrograms.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsFinderOpen(true)}
              className="text-[#FFE15D] hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find My College</span>
            </button>

            <Link href="/network" className="hover:text-white transition-colors">
              Top Universities
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#FFE15D]" />
              Get Fee Brochure
            </button>

            <button 
              onClick={() => setIsCounselingOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 px-3 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Talk to Counselor (Free)
            </button>

            <button
              onClick={() => setIsFinderOpen(true)}
              className="px-4 py-2 bg-[#FFE15D] text-black font-semibold text-xs rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suggest College (2 Min)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Global AI University Finder Modal */}
      <UniversityFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
      />

      {/* Global Counseling Drawer */}
      <CounselingDrawer
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
      />

      {/* Global Brochure Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Get College Fees & Syllabus on WhatsApp"
        subtitle="We will send you the 2026 fee breakdown, average placement packages, and admission dates."
        source="Header Button"
      />
    </>
  );
}
