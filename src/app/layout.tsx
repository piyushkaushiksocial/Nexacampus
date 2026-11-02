import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { CompareProvider } from "@/context/CompareContext";
import { AudienceProvider } from "@/context/AudienceContext";
import { NexaChatbot } from "@/components/chat/NexaChatbot";

export const metadata: Metadata = {
  title: "Nexa Campus | Higher Education & University Admissions Platform",
  description: "Explore UGC-entitled Degrees and Accredited University Campuses. Compare institutions, calculate true ROI, and unlock verified institutional scholarship quotas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#FCF9EA] text-[#14171A] selection:bg-[#BADFDB] selection:text-[#14171A]">
        <AudienceProvider>
          <CompareProvider>
            <SmoothScrollProvider>
              {children}
              <NexaChatbot />
            </SmoothScrollProvider>
          </CompareProvider>
        </AudienceProvider>
      </body>
    </html>
  );
}
