"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  Lock, 
  Sparkles,
  PhoneCall,
  Download,
  Award
} from "lucide-react";
import { sound } from "@/lib/sound";
import Image from "next/image";

export default function UniversityPartnersPage() {
  const [partnerUniName, setPartnerUniName] = useState("");
  const [partnerRepName, setPartnerRepName] = useState("");
  const [partnerRepRole, setPartnerRepRole] = useState("Director of Admissions / Registrar");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [partnerPrograms, setPartnerPrograms] = useState("Online MBA & Tech Degrees");
  const [submitted, setSubmitted] = useState(false);
  const [partnerRefId, setPartnerRefId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    setIsSubmitting(true);

    const payload = {
      institutionName: partnerUniName,
      contactPerson: partnerRepName,
      designation: partnerRepRole,
      email: partnerEmail,
      phone: partnerPhone,
      annualIntakeQuota: partnerPrograms,
      preferredMode: "Campus & Flexible Executive",
    };

    // 1. Post to Server API
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.partnerId) setPartnerRefId(data.partnerId);
      }
    } catch (e) {
      console.warn("Server sync notice:", e);
    }

    // 2. Local storage backup
    try {
      const existing = localStorage.getItem("nexa_partner_inquiries");
      const list = existing ? JSON.parse(existing) : [];
      list.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem("nexa_partner_inquiries", JSON.stringify(list));
    } catch {}

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] pt-16">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] text-xs font-bold mb-6 shadow-xs">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Alliance & Admissions Network
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#14171A] leading-[1.08] mb-6">
            Fill 100% of Your Cohorts <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10">With Zero Student Dropouts.</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#BADFDB] -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#555E68] max-w-2xl mx-auto font-medium leading-relaxed">
            Nexa Campus connects accredited Indian universities with pre-screened, career-matched applicants. We eliminate unqualified leads and automate student onboarding from eligibility verification to 0% EMI financing.
          </p>
        </div>

        {/* ================= INTAKE CARD & METRICS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#14171A]/12 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_-8px_rgba(20,23,26,0.08)]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#BADFDB] flex items-center justify-center mx-auto text-[#14171A]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-[#14171A]">Institutional Alliance Request Logged</h3>
                <p className="text-[#555E68] text-sm max-w-md mx-auto font-medium">
                  Thank you, <strong className="text-[#14171A]">{partnerRepName}</strong>. Our Director of Academic Alliances will review <strong className="text-[#14171A]">{partnerUniName}</strong>&apos;s intake goals and deliver the customized cohort projection deck within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#FCF9EA] border border-[#14171A]/10 text-xs font-bold rounded-xl hover:bg-white text-[#14171A]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#14171A] bg-[#FFA4A4]/50 px-3 py-1 rounded-full border border-[#14171A]/10 mb-2 inline-block">
                    Official Registry Request
                  </span>
                  <h3 className="text-2xl font-black text-[#14171A] tracking-tight">
                    Request University Alliance Deck & Intake Audit
                  </h3>
                  <p className="text-[#555E68] text-xs sm:text-sm mt-1 font-medium">
                    Designed for Vice-Chancellors, Registrars, Admissions Directors, and Academic Boards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      University / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerUniName}
                      onChange={(e) => setPartnerUniName(e.target.value)}
                      placeholder="e.g. Amity University / NMIMS"
                      className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      Your Name & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerRepName}
                      onChange={(e) => setPartnerRepName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Verma (Dean - Admissions)"
                      className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      Institutional Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="admissions@university.edu.in"
                      className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#14171A] block mb-1">
                      Official Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={partnerPhone}
                      onChange={(e) => setPartnerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#14171A] block mb-1">
                    Primary Academic Programs to Accelerate
                  </label>
                  <select
                    value={partnerPrograms}
                    onChange={(e) => setPartnerPrograms(e.target.value)}
                    className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#14171A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#BADFDB]"
                  >
                    <option value="Online MBA & Management">Online MBA & Management (PG)</option>
                    <option value="Online MCA, Data Science & AI">Online MCA, Data Science & AI (Tech)</option>
                    <option value="Online BBA / BCA (Undergrad)">Online BBA / BCA (Undergraduate)</option>
                    <option value="Executive 1-Year Leadership MBA">Executive 1-Year Leadership MBA</option>
                    <option value="Full Campus Engineering & Law">Full Campus Engineering & Law Degrees</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#BADFDB] hover:text-[#14171A] font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Building2 className="w-4 h-4" />
                    Request University Alliance Presentation & Cohort Projection
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#555E68] pt-2 font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Confidentiality Guaranteed. All institutional data is protected under NDA.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Metrics & Trust (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-56 w-full rounded-3xl overflow-hidden border border-[#14171A]/10 shadow-xs">
              <Image
                src="/images/university-boardroom.jpg"
                alt="University Leadership & Vice-Chancellors Meeting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#BADFDB] text-[#14171A] px-2 py-0.5 rounded">
                  Executive Boardroom Alliance
                </span>
                <p className="text-xs font-bold mt-1">Direct Institutional Governance & Compliance</p>
              </div>
            </div>

            <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-3xl p-6 space-y-4">
              <h4 className="text-base font-bold text-[#14171A] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFA4A4]" />
                Institutional Benchmarks (FY 2025-2026)
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white rounded-2xl p-4 border border-[#14171A]/10">
                  <span className="text-[11px] font-bold text-[#555E68] block">Fee Volume Processed</span>
                  <span className="text-2xl font-black text-[#14171A]">₹18.4 Cr+</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Direct to Treasury</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#14171A]/10">
                  <span className="text-[11px] font-bold text-[#555E68] block">Cohort Retention</span>
                  <span className="text-2xl font-black text-emerald-700">94.2%</span>
                  <span className="text-[10px] text-[#555E68] font-bold block mt-0.5">Near Zero Dropouts</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#14171A]/10">
                  <span className="text-[11px] font-bold text-[#555E68] block">Verification Time</span>
                  <span className="text-2xl font-black text-[#14171A]">&lt; 24 Hrs</span>
                  <span className="text-[10px] text-[#555E68] font-bold block mt-0.5">Automated KYC</span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#14171A]/10">
                  <span className="text-[11px] font-bold text-[#555E68] block">Accredited Campuses</span>
                  <span className="text-2xl font-black text-[#14171A]">38+</span>
                  <span className="text-[10px] text-[#555E68] font-bold block mt-0.5">UGC & NAAC A++</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#BADFDB] flex items-center justify-center text-[#14171A]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#14171A]">Zero-Commission Fatigue Guarantee</h4>
              <p className="text-xs text-[#555E68] leading-relaxed font-medium">
                Traditional commercial call centers spam 500 unvetted numbers hoping 1 converts. Nexa Campus only sends applicants whose academic eligibility, documentation, and 0% financing are 100% pre-cleared.
              </p>
            </div>

            {/* UGC 2020 Direct Treasury Compliance Card */}
            <div className="bg-white border-2 border-[#BADFDB] rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 bg-[#BADFDB]/50 px-3 py-1 rounded-full w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>UGC 2020 Compliance & Treasury Flow</span>
              </div>
              <h4 className="text-sm font-black text-[#14171A]">100% Direct University Fee Settlement</h4>
              <p className="text-xs text-[#555E68] leading-relaxed font-medium">
                In strict adherence to UGC (Open & Distance Learning and Online Programmes) Regulations 2020, student fees are remitted <strong>directly into the University&apos;s designated bank account</strong>. Nexa acts purely as a pre-screening technology platform, avoiding third-party intermediary or franchising violations.
              </p>
            </div>
          </div>

        </div>

        {/* ================= THREE B2B VALUE PILLARS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#BADFDB] text-[#14171A] flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#14171A]">Pre-Screened Academic Fit</h3>
            <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed font-medium">
              Every applicant runs through our 2-minute eligibility filter (prior GPA, math prerequisites for MCA, work exp for Exec MBA), resulting in 92% higher enrollment conversion.
            </p>
          </div>

          <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FFA4A4] text-[#14171A] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#14171A]">Integrated 0% EMI Financing</h3>
            <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed font-medium">
              We pre-approve students with paperless NBFC loans, ensuring fees reach your university treasury in full upfront, eliminating default risks.
            </p>
          </div>

          <div className="bg-white border border-[#14171A]/10 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FFBDBD] text-[#14171A] flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#14171A]">Automated CRM Integration</h3>
            <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed font-medium">
              Real-time webhook and API integration pushing verified candidates directly into your ERP/CRM (Salesforce, LeadSquared, ExtraaEdge) without manual Excel exports.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
