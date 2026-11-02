"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldAlert, ChevronRight, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/motion/MagneticButton";

const meritQuestions = [
  {
    id: 1,
    question: "A cantilever beam of length L carries a uniformly distributed load w. If the length is doubled while keeping the load constant, by what factor does the maximum bending moment increase?",
    options: ["2 times", "4 times", "8 times", "Remains unchanged"]
  }
];

export default function MeritExam() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000); // Fake scoring delay
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-16 h-16 bg-[#FFE15D]/20 rounded-full flex items-center justify-center mb-6"
        >
          <div className="w-8 h-8 bg-[#FFE15D] rounded-full" />
        </motion.div>
        <h2 className="text-xl font-medium tracking-tight">Calibrating National Percentile...</h2>
        <p className="text-white/40 text-sm mt-2">Connecting to Institutional Scholarship Endowment</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black flex flex-col">
      {/* Strict Proctor Top Bar */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a050a]">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <span className="font-semibold text-sm tracking-tight text-white uppercase flex items-center gap-2">
            NMST Merit Test 
            <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> PROCTORED
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-white/40 text-xs">
            <Video className="w-4 h-4" /> Webcam Active
          </div>
          <div className="flex items-center gap-2 text-[#FFE15D] text-sm font-medium bg-[#FFE15D]/10 px-3 py-1.5 rounded-full border border-[#FFE15D]/20">
            <Clock className="w-4 h-4" /> 00:58
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-white/5 w-full">
        <motion.div className="h-full bg-red-500 w-[95%]" />
      </div>

      {/* Exam Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-2xl w-full z-10">
          <div className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-4">
            Quantitative & Structural Logic (Q35 of 35)
          </div>
          <h1 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white">
            {meritQuestions[0].question}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meritQuestions[0].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                  selectedOption === idx 
                  ? "bg-white/10 border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                  : "bg-[#111111] border-white/10 hover:border-white/30"
                }`}
              >
                <div className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  selectedOption === idx ? "border-white bg-white" : "border-white/30"
                }`}>
                  {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
                <span className={`text-base ${selectedOption === idx ? "text-white font-medium" : "text-white/70 font-light"}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center">
            <div className="text-white/30 text-xs flex items-center gap-2">
              <span>Tab focus locked</span> | <span>Copy-paste disabled</span>
            </div>
            <MagneticButton 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-8 py-4 font-semibold text-sm rounded-xl flex items-center gap-2 transition-all ${
                selectedOption !== null 
                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                : "bg-white/5 text-white/30 cursor-not-allowed"
              }`}
            >
              Submit Exam <ChevronRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </main>
    </div>
  );
}
