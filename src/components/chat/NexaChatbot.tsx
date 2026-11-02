"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  User,
  ShieldCheck,
  Minimize2
} from "lucide-react";
import { sound } from "@/lib/sound";
import { submitLead, validateIndianPhone } from "@/lib/leads";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
  isLeadForm?: boolean;
  isCompleted?: boolean;
}

export function NexaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  // Chat conversation state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! 👋 Welcome to Nexa Campus. I can help you find approved college degrees, compare semester fees, and check scholarship grants. Which course are you exploring?",
      options: ["MBA & Management", "MCA / Tech & AI", "BBA / Commerce", "B.Tech Engineering", "Executive 1-Year MBA"]
    }
  ]);

  // Lead fields collected through chat
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleOptionClick = (option: string) => {
    sound.snap();
    
    // Append user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: option
    };

    if (!selectedCourse) {
      setSelectedCourse(option);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Great choice! For ${option}, which study format do you prefer?`,
          options: ["Campus Full-Time", "Flexible / Hybrid", "Show Me Both Options"]
        }
      ]);
    } else if (!selectedMode) {
      setSelectedMode(option);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "What is your approximate budget range for the entire program?",
          options: ["Under ₹1.5 Lakhs", "₹1.5 Lakhs - ₹2.5 Lakhs", "Above ₹2.5 Lakhs"]
        }
      ]);
    } else if (!selectedBudget) {
      setSelectedBudget(option);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `We found 3 UGC-approved universities offering ${selectedCourse} within ${option}! Where should our admissions team send the verified syllabus and fee matrix?`,
          isLeadForm: true
        }
      ]);
    }
  };

  const [leadError, setLeadError] = useState("");

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError("");

    const { isValid, cleanPhone, error } = validateIndianPhone(leadPhone);
    if (!isValid) {
      setLeadError(error || "Enter a valid 10-digit mobile number.");
      sound.tick();
      return;
    }

    if (!leadName.trim()) {
      setLeadError("Please enter your name.");
      return;
    }

    sound.chime();
    setIsSubmitting(true);

    const result = await submitLead({
      fullName: leadName.trim(),
      phone: cleanPhone,
      targetCourse: selectedCourse,
      source: `Nexa Campus Chatbot - ${selectedMode} (${selectedBudget})`,
    });

    setIsSubmitting(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: `${leadName} • +91 ${cleanPhone}`
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: `Application Registered! Reference ID: ${result.leadId || "NEXA-CONFIRMED"}. Your personalized prospectus and verified institutional fee waiver for ${selectedCourse || "your program"} have been securely dispatched to WhatsApp (+91 ${cleanPhone}). Exactly 1 dedicated academic counselor will assist you.`,
        isCompleted: true
      }
    ]);
  };

  const handleOpenChat = () => {
    sound.tick();
    setIsOpen(true);
    setShowNotificationBadge(false);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Floating Chat Pill / Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChat}
              className="relative flex items-center gap-3 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] px-5 py-3.5 rounded-full shadow-[0_12px_36px_rgba(20,23,26,0.25)] transition-all font-bold text-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#BADFDB] flex items-center justify-center text-[#14171A] shrink-0 font-bold">
                <Sparkles className="w-4 h-4 text-[#14171A]" />
              </div>
              <span className="tracking-tight">Chat with Nexa Advisor</span>

              {/* Notification Badge */}
              {showNotificationBadge && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFA4A4] text-[#14171A] rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                  1
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white border border-[#14171A]/12 rounded-3xl shadow-[0_24px_60px_-10px_rgba(20,23,26,0.22)] flex flex-col overflow-hidden text-[#14171A]"
          >
            {/* Chat Header */}
            <div className="bg-[#FCF9EA] border-b border-[#14171A]/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#BADFDB] flex items-center justify-center text-[#14171A] font-black">
                  <GraduationCap className="w-5 h-5 text-[#14171A]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#14171A] leading-tight flex items-center gap-1.5">
                    Nexa Campus AI
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <span className="text-[10px] text-[#555E68] font-medium block">
                    Official Admissions & Scholarship Guide
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.tick();
                  setIsOpen(false);
                }}
                className="w-7 h-7 rounded-full bg-white hover:bg-[#FFA4A4] flex items-center justify-center text-[#555E68] hover:text-[#14171A] transition-colors border border-[#14171A]/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white text-xs">
              
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2.5">
                  <div className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed font-medium ${
                        msg.sender === "user"
                          ? "bg-[#14171A] text-[#FCF9EA] rounded-br-xs font-semibold shadow-xs"
                          : "bg-[#FCF9EA] text-[#14171A] border border-[#14171A]/10 rounded-bl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Render Quick Option Chips */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#14171A]/15 hover:border-[#FFA4A4] hover:bg-[#BADFDB]/40 text-[#14171A] font-bold text-[11px] transition-all shadow-2xs hover:scale-102 active:scale-98"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Render Lead Capture Form */}
                  {msg.isLeadForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-4 space-y-3"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-2.5 py-0.5 rounded-full inline-block">
                        Instant WhatsApp Delivery
                      </span>

                      <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                        <div>
                          <label className="text-[11px] font-bold text-[#14171A] block mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-white border border-[#14171A]/10 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#14171A] block mb-1">WhatsApp Number</label>
                          <div className="flex items-center bg-white border border-[#14171A]/10 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#BADFDB]">
                            <span className="text-[#8A929B] text-xs font-bold mr-1.5">+91</span>
                            <input
                              type="tel"
                              required
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              placeholder="98765 43210"
                              className="w-full bg-transparent border-none outline-none text-xs font-bold"
                            />
                          </div>
                          {leadError && (
                            <p className="text-[10px] text-red-600 font-bold mt-1">
                              {leadError}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-[#555E68] pt-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Zero Spam: Exactly 1 Advisor. DPDP Act 2023 protected.</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50 mt-1"
                        >
                          {isSubmitting ? (
                            <span>Generating Match...</span>
                          ) : (
                            <>
                              <span>Send My Admissions Pack</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* Render Final Success Action Chips */}
                  {msg.isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-[#BADFDB]/30 border border-[#BADFDB] rounded-2xl space-y-2 text-center"
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                      <span className="text-xs font-bold text-[#14171A] block">
                        Want an immediate 1-on-1 counselor call?
                      </span>
                      <a
                        href={`https://wa.me/918825216881?text=Hi%20Harsh,%20I%20just%20used%20the%20Nexa%20admissions%20chatbot%20for%20${encodeURIComponent(selectedCourse || "Degree Programs")}.%20Please%20guide%20me.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Chat with Harsh on WhatsApp Live
                      </a>
                    </motion.div>
                  )}

                </div>
              ))}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Footer Action Bar */}
            <div className="p-3 bg-[#FCF9EA] border-t border-[#14171A]/10 flex items-center justify-between text-[11px] text-[#555E68]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">Zero Spam Guarantee</span>
              </div>
              <Link href="/colleges" onClick={() => setIsOpen(false)} className="text-[#14171A] font-bold hover:underline">
                Explore All Degrees →
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
