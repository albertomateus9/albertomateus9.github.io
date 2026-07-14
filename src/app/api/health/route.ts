import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const environment = process.env.DEPLOYMENT_ENV === "staging" ? "staging" : "production";

  return NextResponse.json({
    status: "ok",
    service: "portfolio",
    environment,
    timestamp: new Date().toISOString(),
  });
}
