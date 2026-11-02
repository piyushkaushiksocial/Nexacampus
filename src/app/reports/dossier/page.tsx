"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ShieldCheck, HardHat, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CareerDossier() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE15D]/15 border border-[#FFE15D]/30 text-[#FFE15D] text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> Your Course Assessment Result
          </div>
          
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8">
            Great News! We Found Your <span className="text-[#FFE15D]">Best-Fit Course.</span>
          </h1>

          <div className="border border-white/15 bg-[#121212] rounded-3xl p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE15D]/5 blur-[80px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Recommended Course</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white flex items-center gap-2.5">
                  <HardHat className="w-7 h-7 text-[#FFE15D]" /> B.Tech Engineering & Infrastructure
                </h2>
                <p className="text-white/60 text-xs mt-1">Secondary match: Online MBA in Project Management</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/25 px-4 py-3 rounded-2xl text-center">
                <p className="text-emerald-400 text-xs uppercase font-medium">Career Fit</p>
                <span className="text-3xl font-bold text-white">88%</span>
              </div>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Why this course is right for you
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Your answers show strong problem-solving ability, practical thinking, and leadership. You will excel in fields where design, project planning, and technology come together.
              </p>
              
              <div className="flex items-start gap-3 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-xs">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-red-400 font-semibold">Important College Tip:</strong> Many generic colleges charge high fees without proper campus recruitment. We only connect you with colleges where core placement drives (L&amp;T, Tata, Infosys) are active.
                </p>
              </div>
            </div>

            {/* Next Step Banner */}
            <div className="border-t border-white/10 pt-8 flex flex-col items-center text-center">
              <span className="text-[#FFE15D] text-xs font-semibold uppercase tracking-wider mb-2">
                Scholarship Unlocked
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                You Qualify for up to a 100% Scholarship
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-lg">
                Your score entitles you to reserve an institutional scholarship seat across our partner colleges.
              </p>

              <Link href="/dashboard">
                <button className="px-8 py-4 bg-[#FFE15D] text-black font-semibold text-sm rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-lg">
                  View My Scholarship Allotment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
