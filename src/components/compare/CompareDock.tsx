"use client";

import { useCompare } from "@/context/CompareContext";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

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
        <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Active selection items */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-2 pr-2 border-r border-white/10 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#FFE15D]/20 border border-[#FFE15D]/40 flex items-center justify-center">
                <Scale className="w-4 h-4 text-[#FFE15D]" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white block">Compare</span>
                <span className="text-white/50">{selectedPrograms.length}/3 selected</span>
              </div>
            </div>

            {/* Selected Chips */}
            <div className="flex items-center gap-2">
              {selectedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 hover:border-white/25 rounded-xl px-3 py-2 text-xs text-white shrink-0 group transition-colors"
                >
                  <span className="font-medium max-w-[140px] truncate">{program.shortName}</span>
                  <button
                    onClick={() => removeFromCompare(program.id)}
                    className="text-white/50 hover:text-red-400 transition-colors p-0.5 rounded"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Placeholder slot if less than 3 */}
              {selectedPrograms.length < 3 && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-white/15 text-white/40 text-xs shrink-0">
                  <span>+ Add {3 - selectedPrograms.length} more</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={clearCompare}
              className="text-white/50 hover:text-white text-xs flex items-center gap-1.5 px-2 py-1.5 transition-colors"
              title="Clear comparison list"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <Link href="/compare">
              <button className="px-5 py-2.5 bg-[#FFE15D] text-black font-semibold text-xs rounded-xl hover:bg-white transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,225,93,0.3)]">
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
