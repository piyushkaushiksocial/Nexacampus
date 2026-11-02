"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Program, PROGRAMS_DATA } from "@/data/programs";

interface CompareContextType {
  selectedPrograms: Program[];
  addToCompare: (program: Program) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  isDockVisible: boolean;
  setIsDockVisible: (visible: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [isDockVisible, setIsDockVisible] = useState(true);

  // Initialize with 2 pre-selected programs so first-time visitors immediately discover the compare power!
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nebsa_compare_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedPrograms(parsed);
          return;
        }
      }
      // Default initial pair to showcase instant value
      if (PROGRAMS_DATA.length >= 2) {
        setSelectedPrograms([PROGRAMS_DATA[0], PROGRAMS_DATA[1]]);
      }
    } catch {
      if (PROGRAMS_DATA.length >= 2) {
        setSelectedPrograms([PROGRAMS_DATA[0], PROGRAMS_DATA[1]]);
      }
    }
  }, []);

  const addToCompare = (program: Program): boolean => {
    if (selectedPrograms.some((p) => p.id === program.id)) {
      return false;
    }
    if (selectedPrograms.length >= 3) {
      // Maximum 3 programs for side-by-side readability
      return false;
    }
    const updated = [...selectedPrograms, program];
    setSelectedPrograms(updated);
    try {
      localStorage.setItem("nebsa_compare_list", JSON.stringify(updated));
    } catch {}
    return true;
  };

  const removeFromCompare = (id: string) => {
    const updated = selectedPrograms.filter((p) => p.id !== id);
    setSelectedPrograms(updated);
    try {
      localStorage.setItem("nebsa_compare_list", JSON.stringify(updated));
    } catch {}
  };

  const clearCompare = () => {
    setSelectedPrograms([]);
    try {
      localStorage.removeItem("nebsa_compare_list");
    } catch {}
  };

  const isComparing = (id: string) => {
    return selectedPrograms.some((p) => p.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        selectedPrograms,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        isDockVisible,
        setIsDockVisible
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
