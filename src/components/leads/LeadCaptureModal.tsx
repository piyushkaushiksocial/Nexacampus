"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Sparkles,
  Phone,
  Mail,
  User,
  GraduationCap
} from "lucide-react";
import { springConfig } from "@/lib/motion-physics";
import Link from "next/link";

export interface LeadData {
  fullName: string;
  phone: string;
  email: string;
  qualification: string;
  targetCourse: string;
  source: string;
  timestamp: string;
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  prefilledCourse?: string;
  prefilledUniversity?: string;
  source?: string;
  onSuccess?: (data: LeadData) => void;
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  title = "Get College Fees & Syllabus on WhatsApp",
  subtitle = "We will send you the 2026 fee breakdown, syllabus modules, and average placement packages.",
  prefilledCourse = "Online MBA",
  prefilledUniversity = "Top Universities",
  source = "General Enquiry",
  onSuccess
}: LeadCaptureModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("College Student / Graduate");
  const [targetCourse, setTargetCourse] = useState(prefilledCourse);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const qualifications = [
    "Class 12th Student",
    "College Student / Graduate",
    "Working Professional (1-3 yrs)",
    "Senior Professional (3+ yrs)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !fullName) return;

    setIsSubmitting(true);

    const lead: LeadData = {
      fullName,
      phone,
      email,
      qualification,
      targetCourse,
      source: `${source} - ${prefilledUniversity}`,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("nebsa_captured_leads");
      const list = existing ? JSON.parse(existing) : [];
      list.push(lead);
      localStorage.setItem("nebsa_captured_leads", JSON.stringify(list));
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(lead);
    }, 500);
  };

  const handleClose = () => {
    setSubmitted(false);
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={springConfig.tactilePress}
            className="relative w-full max-w-xl bg-[#121212] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFE15D]/5 blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              /* Success Confirmation */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Fee Guide Sent to WhatsApp!
                  </h3>
                  <p className="text-white/70 text-sm mt-1 max-w-sm mx-auto">
                    We&apos;ve sent the 2026 fee breakdown and syllabus for <span className="text-white font-semibold">{targetCourse}</span> to <span className="text-[#FFE15D]">{phone}</span>.
                  </p>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE15D]/15 border border-[#FFE15D]/30 flex items-center justify-center shrink-0 text-[#FFE15D]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-white block truncate">
                      {prefilledUniversity} - Complete_Fee_Guide_2026.pdf
                    </span>
                    <span className="text-[11px] text-white/50 block">Official Syllabus & Approved Fee PDF</span>
                  </div>
                  <button 
                    onClick={() => alert("Downloading PDF guide...")}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save
                  </button>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/exam/diagnostic" onClick={handleClose}>
                    <button className="w-full sm:w-auto px-6 py-3 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Check Scholarship Eligibility (Quiz)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFE15D] mb-1 block">
                  Free College Guide
                </span>

                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                  {title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1 mb-6 leading-relaxed">
                  {subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Course You Want
                      </label>
                      <input
                        type="text"
                        value={targetCourse}
                        onChange={(e) => setTargetCourse(e.target.value)}
                        placeholder="Online MBA, MCA, BBA..."
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFE15D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Education level buttons */}
                  <div>
                    <label className="text-xs font-medium text-white/80 block mb-1.5">
                      Your Current Education Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {qualifications.map((q) => (
                        <button
                          type="button"
                          key={q}
                          onClick={() => setQualification(q)}
                          className={`px-3 py-2 rounded-xl border text-xs text-left truncate transition-colors ${
                            qualification === q
                              ? "bg-white text-black font-semibold border-white"
                              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="flex items-center gap-2 text-xs text-white/50 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your phone number is completely safe. Zero spam calls.</span>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#FFE15D] text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Brochure...</span>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Send Fee & Placement Guide to My WhatsApp
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
