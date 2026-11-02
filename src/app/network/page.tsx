"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Cpu, HardHat, TrendingUp, Scale, Building2, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

const springReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6 }
  })
};

export default function AccreditedNetwork() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16">
      <Header />

      {/* Subtle overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col items-center text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 mb-6 text-xs font-medium text-[#FFE15D]">
            <ShieldCheck className="w-4 h-4 text-[#FFE15D]" />
            Verified & Approved Universities
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            We don&apos;t list 5,000 random colleges.<br />
            <span className="text-[#FFE15D]">We list the ones with verified placements.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/60 max-w-2xl font-normal leading-relaxed">
            A college name doesn&apos;t help if the branch has no campus hiring. We only partner with accredited institutions where your specific course gets active corporate recruitment drives.
          </p>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          
          {/* Card 1: Tech */}
          <div className="col-span-1 md:col-span-2 border border-white/15 bg-[#121212] rounded-3xl p-8 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">Technology & AI Hubs</h3>
                  <p className="text-white/60 text-xs">Computer Science, MCA, Cloud & AI</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/10 text-xs text-white/80 rounded-full">14 Approved Campuses</span>
            </div>

            <p className="text-white/70 text-sm mb-6 max-w-md leading-relaxed">
              Universities with modern cloud computing labs and verified campus placement packages starting from ₹8.5 LPA in companies like Amazon, Infosys, and Cognizant.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">Manipal University Jaipur</span>
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">Jain University Online</span>
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">Chandigarh University</span>
            </div>
          </div>

          {/* Card 2: Core Engineering */}
          <div className="col-span-1 border border-white/15 bg-[#121212] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 w-fit mb-6 text-orange-400">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Core Engineering</h3>
              <p className="text-white/60 text-xs mb-4">Civil, Mechanical & Infrastructure</p>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Specialized campuses with active corporate recruitment tie-ups with L&amp;T Construction and Tata Projects.
              </p>
            </div>

            <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white w-fit">
              Shivalik Institute of Technology
            </span>
          </div>

          {/* Card 3: Business & Management */}
          <div className="col-span-1 border border-white/15 bg-[#121212] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#FFE15D]/15 rounded-xl border border-[#FFE15D]/30 w-fit mb-6 text-[#FFE15D]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Management & FinTech</h3>
              <p className="text-white/60 text-xs mb-4">Online MBA, BBA, Executive MBA</p>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Programs with Harvard case-study pedagogy and hiring drives from Big 4 consulting and private banks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">NMIMS Global</span>
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">DPU Pune</span>
            </div>
          </div>

          {/* Card 4: Law & Policy */}
          <div className="col-span-1 md:col-span-2 border border-white/15 bg-[#121212] rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">Corporate Law & Design</h3>
                  <p className="text-white/60 text-xs">BA LLB, Cyber Law, UI/UX Design</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/10 text-xs text-white/80 rounded-full">Bar Council & UGC Approved</span>
            </div>

            <p className="text-white/70 text-sm mb-6 max-w-md leading-relaxed">
              Approved schools featuring operational Moot Courts, corporate law firm recruitment networks, and modern design labs.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">National Policy Institute</span>
              <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white">Amity University Online</span>
            </div>
          </div>

        </div>

        {/* ================= CTA SECTION ================= */}
        <div className="rounded-3xl border border-[#FFE15D]/30 bg-gradient-to-b from-[#1A1500] to-[#0E0E0E] p-10 sm:p-14 text-center">
          <ShieldCheck className="w-10 h-10 text-[#FFE15D] mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-3">
            Find the College Offering You the Best Scholarship
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm sm:text-base mb-8 leading-relaxed">
            Take the 5-minute course fit quiz to see which approved universities match your budget and offer up to a 100% scholarship.
          </p>
          
          <Link href="/exam/diagnostic">
            <button className="px-8 py-4 bg-[#FFE15D] text-black font-semibold text-sm rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg">
              Check My Scholarship Eligibility (Free)
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
