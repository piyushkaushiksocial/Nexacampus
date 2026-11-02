"use client";

import React, { useState } from "react";
import { Download, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";
import { submitLead, validateIndianPhone } from "@/lib/leads";

export function LeadBanner() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [course, setCourse] = useState("Online MBA");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const { isValid, cleanPhone, error } = validateIndianPhone(phone);
    if (!isValid) {
      setPhoneError(error || "Enter a valid 10-digit mobile number.");
      return;
    }

    await submitLead({
      fullName: "In-Page Guide Applicant",
      phone: cleanPhone,
      targetCourse: course,
      source: "In-Page Lead Strip",
    });

    setInlineSuccess(true);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-white border border-[#14171A]/12 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_-10px_rgba(20,23,26,0.08)]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#BADFDB]/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA4A4]/50 border border-[#14171A]/10 text-[#14171A] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Free 2026 Admissions Pack
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14171A] tracking-tight">
              Get College Fees & Placement Reports on WhatsApp
            </h3>
            <p className="text-[#555E68] text-xs sm:text-sm mt-1 max-w-xl font-medium">
              Get an instant breakdown of semester fees, no-cost EMI options, syllabus modules, and average salaries.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-auto shrink-0">
            {inlineSuccess ? (
              <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-2xl p-5 text-center min-w-[320px]">
                <CheckCircle2 className="w-7 h-7 text-emerald-700 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#14171A]">Guide Dispatched via WhatsApp!</h4>
                <p className="text-xs text-[#555E68] mt-0.5 font-medium">Check your messages on {phone}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-[#FCF9EA] border border-[#14171A]/10 p-2 rounded-2xl shadow-inner">
                <select 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="bg-white border border-[#14171A]/10 rounded-xl px-3 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none"
                >
                  <option value="Online MBA">Online MBA</option>
                  <option value="Online MCA">Online MCA</option>
                  <option value="Online BBA">Online BBA</option>
                  <option value="B.Tech">B.Tech</option>
                </select>

                <div className="flex items-center px-3 py-2 bg-white border border-[#14171A]/10 rounded-xl">
                  <span className="text-[#8A929B] mr-2 text-xs font-mono font-bold">+91</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Number"
                    className="bg-transparent border-none outline-none text-xs text-[#14171A] font-semibold w-full placeholder:text-[#8A929B]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all whitespace-nowrap shadow-xs"
                >
                  Get on WhatsApp
                </button>
              </form>
            )}

            {phoneError && (
              <p className="text-xs text-red-600 font-bold mt-1 text-center sm:text-left">
                {phoneError}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-[#555E68] mt-2 justify-center lg:justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>Zero-Spam Promise: 1 Counselor on WhatsApp • DPDP Act 2023 Compliant</span>
            </div>
          </div>

        </div>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get 2026 College Fee & Placement Brochure"
        subtitle="We will send you fee structures, syllabus breakdowns, and admission dates directly on WhatsApp."
        source="In-Page Lead Strip Modal"
      />
    </>
  );
}
