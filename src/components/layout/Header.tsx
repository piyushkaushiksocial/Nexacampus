"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { GraduationCap, Scale, PhoneCall, ChevronRight, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { UniversityFinderModal } from "@/components/finder/UniversityFinderModal";
import { sound } from "@/lib/sound";

export function Header() {
  const { selectedPrograms } = useCompare();
  const { scrollYProgress } = useScroll();

  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#14171A]/[0.08] bg-[#FCF9EA]/90 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo with interactive pop */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-[#FFA4A4] flex items-center justify-center text-[#14171A] font-black shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <GraduationCap className="w-5 h-5 text-[#14171A]" />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-base tracking-tight text-[#14171A] block">
                Nexa Campus
              </span>
              <span className="text-[10px] text-[#555E68] -mt-0.5 block font-mono font-medium">Higher Education Platform</span>
            </div>
          </Link>
          
          {/* Main Navigation (Student-first) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#555E68]">
            <Link href="/colleges" className="hover:text-[#14171A] transition-colors">
              All Courses
            </Link>
            
            <Link href="/compare" className="hover:text-[#14171A] transition-colors flex items-center gap-1.5">
              <span>Compare</span>
              {selectedPrograms.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FFA4A4] text-[#14171A] font-bold text-[11px] font-mono">
                  {selectedPrograms.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                sound.snap();
                setIsFinderOpen(true);
              }}
              className="text-[#14171A] hover:opacity-80 transition-opacity flex items-center gap-1.5 bg-[#BADFDB]/60 hover:bg-[#BADFDB] px-3 py-1 rounded-full border border-[#14171A]/10 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#14171A]" />
              <span>Find College (2m)</span>
            </button>

            <Link href="/network" className="hover:text-[#14171A] transition-colors">
              Accredited Campuses
            </Link>

            {/* Discreet Link For Universities */}
            <Link 
              href="/partners" 
              className="text-xs font-bold text-[#555E68] hover:text-[#14171A] px-2.5 py-1 rounded-lg border border-transparent hover:border-[#14171A]/10 hover:bg-white transition-all flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-[#8A929B]" />
              For Universities
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => {
                sound.snap();
                setIsCounselingOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#14171A] hover:bg-[#BADFDB] px-3.5 py-2 rounded-xl border border-[#14171A]/10 bg-white shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#14171A]" />
              Talk to Harsh (Counselor)
            </button>

            <button
              onClick={() => {
                sound.snap();
                setIsFinderOpen(true);
              }}
              className="px-4 py-2 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suggest College</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Dynamic Scroll Progress Ribbon */}
        <motion.div 
          className="h-[3px] bg-gradient-to-r from-[#BADFDB] via-[#FFA4A4] to-[#14171A] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
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
