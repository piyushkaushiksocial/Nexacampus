import { PROGRAMS_DATA } from "@/data/programs";
import { notFound } from "next/navigation";
import { ProgramDetailView } from "./ProgramDetailView";

export const instant = false;

export function generateStaticParams() {
  return PROGRAMS_DATA.map((prog) => ({
    id: prog.id,
  }));
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = PROGRAMS_DATA.find((p) => p.id === id);

  if (!program) {
    notFound();
  }

  return <ProgramDetailView program={program} />;
}
