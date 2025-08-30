import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("[v0] Contact form submission:", data)
    // In production, forward to email service or store in DB here.
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.log("[v0] Contact form error:", e?.message)
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
  }
}
