"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ShieldCheck, Clock, CheckCircle2, Building2, UploadCloud, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { AnimatedScoreCounter } from "@/components/motion/AnimatedScoreCounter";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black pt-16 pb-24">
      <Header />
      
      {/* Texture overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* Celebration Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#FFE15D]/20 rounded-full flex items-center justify-center mb-4 border border-[#FFE15D]/40">
            <Sparkles className="w-8 h-8 text-[#FFE15D]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1">
            Verification Successful
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-2">
            Congratulations, Aryan!
          </h1>
          <p className="text-white/60 text-base max-w-md">
            Your quiz results and official college scholarship allotment are confirmed below.
          </p>
        </div>

        {/* Certificate Card */}
        <div className="bg-[#121212] border border-[#FFE15D]/40 rounded-3xl p-6 md:p-10 shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE15D]/5 blur-[100px] pointer-events-none" />
          
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <div className="text-emerald-400 text-xs font-medium mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Student Profile Confirmed
              </div>
              <h2 className="text-2xl font-bold text-white">Aryan Sharma</h2>
              <p className="text-white/50 text-xs">Application No: NEB-2026-894102</p>
            </div>
            
            <div className="text-left md:text-right">
              <span className="text-[#FFE15D] text-xs font-semibold uppercase tracking-wider block mb-0.5">
                Your Quiz Score
              </span>
              <div className="text-4xl font-bold text-white flex items-baseline md:justify-end">
                <AnimatedScoreCounter targetValue={94.6} durationMs={2000} />
                <span className="text-xl text-white/50 ml-1">% (Top 5%)</span>
              </div>
            </div>
          </div>

          {/* Details Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/50 border border-white/10 p-5 rounded-2xl">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1 font-medium">Your Best-Fit Course</p>
              <h3 className="text-xl font-semibold text-white mb-1">B.Tech Engineering & Infrastructure</h3>
              <p className="text-white/60 text-xs">Based on your practical problem-solving answers</p>
            </div>

            <div className="bg-[#FFE15D]/10 border border-[#FFE15D]/30 p-5 rounded-2xl relative overflow-hidden">
              <p className="text-[#FFE15D] text-xs uppercase tracking-wider mb-1 font-semibold">Scholarship Grant Allotted</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#FFE15D] mb-1">Up to 100% Fees Free</h3>
              <p className="text-[#FFE15D]/80 text-xs font-medium">Valid across 9 Partner Engineering Colleges</p>
            </div>
          </div>

          {/* Reservation Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-red-500/10 border border-red-500/25 rounded-2xl px-5 py-3.5 gap-3">
            <div className="flex items-center gap-2.5 text-red-400 text-xs font-medium">
              <Clock className="w-4 h-4 animate-pulse shrink-0" />
              <span>Time left to lock your scholarship seat:</span>
            </div>
            <span className="font-mono text-lg font-bold text-red-400">
              71h : 58m : 12s
            </span>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">See Your 3 Matched Colleges</h3>
              <p className="text-white/60 text-sm mb-6 max-w-md leading-relaxed">
                Check the partner universities offering you 40% to 100% scholarships based on your score, location, and budget.
              </p>
            </div>

            <Link href="/colleges">
              <button className="w-full py-3.5 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                Open Matched Colleges <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="col-span-1 bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp Helpline</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Have questions about fees or admission process? Chat directly with an academic counselor.
              </p>
            </div>

            <a
              href="https://wa.me/918369938760?text=Hi%20NEBSA,%20I%20scored%2094.6%%20in%20my%20quiz%20and%20want%20to%20know%20about%20my%20scholarship%20colleges."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
