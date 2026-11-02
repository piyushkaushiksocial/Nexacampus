"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, PhoneCall, ShieldCheck, CheckCircle2, UserCheck, Clock } from "lucide-react";
import { springConfig } from "@/lib/motion-physics";
import { sound } from "@/lib/sound";
import { submitLead, validateIndianPhone } from "@/lib/leads";

interface CounselingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramName?: string;
}

export function CounselingDrawer({ isOpen, onClose, defaultProgramName }: CounselingDrawerProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>("Promotion & Salary Hike");
  const [preferredMode, setPreferredMode] = useState<"whatsapp" | "callback">("whatsapp");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [targetDegree, setTargetDegree] = useState<string>(defaultProgramName || "Online MBA");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const goals = [
    "Promotion & Higher Salary",
    "Switching to an IT / AI Job",
    "Degree to work or settle abroad (WES approved)",
    "Complete my Graduation (BBA / BCA)",
    "Executive & Senior Leadership roles"
  ];

  const [phoneError, setPhoneError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    const { isValid, cleanPhone, error } = validateIndianPhone(phone);
    if (!isValid) {
      setPhoneError(error || "Enter a valid 10-digit mobile number.");
      sound.tick();
      return;
    }

    sound.snap();

    // 1. Persist to server backend first so lead is never leaked
    const result = await submitLead({
      fullName: fullName.trim() || "Prospective Student",
      phone: cleanPhone,
      targetCourse: targetDegree,
      source: `Counseling Drawer (${preferredMode.toUpperCase()} - ${selectedGoal})`,
    });

    if (preferredMode === "whatsapp") {
      const refId = result.leadId || "NEXA-PENDING";
      const message = encodeURIComponent(
        `Hi Harsh (Nexa Campus Admissions Lead - Ref: ${refId}), I need guidance regarding ${targetDegree}. My goal is: ${selectedGoal}. Name: ${fullName || "Student"}`
      );
      window.open(`https://wa.me/918825216881?text=${message}`, "_blank");
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#14171A]/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={springConfig.sheetGlide}
              className="w-screen max-w-md bg-white border-l border-[#14171A]/12 shadow-[0_20px_50px_rgba(20,23,26,0.18)] flex flex-col justify-between text-[#14171A]"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#14171A]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#BADFDB] flex items-center justify-center text-[#14171A]">
                    <UserCheck className="w-5 h-5 text-[#14171A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#14171A]">Talk to Harsh (Admissions Lead)</h3>
                    <p className="text-xs text-[#555E68] font-medium">+91 88252 16881 • 100% Free Guidance</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[#FCF9EA] hover:bg-[#FFA4A4] flex items-center justify-center text-[#555E68] hover:text-[#14171A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-[#BADFDB] rounded-full flex items-center justify-center mx-auto text-[#14171A]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-[#14171A]">Request Received!</h4>
                    <p className="text-sm text-[#555E68] leading-relaxed max-w-xs mx-auto font-medium">
                      Harsh (Senior Academic Advisor) will connect with you on WhatsApp ({phone}) within 15 minutes.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-6 py-2.5 bg-[#14171A] text-[#FCF9EA] text-xs font-bold rounded-xl hover:bg-[#FFA4A4] hover:text-[#14171A] transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Unbiased Guarantee */}
                    <div className="bg-[#BADFDB]/30 border border-[#BADFDB] rounded-2xl p-4 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#14171A]">100% Honest Advice</div>
                        <p className="text-[11px] text-[#555E68] leading-relaxed mt-0.5 font-medium">
                          Unlike commercial agents, our advisors don&apos;t push whatever college pays high commissions. We guide you based on your budget, Govt recognition, and career goals.
                        </p>
                      </div>
                    </div>

                    {/* Mode Toggle */}
                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-2">How would you like to connect?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            sound.tick();
                            setPreferredMode("whatsapp");
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            preferredMode === "whatsapp"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          Chat on WhatsApp
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            sound.tick();
                            setPreferredMode("callback");
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                            preferredMode === "callback"
                              ? "bg-[#FFA4A4] text-[#14171A] border-[#FFA4A4] shadow-xs"
                              : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                          }`}
                        >
                          <PhoneCall className="w-4 h-4" />
                          Free Phone Call
                        </button>
                      </div>
                    </div>

                    {/* Target Degree */}
                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1.5">Which course are you interested in?</label>
                      <input
                        type="text"
                        value={targetDegree}
                        onChange={(e) => setTargetDegree(e.target.value)}
                        placeholder="e.g. Online MBA, MCA AI, BBA, B.Tech"
                        className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-4 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                      />
                    </div>

                    {/* Career Goal */}
                    <div>
                      <label className="text-xs font-bold text-[#14171A] block mb-1.5">What is your main goal?</label>
                      <div className="space-y-1.5">
                        {goals.map((g) => (
                          <label
                            key={g}
                            onClick={() => {
                              sound.tick();
                              setSelectedGoal(g);
                            }}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                              selectedGoal === g
                                ? "bg-[#BADFDB]/40 border-[#BADFDB] text-[#14171A] font-bold"
                                : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name="careerGoal"
                              checked={selectedGoal === g}
                              onChange={() => setSelectedGoal(g)}
                              className="accent-[#14171A]"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#14171A] block mb-1">Your Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3 py-2 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#14171A] block mb-1">WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError("");
                          }}
                          placeholder="10-digit mobile"
                          className={`w-full bg-[#FCF9EA] border rounded-xl px-3 py-2 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 ${
                            phoneError ? "border-red-500 focus:ring-red-400" : "border-[#14171A]/10 focus:ring-[#BADFDB]"
                          }`}
                        />
                        {phoneError && (
                          <p className="text-[10px] text-red-600 font-bold mt-1">
                            {phoneError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#555E68] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Zero Spam: Exactly 1 Counselor. DPDP Act 2023 protected.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
                    >
                      {preferredMode === "whatsapp" ? (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Chat with Harsh on WhatsApp
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          Request Free Callback
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Footer info */}
              <div className="p-4 border-t border-[#14171A]/10 text-center text-[11px] text-[#8A929B] font-medium">
                Helpline Hours: Mon - Sat, 9:30 AM to 7:30 PM • 100% Free
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
