"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sound } from "@/lib/sound";

type ViewMode = "students" | "universities";

interface AudienceContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
}

const AudienceContext = createContext<AudienceContextType | undefined>(undefined);

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("students");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexa_audience_mode");
      if (saved === "students" || saved === "universities") {
        setModeState(saved);
      }
    } catch {}
  }, []);

  const setMode = (newMode: ViewMode) => {
    sound.snap();
    setModeState(newMode);
    try {
      localStorage.setItem("nexa_audience_mode", newMode);
    } catch {}
  };

  const toggleMode = () => {
    setMode(mode === "students" ? "universities" : "students");
  };

  return (
    <AudienceContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error("useAudience must be used within an AudienceProvider");
  }
  return context;
}
