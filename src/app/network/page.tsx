"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  ShieldCheck, 
  Search, 
  MapPin, 
  Building2, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  PhoneCall, 
  Sparkles,
  Users,
  Compass,
  Filter,
  Check
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CAMPUSES_DATA, AccreditedCampus } from "@/data/campuses";
import { LeadCaptureModal } from "@/components/leads/LeadCaptureModal";
import { CounselingDrawer } from "@/components/counseling/CounselingDrawer";
import { sound } from "@/lib/sound";

export default function AccreditedCampusesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [onlyNaacAPlusPlus, setOnlyNaacAPlusPlus] = useState(false);

  // Modal triggers
  const [selectedCampusForBrochure, setSelectedCampusForBrochure] = useState<AccreditedCampus | null>(null);
  const [counselingCampus, setCounselingCampus] = useState<string | null>(null);

  const zones = ["All", "North", "West", "South"];
  const campusTypes = ["All", "Deemed-to-be University", "Private University", "Autonomous Institute"];

  const filteredCampuses = useMemo(() => {
    return CAMPUSES_DATA.filter((campus) => {
      const matchesZone = selectedZone === "All" || campus.zone === selectedZone;
      const matchesType = selectedType === "All" || campus.type === selectedType;
      const matchesNaac = !onlyNaacAPlusPlus || campus.naacGrade === "A++";
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        campus.name.toLowerCase().includes(q) ||
        campus.city.toLowerCase().includes(q) ||
        campus.state.toLowerCase().includes(q) ||
        campus.university.toLowerCase().includes(q) ||
        campus.degreesOffered.some((d) => d.toLowerCase().includes(q)) ||
        campus.facilities.some((f) => f.toLowerCase().includes(q));

      return matchesZone && matchesType && matchesNaac && matchesSearch;
    });
  }, [searchQuery, selectedZone, selectedType, onlyNaacAPlusPlus]);

  return (
    <div className="min-h-screen bg-[#FCF9EA] text-[#14171A] font-sans selection:bg-[#BADFDB] selection:text-[#14171A] pt-16">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 pb-32">
        
        {/* ================= HERO SECTION ================= */}
        <ScrollReveal direction="up" className="border-b border-[#14171A]/10 pb-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BADFDB] border border-[#14171A]/10 mb-3 text-xs font-bold text-[#14171A] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                Accredited Institutional Directory
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#14171A]">
                Accredited Campuses & Universities
              </h1>
              <p className="text-[#555E68] text-base mt-2 max-w-2xl font-medium">
                Explore verified partner university campuses across India. Filter by NAAC A++ accreditation, state, facilities, and active campus recruitment drives.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.tick();
                  setSelectedCampusForBrochure(CAMPUSES_DATA[0]);
                }}
                className="px-4 py-2.5 bg-white hover:bg-[#BADFDB] border border-[#14171A]/10 text-[#14171A] text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs hover:scale-102"
              >
                <Download className="w-3.5 h-3.5 text-[#FFA4A4]" />
                Download Campus Directory (PDF)
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ================= SEARCH & INTERACTIVE FILTERS BAR ================= */}
        <ScrollReveal direction="up" delay={0.1} className="bg-white border border-[#14171A]/12 rounded-3xl p-5 mb-10 space-y-4 shadow-[0_10px_30px_-5px_rgba(20,23,26,0.05)]">
          
          {/* Row 1: Search Input + Region Switcher */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A929B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campus by name (NMIMS, Manipal), city (Mumbai, Bangalore, Jaipur), or degree..."
                className="w-full bg-[#FCF9EA] border border-[#14171A]/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#14171A] font-semibold placeholder:text-[#8A929B] focus:outline-none focus:ring-2 focus:ring-[#BADFDB] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555E68] hover:text-[#14171A] text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-1 bg-[#FCF9EA] border border-[#14171A]/10 p-1 rounded-xl overflow-x-auto">
              <span className="text-xs font-bold text-[#555E68] px-2.5 hidden sm:inline">Region:</span>
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => {
                    sound.tick();
                    setSelectedZone(z);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedZone === z
                      ? "bg-[#FFA4A4] text-[#14171A] shadow-xs"
                      : "text-[#555E68] hover:text-[#14171A]"
                  }`}
                >
                  {z === "All" ? "All Regions" : `${z} India`}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Campus Type & NAAC A++ Quick Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#14171A]/10 text-xs">
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#555E68] font-bold">University Category:</span>
              {campusTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    sound.tick();
                    setSelectedType(t);
                  }}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                    selectedType === t
                      ? "bg-[#14171A] text-[#FCF9EA] border-[#14171A]"
                      : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:text-[#14171A]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* NAAC A++ Toggle Pill */}
            <button
              onClick={() => {
                sound.snap();
                setOnlyNaacAPlusPlus(!onlyNaacAPlusPlus);
              }}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
                onlyNaacAPlusPlus
                  ? "bg-[#BADFDB] text-[#14171A] border-[#BADFDB] shadow-xs"
                  : "bg-[#FCF9EA] border-[#14171A]/10 text-[#555E68] hover:border-[#14171A]/30"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-800" />
              <span>NAAC A++ Grade Only</span>
              {onlyNaacAPlusPlus && <Check className="w-3 h-3 text-[#14171A]" />}
            </button>

          </div>
        </ScrollReveal>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#555E68] mb-6 px-1 font-bold">
          <span>Showing {filteredCampuses.length} accredited university campuses</span>
          <span className="text-[#14171A]">
            💡 Select any campus to request official prospectus and fee structures
          </span>
        </div>

        {/* ================= CAMPUSES GRID ================= */}
        {filteredCampuses.length === 0 ? (
          <div className="bg-white border border-[#14171A]/12 rounded-3xl p-12 text-center shadow-xs">
            <h3 className="text-lg font-bold text-[#14171A] mb-2">No matching campuses found</h3>
            <p className="text-sm text-[#555E68] mb-6 font-medium">Try broadening your search or resetting region filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedZone("All"); setSelectedType("All"); setOnlyNaacAPlusPlus(false); }}
              className="px-4 py-2 bg-[#14171A] text-[#FCF9EA] font-bold rounded-xl text-xs hover:bg-[#FFA4A4] hover:text-[#14171A]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredCampuses.map((campus, idx) => (
              <ScrollReveal key={campus.id} direction="up" delay={idx * 0.08}>
                <div
                  className="bg-white border border-[#14171A]/12 rounded-3xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(20,23,26,0.06)] hover:shadow-[0_24px_50px_-8px_rgba(20,23,26,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                <div>
                  {/* Campus Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden border-b border-[#14171A]/10">
                    <Image
                      src={campus.image}
                      alt={campus.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-[#BADFDB] text-[#14171A] shadow-xs">
                        NAAC {campus.naacGrade}
                      </span>
                      {campus.nirfRank && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#14171A] shadow-xs">
                          {campus.nirfRank}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#14171A] shadow-xs">
                        Est. {campus.established}
                      </span>
                    </div>

                    {/* Bottom overlay text on photo */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-white/90 font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFA4A4]" />
                        <span>{campus.location}</span>
                      </div>
                      <h3 className="text-xl font-black text-white leading-tight">
                        {campus.name}
                      </h3>
                    </div>
                  </div>

                  {/* Campus Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-[#555E68] leading-relaxed font-medium">
                      {campus.shortDesc}
                    </p>

                    {/* Degree Programs Offered Chips */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#14171A] block mb-2">
                        Key Degrees Offered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {campus.degreesOffered.map((deg, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#FCF9EA] border border-[#14171A]/10 text-xs font-bold text-[#14171A]"
                          >
                            {deg}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Placement Stats & Format Box */}
                    <div className="grid grid-cols-2 gap-3 bg-[#FCF9EA] border border-[#14171A]/10 rounded-2xl p-3.5 text-xs">
                      <div>
                        <span className="text-[#555E68] font-bold block text-[11px]">Placement Packages</span>
                        <span className="text-sm font-black text-emerald-800 block">Avg: {campus.avgPlacement}</span>
                        <span className="text-[10px] text-[#8A929B] font-medium">Highest: {campus.highestPlacement}</span>
                      </div>
                      
                      <div className="border-l border-[#14171A]/10 pl-3">
                        <span className="text-[#555E68] font-bold block text-[11px]">Available Formats</span>
                        <span className="text-xs font-bold text-[#14171A] block mt-0.5">
                          {campus.formats.join(" • ")}
                        </span>
                        <span className="text-[10px] text-[#8A929B] font-medium">{campus.campusArea}</span>
                      </div>
                    </div>

                    {/* Facilities checklist */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#555E68] block mb-1.5">
                        Campus Infrastructure & Facilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#14171A] font-semibold">
                        {campus.facilities.map((fac, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="truncate">{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0 border-t border-[#14171A]/10 mt-2 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                    <Link href={`/colleges?search=${encodeURIComponent(campus.city)}`} className="block">
                      <button className="w-full py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm">
                        <span>Explore Degrees Here</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        sound.snap();
                        setSelectedCampusForBrochure(campus);
                      }}
                      className="py-2.5 px-3 bg-[#FCF9EA] hover:bg-white border border-[#14171A]/10 text-[#14171A] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#14171A]" />
                      Campus Prospectus (PDF)
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      sound.tick();
                      setCounselingCampus(campus.name);
                    }}
                    className="w-full py-2 text-xs font-semibold text-[#555E68] hover:text-[#14171A] hover:underline flex items-center justify-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-3 h-3 text-emerald-700" />
                    <span>Schedule a Campus Visit / Admission Guidance with Counselor</span>
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
          </div>
        )}

      </main>

      {/* Campus Prospectus Modal */}
      {selectedCampusForBrochure && (
        <LeadCaptureModal
          isOpen={Boolean(selectedCampusForBrochure)}
          onClose={() => setSelectedCampusForBrochure(null)}
          title={`Download ${selectedCampusForBrochure.name} Prospectus`}
          subtitle={`We will send the official 2026 campus fee schedule, hostel details, and admission criteria to your WhatsApp.`}
          prefilledCourse={selectedCampusForBrochure.degreesOffered[0]}
          prefilledUniversity={selectedCampusForBrochure.university}
          source="Accredited Campus Directory"
        />
      )}

      {/* Counseling Drawer */}
      <CounselingDrawer
        isOpen={Boolean(counselingCampus)}
        onClose={() => setCounselingCampus(null)}
        defaultProgramName={counselingCampus || undefined}
      />

      <Footer />
    </div>
  );
}
