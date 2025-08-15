import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (password === process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}