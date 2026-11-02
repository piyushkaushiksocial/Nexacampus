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
import { sound } from "@/lib/sound";

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
  const [phoneError, setPhoneError] = useState("");

  const qualifications = [
    "Class 12th Student",
    "College Student / Graduate",
    "Working Professional (1-3 yrs)",
    "Senior Professional (3+ yrs)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).");
      return;
    }

    if (!fullName.trim()) return;

    sound.snap();
    setIsSubmitting(true);

    const lead: LeadData = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email.trim(),
      qualification,
      targetCourse,
      source: `${source} - ${prefilledUniversity}`,
      timestamp: new Date().toISOString()
    };

    // 1. Post to Server API Route
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.warn("Backend lead sync warning, saving to local backup:", err);
    }

    // 2. Client-side local backup
    try {
      const existing = localStorage.getItem("nexa_captured_leads");
      const list = existing ? JSON.parse(existing) : [];
      list.push(lead);
      localStorage.setItem("nexa_captured_leads", JSON.stringify(list));
    } catch {}

    setTimeout(() => {
      sound.chime();
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(lead);
    }, 400);
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
            className="fixed inset-0 bg-[#14171A]/40 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={springConfig.tactilePress}
            className="relative w-full max-w-xl bg-white border border-[#14171A]/15 rounded-3xl p-6 sm:p-8 shadow-[0_24px_60px_-10px_rgba(20,23,26,0.18)] z-10 overflow-hidden text-[#14171A]"
          >
            {/* Ambient pastel glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#BADFDB]/30 blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FCF9EA] hover:bg-[#FFA4A4] flex items-center justify-center text-[#555E68] hover:text-[#14171A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              /* Success Confirmation */
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#BADFDB] flex items-center justify-center mx-auto text-[#14171A]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#14171A] tracking-tight">
                    Fee Guide Sent to WhatsApp!
                  </h3>
                  <p className="text-[#555E68] text-sm mt-1 max-w-sm mx-auto font-medium">
                    We&apos;ve sent the 2026 fee breakdown and syllabus for <span className="text-[#14171A] font-bold">{targetCourse}</span> to <span className="text-[#14171A] font-bold underline">{phone}</span>.
                  </p>
                </div>

                <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4 max-w-md mx-auto text-left flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFA4A4] flex items-center justify-center shrink-0 text-[#14171A]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#14171A] block truncate">
                      {prefilledUniversity} - Complete_Fee_Guide_2026.pdf
                    </span>
                    <span className="text-[11px] text-[#555E68] block">Official Syllabus & Approved Fee PDF</span>
                  </div>
                  <button 
                    onClick={() => alert("Downloading PDF guide...")}
                    className="px-3 py-1.5 bg-white border border-[#14171A]/10 hover:bg-[#BADFDB] text-[#14171A] rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save
                  </button>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/colleges" onClick={handleClose}>
                    <button className="w-full sm:w-auto px-6 py-3 bg-[#14171A] text-[#FCF9EA] font-bold text-xs rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Explore All Courses
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-3 bg-[#FCF9EA] border border-[#14171A]/10 text-[#14171A] text-xs font-bold rounded-xl hover:bg-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3 py-1 rounded-full border border-[#14171A]/10 mb-2 inline-block">
                  Free College Guide
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#14171A] tracking-tight leading-snug">
                  {title}
                </h3>
                <p className="text-[#555E68] text-xs sm:text-sm mt-1 mb-6 leading-relaxed font-medium">
                  {subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#FFA4A4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="10-digit mobile (e.g. 9876543210)"
                        className={`w-full bg-[#FCF9EA] border rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 transition-all ${
                          phoneError ? "border-red-500 focus:ring-red-400" : "border-[#14171A]/10 focus:ring-[#FFA4A4]"
                        }`}
                      />
                      {phoneError && (
                        <p className="text-[11px] text-red-600 font-bold mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Course */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#FFA4A4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1">
                        Course You Want
                      </label>
                      <input
                        type="text"
                        value={targetCourse}
                        onChange={(e) => setTargetCourse(e.target.value)}
                        placeholder="Online MBA, MCA, BBA..."
                        className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#FFA4A4] transition-all"
                      />
                    </div>
                  </div>

                  {/* Education level buttons */}
                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1.5">
                      Your Current Education Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {qualifications.map((q) => (
                        <button
                          type="button"
                          key={q}
                          onClick={() => setQualification(q)}
                          className={`px-3 py-2 rounded-xl border text-xs text-left truncate transition-colors font-semibold ${
                            qualification === q
                              ? "bg-[#BADFDB] text-[#14171A] border-[#BADFDB] shadow-xs"
                              : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust badge & DPDP compliance */}
                  <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-xl p-3 space-y-1 text-[11px] text-[#14171A]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Zero-Spam Guarantee: Exactly 1 Dedicated Advisor via WhatsApp</span>
                    </div>
                    <p className="text-[#555E68] text-[10px] leading-tight">
                      Protected under India&apos;s DPDP Act 2023. Your number is never shared with telecallers or third-party call centers.
                    </p>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-sm"
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
