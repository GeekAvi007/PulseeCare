import { NextRequest, NextResponse } from "next/server";

let ecgData: number[] = [];

export async function POST(req: NextRequest) {
  const { value }: { value: number } = await req.json();
  ecgData.push(value);
  ecgData = ecgData.slice(-100); // Keep only the last 100 values
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(ecgData);
}
