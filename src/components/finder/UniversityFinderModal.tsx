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
  Scale,
  ShieldCheck
} from "lucide-react";
import { PROGRAMS_DATA, Program } from "@/data/programs";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { sound } from "@/lib/sound";
import { submitLead, validateIndianPhone } from "@/lib/leads";

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
  const [selectedProgram, setSelectedProgram] = useState<string>("MBA (Management & Tech)");
  const [selectedBudget, setSelectedBudget] = useState<string>("₹1.5 Lakhs - ₹2.5 Lakhs");
  const [selectedStudyMode, setSelectedStudyMode] = useState<string>("Campus Full-Time");

  // Lead Data
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filter matched programs based on selections
  const matchedPrograms = PROGRAMS_DATA.filter((p) => {
    if (selectedProgram.includes("MBA")) return p.category === "Management";
    if (selectedProgram.includes("MCA") || selectedProgram.includes("BCA")) return p.category === "Technology & AI";
    if (selectedProgram.includes("BBA")) return p.category === "Commerce & Finance";
    if (selectedProgram.includes("B.Tech")) return p.category === "Engineering";
    return true;
  }).slice(0, 3);

  const handleNext = () => {
    sound.snap();
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const [formError, setFormError] = useState("");

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const { isValid, cleanPhone, error } = validateIndianPhone(phone);
    if (!isValid) {
      setFormError(error || "Enter a valid 10-digit mobile number.");
      sound.tick();
      return;
    }

    if (!fullName.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    sound.snap();
    setIsSubmitting(true);

    await submitLead({
      fullName: fullName.trim(),
      phone: cleanPhone,
      qualification: selectedDegreeLevel,
      targetCourse: selectedProgram,
      source: `Nexa AI College Finder - ${city || "All India"} (${selectedStudyMode})`,
    });

    sound.chime();
    setIsSubmitting(false);
    setStep(5); // Show instant tailored matches!
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
            className="fixed inset-0 bg-[#14171A]/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white border border-[#14171A]/12 rounded-3xl p-6 sm:p-8 shadow-[0_24px_60px_-10px_rgba(20,23,26,0.18)] z-10 overflow-hidden text-[#14171A]"
          >
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#BADFDB]/30 blur-[90px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FCF9EA] hover:bg-[#FFA4A4] flex items-center justify-center text-[#555E68] hover:text-[#14171A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step Progress Indicator (Steps 1 to 4) */}
            {step < 5 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-[#555E68] mb-2 font-bold">
                  <span className="text-[#14171A] flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFA4A4]" />
                    AI College Finder • Step {step} of 4
                  </span>
                  <span>{step * 25}% Completed</span>
                </div>
                <div className="h-1.5 bg-[#FCF9EA] border border-[#14171A]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FFA4A4] transition-all duration-300" 
                    style={{ width: `${step * 25}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 1: Degree Level */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#14171A] tracking-tight">
                    Which degree level are you looking for?
                  </h3>
                  <p className="text-xs text-[#555E68] mt-1 font-medium">
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
                        sound.tick();
                        setSelectedDegreeLevel(item.title);
                        setStep(2);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedDegreeLevel === item.title
                          ? "bg-[#BADFDB]/40 border-[#BADFDB] text-[#14171A] font-bold shadow-xs"
                          : "bg-[#FCF9EA] border-[#14171A]/10 hover:border-[#14171A]/25 text-[#14171A] hover:bg-white"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#14171A] block">{item.title}</span>
                        <span className="text-xs text-[#555E68] font-medium">{item.desc}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#14171A] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Specific Program */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#14171A] tracking-tight">
                    Select your target course
                  </h3>
                  <p className="text-xs text-[#555E68] mt-1 font-medium">
                    What field do you want to specialize in?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    "MBA (Marketing / Finance / HR)",
                    "MCA (Cloud Computing & AI)",
                    "BBA (Business & Startups)",
                    "BCA (Software Development)",
                    "Executive MBA (Leadership)",
                    "B.Tech Engineering (Tech & Core)"
                  ].map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => {
                        sound.tick();
                        setSelectedProgram(course);
                        setStep(3);
                      }}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                        selectedProgram === course
                          ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                          : "bg-[#FCF9EA] border-[#14171A]/10 hover:border-[#14171A]/30 text-[#14171A] hover:bg-white"
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#14171A]/10">
                  <button
                    onClick={() => {
                      sound.tick();
                      setStep(1);
                    }}
                    className="text-xs text-[#555E68] hover:text-[#14171A] font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      sound.tick();
                      setStep(3);
                    }}
                    className="px-5 py-2.5 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors"
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
                  <h3 className="text-xl sm:text-2xl font-black text-[#14171A] tracking-tight">
                    What is your approximate budget & study format?
                  </h3>
                  <p className="text-xs text-[#555E68] mt-1 font-medium">
                    We match colleges where fees fit your comfort range with 0% interest EMI options.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#14171A] block mb-2">Total Course Budget</label>
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
                        onClick={() => {
                          sound.tick();
                          setSelectedBudget(b);
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedBudget === b
                            ? "bg-[#BADFDB] text-[#14171A] border-[#BADFDB] shadow-xs"
                            : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#14171A] block mb-2">Preferred Study Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Campus Full-Time",
                      "Flexible / Hybrid Learning"
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          sound.tick();
                          setSelectedStudyMode(m);
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedStudyMode === m
                            ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                            : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-[#14171A]/10">
                  <button
                    onClick={() => {
                      sound.tick();
                      setStep(2);
                    }}
                    className="text-xs text-[#555E68] hover:text-[#14171A] font-bold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      sound.tick();
                      setStep(4);
                    }}
                    className="px-6 py-2.5 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors"
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
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3 py-1 rounded-full border border-[#14171A]/10 mb-2 inline-block">
                    Almost Done!
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#14171A] tracking-tight leading-snug">
                    Where should we send your matched college list & fee guide?
                  </h3>
                  <p className="text-xs text-[#555E68] mt-1 font-medium">
                    Get the 3 best-fit approved universities for <span className="text-[#14171A] font-bold">{selectedProgram}</span> sent straight to your WhatsApp.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      Your Full Name *
                    </label>
                    <div className="flex items-center bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-[#FFA4A4]">
                      <User className="w-4 h-4 text-[#8A929B] mr-2 shrink-0" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="bg-transparent border-none outline-none text-xs text-[#14171A] font-bold placeholder:text-[#8A929B] w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      WhatsApp Number (for instant brochure & fee breakdown) *
                    </label>
                    <div className="flex items-center bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-[#FFA4A4]">
                      <span className="text-[#8A929B] text-xs mr-2 font-mono font-bold">+91</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="bg-transparent border-none outline-none text-xs text-[#14171A] font-bold placeholder:text-[#8A929B] w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      Your Current City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#FFA4A4]"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-600 font-bold">
                      {formError}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-[11px] text-[#555E68]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Zero-Spam: 1 Verified Counselor on WhatsApp. DPDP Act 2023 protected.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
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

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#555E68] mt-3 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero spam guarantee. 100% free guidance from verified counselors.</span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 5: Instant Matched Results! */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#BADFDB] flex items-center justify-center text-[#14171A] mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#14171A]">
                    Here Are Your Top Matched Colleges!
                  </h3>
                  <p className="text-xs text-[#555E68] mt-1 font-medium">
                    Based on your budget ({selectedBudget}) and goal for <span className="text-[#14171A] font-bold">{selectedProgram}</span>.
                  </p>
                </div>

                {/* List of matched cards */}
                <div className="space-y-3">
                  {matchedPrograms.map((prog) => (
                    <div 
                      key={prog.id}
                      className="bg-[#FCF9EA] border border-[#14171A]/10 hover:border-[#14171A]/25 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFA4A4] text-[#14171A]">
                            {prog.nexaScholarship.maxWaiver} Fee Waiver Open
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">UGC-DEB Approved</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#14171A]">{prog.name}</h4>
                        <p className="text-xs text-[#555E68] font-medium">{prog.university}</p>
                        <div className="flex items-center gap-3 text-xs text-[#555E68] pt-1">
                          <span>Total: <strong className="text-[#14171A]">₹{(prog.totalFee / 100000).toFixed(2)}L</strong></span>
                          <span>•</span>
                          <span>EMI: <strong className="text-[#14171A]">₹{prog.emiStartsAt}/mo</strong></span>
                          <span>•</span>
                          <span>Avg CTC: <strong className="text-emerald-700">{prog.avgPlacementCtc}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <Link 
                          href={`/colleges/${prog.id}`}
                          onClick={handleReset}
                          className="flex-1 sm:flex-initial"
                        >
                          <button className="w-full px-3.5 py-2 bg-[#14171A] text-[#FCF9EA] text-xs font-bold rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors">
                            View Syllabus
                          </button>
                        </Link>

                        <button
                          onClick={() => {
                            sound.snap();
                            addToCompare(prog);
                          }}
                          className="px-3 py-2 bg-white border border-[#14171A]/10 hover:bg-[#BADFDB] text-[#14171A] rounded-xl text-xs font-bold transition-colors"
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
                    href={`https://wa.me/918825216881?text=Hi%20Harsh,%20I%20used%20the%20Nexa%20College%20Finder%20for%20${encodeURIComponent(selectedProgram)}.%20Please%20guide%20me%20with%20admissions.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-[#BADFDB] hover:bg-[#BADFDB]/80 text-[#14171A] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Chat with Harsh on WhatsApp
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-3 bg-[#FCF9EA] border border-[#14171A]/10 text-[#14171A] text-xs font-bold rounded-xl hover:bg-white transition-colors"
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
