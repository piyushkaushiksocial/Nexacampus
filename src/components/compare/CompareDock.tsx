"use client";

import { useCompare } from "@/context/CompareContext";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function CompareDock() {
  const { selectedPrograms, removeFromCompare, clearCompare } = useCompare();

  if (selectedPrograms.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        aria-label="Course Comparison Dock"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl"
      >
        <div className="bg-white/95 backdrop-blur-2xl border border-[#14171A]/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(20,23,26,0.12)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Active selection items */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-2 pr-2 border-r border-[#14171A]/10 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#FFA4A4] flex items-center justify-center">
                <Scale className="w-4 h-4 text-[#14171A]" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#14171A] block">Compare</span>
                <span className="text-[#555E68] font-medium">{selectedPrograms.length}/3 selected</span>
              </div>
            </div>

            {/* Selected Chips */}
            <div className="flex items-center gap-2">
              {selectedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex items-center gap-2 bg-[#FCF9EA] border border-[#14171A]/10 hover:border-[#14171A]/25 rounded-xl px-3 py-2 text-xs text-[#14171A] shrink-0 group transition-colors"
                >
                  <span className="font-bold max-w-[140px] truncate">{program.shortName}</span>
                  <button
                    onClick={() => {
                      sound.tick();
                      removeFromCompare(program.id);
                    }}
                    className="text-[#8A929B] hover:text-red-500 transition-colors p-0.5 rounded"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Placeholder slot if less than 3 */}
              {selectedPrograms.length < 3 && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#14171A]/15 text-[#8A929B] text-xs font-medium shrink-0">
                  <span>+ Add {3 - selectedPrograms.length} more</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                sound.tick();
                clearCompare();
              }}
              className="text-[#555E68] hover:text-[#14171A] text-xs flex items-center gap-1.5 px-2 py-1.5 transition-colors font-medium"
              title="Clear comparison list"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <Link href="/compare">
              <button 
                onClick={() => sound.snap()}
                className="px-5 py-2.5 bg-[#14171A] text-[#FCF9EA] hover:bg-[#FFA4A4] hover:text-[#14171A] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                Compare Side-by-Side
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
