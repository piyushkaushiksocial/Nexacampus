import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: "NEBSA | National Educational Benchmark & Scholarship Authority",
  description: "Explore UGC-entitled Online Degrees and Top Campus Programs. Compare institutions, calculate true ROI, and unlock verified merit scholarship quotas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[var(--color-surface-dark)] text-[var(--color-surface-light)] selection:bg-[var(--color-amber-energy)] selection:text-black">
        <CompareProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
