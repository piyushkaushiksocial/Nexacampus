"use client";

import React, { useState } from "react";
import { Download, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function LeadBanner() {
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Online MBA");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      const existing = localStorage.getItem("nebsa_captured_leads");
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        fullName: "Quick Guide Applicant",
        phone,
        targetCourse: course,
        source: "In-Page Lead Strip",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("nebsa_captured_leads", JSON.stringify(list));
    } catch {}

    setInlineSuccess(true);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-[#161616] via-[#121212] to-[#161616] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFE15D]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE15D]/15 border border-[#FFE15D]/30 text-[#FFE15D] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Free 2026 Admissions Pack
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Get College Fees & Placement Reports on WhatsApp
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
              Get an instant breakdown of semester fees, no-cost EMI options, syllabus modules, and average salaries.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-auto shrink-0">
            {inlineSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center min-w-[320px]">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-white">Guide Dispatched via WhatsApp!</h4>
                <p className="text-xs text-white/70 mt-0.5">Check your messages on {phone}</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-3 text-xs text-[#FFE15D] hover:underline font-semibold block mx-auto"
                >
                  Want to check scholarship discount? →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="bg-black/70 border border-white/15 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-[#FFE15D]"
                >
                  <option value="Online MBA">Online MBA</option>
                  <option value="Online MCA (AI)">Online MCA (AI)</option>
                  <option value="Online BBA">Online BBA</option>
                  <option value="Executive MBA">Executive MBA</option>
                  <option value="B.Tech Core">B.Tech Engineering</option>
                </select>

                <div className="flex items-center bg-black/70 border border-white/15 rounded-xl px-3 py-2 sm:py-0 focus-within:border-[#FFE15D]">
                  <span className="text-white/40 text-xs mr-2">+91</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Number"
                    className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 w-full sm:w-36"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 bg-[#FFE15D] text-black font-semibold text-xs tracking-wide rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  Get Guide
                </button>
              </form>
            )}

            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-white/40 mt-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Confidential
              </span>
              <span>•</span>
              <span>No Spam Calls</span>
            </div>
          </div>

        </div>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledCourse={course}
        source="In-Page Banner"
      />
    </>
  );
}
