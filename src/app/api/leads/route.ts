import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "captured_leads.json");

interface LeadRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  targetCourse: string;
  targetUniversity?: string;
  qualification?: string;
  source: string;
  timestamp: string;
  ipHash: string;
}

// In-memory buffer initialized from file
let leadsCache: LeadRecord[] = [];

try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    leadsCache = JSON.parse(raw);
  }
} catch (e) {
  console.warn("[Nexa Leads API] Initial cache load notice:", e);
}

function persistLeadsToFile() {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leadsCache, null, 2), "utf-8");
  } catch (e) {
    console.error("[Nexa Leads API] Failed to persist leads to file:", e);
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
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const now = Date.now();

    // 1. IP Rate Limiting (Max 15 submissions per 5 minutes per IP)
    const rateData = rateLimitMap.get(ip) || { count: 0, resetTime: now + 300000 };
    if (now > rateData.resetTime) {
      rateData.count = 0;
      rateData.resetTime = now + 300000;
    }

    if (rateData.count >= 15) {
      return NextResponse.json(
        { success: false, error: "Too many inquiries submitted from this device. Please try again in a few minutes." },
        { status: 429 }
      );
    }
    rateData.count += 1;
    rateLimitMap.set(ip, rateData);

    const body = await req.json();
    const { fullName, phone, email, qualification, targetCourse, targetUniversity, source } = body;

    // 2. Strict Phone Validation (Indian 10-digit mobile starting with 6, 7, 8, or 9)
    const cleanPhone = (phone || "").toString().replace(/\D/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid phone number. Please enter a valid 10-digit Indian mobile number." 
        },
        { status: 400 }
      );
    }

    // 3. Construct Lead Record with official reference ID
    const leadId = `NEXA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const sanitizedLead: LeadRecord = {
      id: leadId,
      fullName: sanitize(fullName || "Prospective Student", 80),
      phone: cleanPhone,
      email: email ? sanitize(email, 100) : undefined,
      qualification: qualification ? sanitize(qualification, 60) : undefined,
      targetCourse: sanitize(targetCourse || "Higher Education Degree", 100),
      targetUniversity: targetUniversity ? sanitize(targetUniversity, 100) : undefined,
      source: sanitize(source || "Website Direct", 100),
      timestamp: new Date().toISOString(),
      ipHash: ip,
    };

    // 4. Update memory cache & persist to JSON ledger
    leadsCache.push(sanitizedLead);
    persistLeadsToFile();

    console.log(`[Nexa Admissions Engine] Lead secured: ${sanitizedLead.id} for ${sanitizedLead.targetCourse}`);

    return NextResponse.json({
      success: true,
      leadId,
      message: "Lead successfully recorded with official admissions desk.",
      timestamp: sanitizedLead.timestamp,
    });
  } catch (error) {
    console.error("[Nexa API Error] Lead capture failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing lead." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalCapturedLeads: leadsCache.length,
    recentLeads: leadsCache.slice(-10).map((l) => ({
      id: l.id,
      targetCourse: l.targetCourse,
      source: l.source,
      timestamp: l.timestamp,
    })),
  });
}
