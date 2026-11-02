"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Briefcase, 
  Cpu, 
  Rocket, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Award,
  ChevronRight,
  Download
} from "lucide-react";
import { sound } from "@/lib/sound";

interface AmbitionTrack {
  id: string;
  label: string;
  icon: any;
  title: string;
  tagline: string;
  degreeName: string;
  universitySample: string;
  mode: string;
  coverImage: string;
  highestCtc: string;
  avgHike: string;
  accreditation: string;
  keySkills: string[];
  recruiters: string[];
  linkUrl: string;
}

const AMBITION_TRACKS: AmbitionTrack[] = [
  {
    id: "management",
    label: "Executive Leadership",
    icon: Briefcase,
    title: "Leadership, Strategy & Executive Management",
    tagline: "Accelerate into CXO, Senior Management, and Consulting roles with globally benchmarked curricula.",
    degreeName: "MBA (Dual Specialization / Executive)",
    universitySample: "NMIMS Global & Manipal University",
    mode: "Campus Full-Time or Flexible Executive",
    coverImage: "/images/hero-student.jpg",
    highestCtc: "₹28.5 LPA",
    avgHike: "+72% Salary Hike",
    accreditation: "NAAC A++ • UGC Category 1",
    keySkills: ["Strategic Decision Making", "Fintech & Corporate Finance", "Global Marketing Dynamics", "AI for Business Leaders"],
    recruiters: ["Deloitte", "Amazon", "KPMG", "HDFC Bank", "McKinsey"],
    linkUrl: "/colleges/nmims-online-mba",
  },
  {
    id: "technology",
    label: "AI & Cloud Tech",
    icon: Cpu,
    title: "Applied AI, Cloud Systems & High-Scale Software",
    tagline: "Build industry-ready engineering depth with hands-on cloud labs and continuous production capstones.",
    degreeName: "MCA (Cloud & Applied AI)",
    universitySample: "Manipal University Jaipur (MUJ)",
    mode: "Campus Full-Time or Flexible Learning",
    coverImage: "/images/tech-learning.jpg",
    highestCtc: "₹24.0 LPA",
    avgHike: "+84% Tech Hike",
    accreditation: "NAAC A+ • NBA & AICTE Aligned",
    keySkills: ["Distributed Microservices", "Full-Stack System Architecture", "Applied Deep Learning", "Kubernetes & AWS DevSecOps"],
    recruiters: ["Microsoft", "Google Cloud", "Persistent", "Infosys Digital", "Oracle"],
    linkUrl: "/colleges/muj-online-mca",
  },
  {
    id: "startups",
    label: "Startups & Business",
    icon: Rocket,
    title: "Venture Creation, Digital Commerce & Modern Business",
    tagline: "Designed for future founders, product managers, and next-gen family business scale-ups.",
    degreeName: "BBA (Entrepreneurship & Digital Business)",
    universitySample: "Amity University & Jain University",
    mode: "On-Campus or Hybrid Cohort",
    coverImage: "/images/campus-architecture.jpg",
    highestCtc: "₹14.5 LPA",
    avgHike: "Seed Incubation Desk",
    accreditation: "NAAC A+ • QS Ranked Campus",
    keySkills: ["Growth Hacking & Product Analytics", "Venture Capital Financing", "Omnichannel Brand Building", "Digital Supply Chain"],
    recruiters: ["Swiggy", "Zomato", "Razorpay", "Flipkart", "Accenture"],
    linkUrl: "/colleges/amity-online-bba",
  },
  {
    id: "engineering",
    label: "Smart Infrastructure",
    icon: Building,
    title: "Structural Engineering, Smart Cities & Robotics",
    tagline: "Rigorous accredited on-campus laboratory and field learning at leading technological institutions.",
    degreeName: "B.Tech Engineering (Infrastructure & Systems)",
    universitySample: "Shivalik College & DPU Institute",
    mode: "On-Campus Full-Time Program",
    coverImage: "/images/campus-architecture.jpg",
    highestCtc: "₹18.0 LPA",
    avgHike: "100% Core Placement Drive",
    accreditation: "NAAC A+ • AICTE Approved Campus",
    keySkills: ["Smart Infrastructure Modeling", "BIM & Structural Dynamics", "Industrial Automation", "Renewable Energy Systems"],
    recruiters: ["L&T Construction", "Tata Projects", "Afcons", "Shapoorji Pallonji"],
    linkUrl: "/network",
  },
];

export function DynamicAmbitionShowcase() {
  const [activeTab, setActiveTab] = useState<string>("management");

  const currentTrack = AMBITION_TRACKS.find((t) => t.id === activeTab) || AMBITION_TRACKS[0];

  return (
    <div className="w-full">
      {/* Interactive Track Switcher Pill Row */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 p-2 bg-white/80 backdrop-blur-md border border-[#14171A]/10 rounded-2xl mb-10 max-w-3xl mx-auto shadow-sm">
        {AMBITION_TRACKS.map((track) => {
          const Icon = track.icon;
          const isActive = track.id === activeTab;
          return (
            <button
              key={track.id}
              onClick={() => {
                sound.tick();
                setActiveTab(track.id);
              }}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 z-10 ${
                isActive
                  ? "text-[#14171A]"
                  : "text-[#555E68] hover:text-[#14171A] hover:bg-black/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAmbitionIndicator"
                  className="absolute inset-0 bg-[#FFA4A4] rounded-xl shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon className="w-4 h-4 shrink-0" />
              <span>{track.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Morphing Card Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-[#14171A]/10 rounded-3xl p-6 sm:p-10 shadow-[0_24px_60px_-15px_rgba(20,23,26,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
        >
          {/* Ambient Corner Tint */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#BADFDB]/30 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

          {/* Left Column: Trajectory Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#BADFDB] text-[#14171A] border border-[#14171A]/10">
                {currentTrack.accreditation}
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FCF9EA] text-[#555E68] border border-[#14171A]/10">
                {currentTrack.mode}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#14171A] tracking-tight leading-tight mb-2">
                {currentTrack.title}
              </h3>
              <p className="text-sm sm:text-base text-[#555E68] font-medium leading-relaxed">
                {currentTrack.tagline}
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold uppercase text-[#555E68] block">Peak Salary CTC</span>
                <span className="text-xl font-black text-[#14171A] block">{currentTrack.highestCtc}</span>
                <span className="text-[10px] text-emerald-700 font-bold">Verified Audit</span>
              </div>

              <div className="bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold uppercase text-[#555E68] block">Average Growth</span>
                <span className="text-xl font-black text-[#14171A] block">{currentTrack.avgHike}</span>
                <span className="text-[10px] text-[#FFA4A4] font-bold">2025-2026 Batch</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-3.5">
                <span className="text-[10px] font-bold uppercase text-[#555E68] block">Benchmarked Against</span>
                <span className="text-xs font-black text-[#14171A] block mt-1 line-clamp-2">
                  {currentTrack.universitySample}
                </span>
              </div>
            </div>

            {/* Key Curriculum Modules */}
            <div>
              <span className="text-xs font-bold text-[#14171A] uppercase tracking-wider block mb-2">
                Industry-Aligned Core Modules
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentTrack.keySkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-xs font-semibold text-[#14171A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Badge Row */}
            <div className="pt-2 border-t border-[#14171A]/10">
              <span className="text-[11px] font-bold text-[#555E68] block mb-2">Top Hiring Partners</span>
              <div className="flex flex-wrap gap-2">
                {currentTrack.recruiters.map((rec) => (
                  <span
                    key={rec}
                    className="px-2.5 py-1 bg-white border border-[#14171A]/10 rounded-lg text-xs font-bold text-[#14171A] shadow-xs"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href={currentTrack.linkUrl}>
                <button className="px-6 py-3 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm hover:scale-102">
                  <span>Explore {currentTrack.degreeName}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/colleges">
                <button className="px-5 py-3 bg-[#BADFDB]/60 hover:bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Compare All Similar Programs</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Media Card with Hover Depth (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#14171A]/12 shadow-lg group">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Floating Bottom Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#14171A]/10 shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#555E68]">Direct Institutional Quota</span>
                  <span className="text-[10px] font-extrabold bg-[#BADFDB] text-[#14171A] px-2 py-0.5 rounded">
                    0% EMI Verified
                  </span>
                </div>
                <h4 className="text-xs font-black text-[#14171A]">{currentTrack.degreeName}</h4>
                <p className="text-[11px] text-[#555E68] mt-0.5 font-medium">Official syllabus & prospectus updated for 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
