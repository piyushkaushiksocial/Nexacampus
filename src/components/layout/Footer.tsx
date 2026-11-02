import { GraduationCap, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#14171A]/[0.08] bg-[#F6F2DE] pt-16 pb-12 text-sm text-[#555E68]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#BADFDB] flex items-center justify-center text-[#14171A] font-bold">
              <GraduationCap className="w-4 h-4 text-[#14171A]" />
            </div>
            <span className="font-extrabold text-lg text-[#14171A] tracking-tight">Nexa Campus</span>
          </div>
          <p className="text-xs leading-relaxed text-[#555E68] mb-6">
            Higher Education & Accredited University Admissions Authority. 
            Empowering students with verified campus rankings, syllabus breakdowns, and institutional scholarship quotas.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#14171A] bg-white px-3 py-1.5 rounded-full border border-[#14171A]/10 w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026 Admissions Open</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#14171A] mb-4">Popular Programs</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/colleges/nmims-online-mba" className="hover:text-[#14171A] transition-colors">NMIMS Online MBA</Link></li>
            <li><Link href="/colleges/amity-online-mca" className="hover:text-[#14171A] transition-colors">Amity Online MCA</Link></li>
            <li><Link href="/colleges/manipal-online-bba" className="hover:text-[#14171A] transition-colors">Manipal Online BBA</Link></li>
            <li><Link href="/colleges/jain-online-bca" className="hover:text-[#14171A] transition-colors">Jain Online BCA</Link></li>
            <li><Link href="/colleges" className="text-[#14171A] font-semibold underline underline-offset-2">View All 18+ Programs →</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#14171A] mb-4">For Institutions</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/network" className="hover:text-[#14171A] transition-colors">Accredited Campuses</Link></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Enrollment Audit Portal</span></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Dean & VC Alliance Deck</span></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Scholarship Reconciliation</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#14171A] mb-4">Verification & Trust</h4>
          <ul className="space-y-2.5 text-xs">
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Anti-Spam Student Covenant</span></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Zero-Fee Counseling Policy</span></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">UGC & DEB Compliance Standards</span></li>
            <li><a href="https://wa.me/918825216881?text=Hi%20Harsh,%20I%20need%20admissions%20guidance" target="_blank" rel="noopener noreferrer" className="hover:text-[#14171A] transition-colors text-emerald-800 font-bold">WhatsApp: +91 88252 16881 (Harsh)</a></li>
            <li><span className="hover:text-[#14171A] cursor-pointer transition-colors">Support Desk: +91 88252 16881</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between border-t border-[#14171A]/[0.08] pt-8 text-xs text-[#8A929B]">
        <p>© 2026 Nexa Campus. All university trademarks belong to respective institutions.</p>
        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          <span className="px-2.5 py-1 rounded bg-[#BADFDB]/40 text-[#14171A] font-medium text-[11px]">ISO 9001:2015</span>
          <span>•</span>
          <span className="px-2.5 py-1 rounded bg-[#FFA4A4]/40 text-[#14171A] font-medium text-[11px]">UGC-DEB Compliant</span>
        </div>
      </div>
    </footer>
  );
}
