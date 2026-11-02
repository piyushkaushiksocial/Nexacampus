"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, PhoneCall, ShieldCheck, CheckCircle2, UserCheck, Clock } from "lucide-react";
import { springConfig } from "@/lib/motion-physics";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    if (preferredMode === "whatsapp") {
      const message = encodeURIComponent(
        `Hi NEBSA Counselor, I need guidance regarding ${targetDegree}. My goal is: ${selectedGoal}. Name: ${fullName || "Student"}`
      );
      window.open(`https://wa.me/918369938760?text=${message}`, "_blank");
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={springConfig.sheetGlide}
              className="w-screen max-w-md bg-[#121212] border-l border-white/15 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE15D] flex items-center justify-center text-black">
                    <UserCheck className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Talk to a Counselor</h3>
                    <p className="text-xs text-white/60">100% Free & Unbiased Guidance</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">Request Received!</h4>
                    <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
                      Our senior academic counselor will connect with you on WhatsApp ({phone}) within 15 minutes.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 px-6 py-2.5 bg-white text-black text-xs font-semibold rounded-xl hover:bg-[#FFE15D] transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Unbiased Guarantee */}
                    <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-emerald-300">100% Honest Advice</div>
                        <p className="text-[11px] text-white/70 leading-relaxed mt-0.5">
                          Unlike commercial agents, our advisors don&apos;t push whatever college pays high commissions. We guide you based on your budget, Govt recognition, and career goals.
                        </p>
                      </div>
                    </div>

                    {/* Mode Toggle */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-2">How would you like to connect?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredMode("whatsapp")}
                          className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                            preferredMode === "whatsapp"
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          Chat on WhatsApp
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMode("callback")}
                          className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                            preferredMode === "callback"
                              ? "bg-[#FFE15D]/20 border-[#FFE15D]/40 text-[#FFE15D] font-semibold"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          <PhoneCall className="w-4 h-4" />
                          Free Phone Call
                        </button>
                      </div>
                    </div>

                    {/* Target Degree */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1.5">Which course are you interested in?</label>
                      <input
                        type="text"
                        value={targetDegree}
                        onChange={(e) => setTargetDegree(e.target.value)}
                        placeholder="e.g. Online MBA, MCA AI, BBA, B.Tech"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFE15D] transition-colors"
                      />
                    </div>

                    {/* Career Goal */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1.5">What is your main goal?</label>
                      <div className="space-y-1.5">
                        {goals.map((g) => (
                          <label
                            key={g}
                            onClick={() => setSelectedGoal(g)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                              selectedGoal === g
                                ? "bg-white/15 border-white/30 text-white font-medium"
                                : "bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/5"
                            }`}
                          >
                            <input
                              type="radio"
                              name="careerGoal"
                              checked={selectedGoal === g}
                              onChange={() => setSelectedGoal(g)}
                              className="accent-[#FFE15D]"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-white/80 block mb-1">Your Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE15D]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-white/80 block mb-1">WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE15D]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#FFE15D] text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                      {preferredMode === "whatsapp" ? (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Chat with Counselor on WhatsApp
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
              <div className="p-4 border-t border-white/10 text-center text-[11px] text-white/50">
                Helpline Hours: Mon - Sat, 9:30 AM to 7:30 PM • 100% Free
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
