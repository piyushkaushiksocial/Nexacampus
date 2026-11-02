import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a050a] pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-white/50" />
            <span className="font-bold text-lg text-white">NEBSA</span>
          </div>
          <p className="text-white/50 mb-6">
            National Educational Benchmark & Scholarship Authority. 
            Empowering students with verified aptitude diagnostics and institutional grants.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Assessments</h4>
          <ul className="space-y-2 text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">NCAD Diagnostic</a></li>
            <li><a href="#" className="hover:text-white transition-colors">NMST Merit Test</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Verify Hall Ticket</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Syllabus & Scoring</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Institutions</h4>
          <ul className="space-y-2 text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Accredited Campuses</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Department Audits</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partner Portal Login</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Grant Reconciliation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Legal & Support</h4>
          <ul className="space-y-2 text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">Anti-Spam Covenant</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Protocol</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Helpdesk (1800-XXX-XXXX)</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-white/40">
        <p>© 2026 NEBSA. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>ISO 9001:2015 Certified</span>
          <span>•</span>
          <span>NCAG Standards Aligned</span>
        </div>
      </div>
    </footer>
  );
}
