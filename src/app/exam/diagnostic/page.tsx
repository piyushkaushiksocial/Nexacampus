"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/motion/MagneticButton";

const questions = [
  {
    id: 1,
    question: "When you imagine working on a major project, which role excites you most?",
    options: [
      "Building software apps, AI tools, or solving technical coding challenges.",
      "Leading a team, managing project budgets, and closing business deals.",
      "Designing physical buildings, civil infrastructure, or mechanical hardware.",
      "Creating marketing campaigns, branding, and growing an online business."
    ]
  },
  {
    id: 2,
    question: "What is your main priority for your college degree?",
    options: [
      "Getting the highest paying campus placement in a top tech company.",
      "Flexibility to study online so I can work a job and earn simultaneously.",
      "Learning practical business and management skills to start my own venture.",
      "Getting a Govt-recognized degree to qualify for promotions or study abroad."
    ]
  }
];

export default function DiagnosticExam() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        router.push("/reports/dossier");
      }, 1500);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white px-6 text-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-2 border-white/20 border-t-[#FFE15D] rounded-full mb-6"
        />
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
          Finding Your Best-Fit Courses...
        </h2>
        <p className="text-white/60 text-sm max-w-sm">
          Matching your answers with verified degrees and checking scholarship discounts.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans selection:bg-[#FFE15D] selection:text-black flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0E0E0E]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FFE15D]" />
          <span className="font-semibold text-sm tracking-tight text-white">Course Fit & Scholarship Quiz</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-xs font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Clock className="w-3.5 h-3.5" /> 5 Min Quiz
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1.5 bg-white/10 w-full">
        <motion.div 
          className="h-full bg-[#FFE15D]" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Quiz Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[#FFE15D] text-xs font-semibold uppercase tracking-wider mb-3">
              Step {currentQuestion + 1} of {questions.length}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-8 text-white">
              {questions[currentQuestion].question}
            </h1>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    selectedOption === idx 
                    ? "bg-[#FFE15D]/10 border-[#FFE15D] text-white" 
                    : "bg-[#141414] border-white/10 hover:border-white/30 text-white/80"
                  }`}
                >
                  <div className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    selectedOption === idx ? "border-[#FFE15D] bg-[#FFE15D]" : "border-white/30"
                  }`}>
                    {selectedOption === idx && <div className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                  <span className={`text-sm sm:text-base leading-relaxed ${selectedOption === idx ? "text-white font-medium" : "text-white/70"}`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <span className="text-xs text-white/40">Select one option to continue</span>
              
              <button 
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`px-7 py-3.5 font-semibold text-xs tracking-wide rounded-xl flex items-center gap-2 transition-all ${
                  selectedOption !== null 
                  ? "bg-[#FFE15D] text-black hover:bg-white shadow-md" 
                  : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {currentQuestion === questions.length - 1 ? "See My Course Match" : "Next Question"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
