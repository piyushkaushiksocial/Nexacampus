"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Phone, 
  User, 
  GraduationCap, 
  Calendar,
  Wallet,
  Scale
} from "lucide-react";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

interface UniversityFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDegree?: string;
}

export function UniversityFinderModal({ isOpen, onClose, defaultDegree }: UniversityFinderModalProps) {
  const { addToCompare } = useCompare();

  // Wizard state: 1 -> 2 -> 3 -> 4 (Lead capture) -> 5 (Recommendations)
  const [step, setStep] = useState<number>(1);

  // User selections
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState<string>(defaultDegree || "PG Courses (Master's)");
  const [selectedProgram, setSelectedProgram] = useState<string>("Online MBA");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹1.5 Lakhs - ₹2.5 Lakhs");
  const [selectedStudyMode, setSelectedStudyMode] = useState<string>("100% Online (Work & Study)");

  // Lead Data
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filter matched programs based on selections
  const matchedPrograms = PROGRAMS_DATA.filter((p) => {
    if (selectedProgram === "Online MBA") return p.category === "Management";
    if (selectedProgram.includes("MCA")) return p.category === "Technology & AI";
    if (selectedProgram.includes("BBA")) return p.category === "Commerce & Finance";
    if (selectedProgram.includes("B.Tech")) return p.category === "Engineering";
    return true;
  }).slice(0, 3);

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !fullName) return;

    setIsSubmitting(true);

    try {
      const existing = localStorage.getItem("nebsa_captured_leads");
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        fullName,
        phone,
        city,
        degreeLevel: selectedDegreeLevel,
        targetCourse: selectedProgram,
        budget: selectedBudget,
        studyMode: selectedStudyMode,
        source: "AI Course & College Finder (2-Min Wizard)",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("nebsa_captured_leads", JSON.stringify(list));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5); // Show instant tailored matches!
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    setFullName("");
    setPhone("");
    setCity("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-[#121212] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top ambient gold glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFE15D]/5 blur-[90px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step Progress Indicator (Steps 1 to 4) */}
            {step < 5 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-white/50 mb-2 font-medium">
                  <span className="text-[#FFE15D] flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI College Finder • Step {step} of 4
                  </span>
                  <span>{step * 25}% Completed</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFE15D] transition-all duration-300" 
                    style={{ width: `${step * 25}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 1: Degree Level */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Which degree level are you looking for?
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Select your degree stage to filter approved universities and eligibility.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { title: "PG Courses (Master's)", desc: "Online MBA, MCA, M.Com, M.Sc Data Science" },
                    { title: "UG Courses (Bachelor's)", desc: "Online BBA, BCA, B.Com, B.Tech Engineering" },
                    { title: "Executive Degrees (1-Year)", desc: "Accelerated Executive MBA for working professionals" },
                    { title: "Job-Ready Certifications", desc: "AI Engineering, Digital Marketing, FinTech" }
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        setSelectedDegreeLevel(item.title);
                        setStep(2);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedDegreeLevel === item.title
                          ? "bg-[#FFE15D]/10 border-[#FFE15D] text-white"
                          : "bg-white/[0.03] border-white/10 hover:border-white/25 text-white/80 hover:bg-white/5"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold text-white block">{item.title}</span>
                        <span className="text-xs text-white/50">{item.desc}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#FFE15D] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Specific Program */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Select your target course
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    What field do you want to specialize in?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "Online MBA (Marketing / Finance / HR)",
                    "Online MCA (Cloud Computing & AI)",
                    "Online BBA (Business & Startups)",
                    "Online BCA (Software Development)",
                    "Executive MBA (Senior Leadership)",
                    "B.Tech Engineering (Infrastructure / Tech)"
                  ].map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => {
                        setSelectedProgram(course);
                        setStep(3);
                      }}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        selectedProgram === course
                          ? "bg-[#FFE15D] text-black border-[#FFE15D]"
                          : "bg-white/[0.03] border-white/10 hover:border-white/30 text-white"
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-white/10">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-[#FFE15D] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Budget & Study Mode */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    What is your approximate budget & study format?
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    We match colleges where fees fit your comfort range with 0% interest EMI options.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 block mb-2">Total Course Budget</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Under ₹1.2 Lakhs",
                      "₹1.2 Lakhs - ₹1.8 Lakhs",
                      "₹1.8 Lakhs - ₹2.5 Lakhs",
                      "Above ₹2.5 Lakhs"
                    ].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                          selectedBudget === b
                            ? "bg-white text-black border-white font-semibold"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 block mb-2">Preferred Study Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "100% Online (Work & Study)",
                      "Campus Regular Full-Time"
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedStudyMode(m)}
                        className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                          selectedStudyMode === m
                            ? "bg-[#FFE15D]/20 border-[#FFE15D] text-[#FFE15D] font-semibold"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors"
                  >
                    Next: View My Matched Colleges →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Frictionless Lead Capture */}
            {step === 4 && (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
                    Almost Done!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                    Where should we send your matched college list & fee guide?
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Get the 3 best-fit approved universities for <span className="text-white font-semibold">{selectedProgram}</span> sent straight to your WhatsApp.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-white/80 block mb-1">
                      Your Full Name *
                    </label>
                    <div className="flex items-center bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#FFE15D]">
                      <User className="w-4 h-4 text-white/40 mr-2 shrink-0" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/80 block mb-1">
                      WhatsApp Number (for instant brochure & fee breakdown) *
                    </label>
                    <div className="flex items-center bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 focus-within:border-[#FFE15D]">
                      <span className="text-white/40 text-xs mr-2 font-mono">+91</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/80 block mb-1">
                      Your Current City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#FFE15D] text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Matching Colleges...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Show My Top 3 Matched Universities
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 mt-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero spam guarantee. 100% free guidance from verified counselors.</span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 5: Instant Matched Results! */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    Here Are Your Top Matched Colleges!
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Based on your budget ({selectedBudget}) and goal for <span className="text-white font-medium">{selectedProgram}</span>.
                  </p>
                </div>

                {/* List of matched cards */}
                <div className="space-y-3">
                  {matchedPrograms.map((prog) => (
                    <div 
                      key={prog.id}
                      className="bg-black/50 border border-white/15 hover:border-white/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FFE15D]/15 text-[#FFE15D]">
                            {prog.nebsaScholarship.maxWaiver} Fee Waiver Open
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium">UGC-DEB Approved</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">{prog.name}</h4>
                        <p className="text-xs text-white/50">{prog.university}</p>
                        <div className="flex items-center gap-3 text-xs text-white/70 pt-1">
                          <span>Total: <strong className="text-white">₹{(prog.totalFee / 100000).toFixed(2)}L</strong></span>
                          <span>•</span>
                          <span>EMI: <strong className="text-white">₹{prog.emiStartsAt}/mo</strong></span>
                          <span>•</span>
                          <span>Avg CTC: <strong className="text-emerald-400">{prog.avgPlacementCtc}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <Link 
                          href={`/colleges/${prog.id}`}
                          onClick={handleReset}
                          className="flex-1 sm:flex-initial"
                        >
                          <button className="w-full px-3.5 py-2 bg-white text-black text-xs font-semibold rounded-xl hover:bg-[#FFE15D] transition-colors">
                            View Syllabus
                          </button>
                        </Link>

                        <button
                          onClick={() => {
                            addToCompare(prog);
                            alert(`Added ${prog.shortName} to your compare dock!`);
                          }}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
                          title="Add to compare matrix"
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <a
                    href={`https://wa.me/918369938760?text=Hi%20NEBSA,%20I%20used%20the%20AI%20College%20Finder%20for%20${encodeURIComponent(selectedProgram)}.%20Please%20guide%20me%20with%20admissions.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Chat with Advisor for These Colleges
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
