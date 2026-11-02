import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "captured_partners.json");

interface PartnerRecord {
  id: string;
  institutionName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  annualIntakeQuota: string;
  preferredMode: string;
  notes?: string;
  timestamp: string;
}

let partnerInquiriesLedger: PartnerRecord[] = [];

try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    partnerInquiriesLedger = JSON.parse(raw);
  }
} catch (e) {
  console.warn("[Nexa Partners API] Initial cache load notice:", e);
}

function persistPartnersToFile() {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(partnerInquiriesLedger, null, 2), "utf-8");
  } catch (e) {
    console.error("[Nexa Partners API] Failed to persist partner inquiries to file:", e);
  }
}

function sanitize(input: string, maxLen = 150): string {
  return (input || "")
    .replace(/[<>]/g, "")
    .slice(0, maxLen)
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      institutionName, 
      contactPerson, 
      designation, 
      email, 
      phone, 
      annualIntakeQuota, 
      preferredMode,
      notes 
    } = body;

    if (!institutionName || !contactPerson || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required institutional partner details." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/\D/g, "");
    const partnerId = `NEXA-UNI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const inquiry: PartnerRecord = {
      id: partnerId,
      institutionName: sanitize(institutionName, 120),
      contactPerson: sanitize(contactPerson, 80),
      designation: sanitize(designation || "Admissions Leadership", 80),
      email: sanitize(email, 100),
      phone: cleanPhone,
      annualIntakeQuota: sanitize(annualIntakeQuota || "500-1000 Seats", 50),
      preferredMode: sanitize(preferredMode || "Campus & Blended", 50),
      notes: notes ? sanitize(notes, 400) : undefined,
      timestamp: new Date().toISOString(),
    };

    partnerInquiriesLedger.push(inquiry);
    persistPartnersToFile();

    console.log(`[Nexa Institutional Engine] Partner registered: ${inquiry.institutionName} (${inquiry.id})`);

    return NextResponse.json({
      success: true,
      partnerId,
      message: "University partnership inquiry registered. Official institutional onboarding deck dispatched.",
      timestamp: inquiry.timestamp,
    });
  } catch (error) {
    console.error("[Nexa API Error] Partner registration failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing institutional inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalInquiries: partnerInquiriesLedger.length,
    recentInquiries: partnerInquiriesLedger.slice(-5).map((p) => ({
      id: p.id,
      institutionName: p.institutionName,
      timestamp: p.timestamp,
    })),
  });
}
