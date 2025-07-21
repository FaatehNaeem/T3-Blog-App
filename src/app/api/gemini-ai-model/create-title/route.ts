import { GoogleGenAI } from "@google/genai";
import { NextResponse, type NextRequest } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  const data = await request.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: data.prompt,
  });

  return NextResponse.json({ success: true, data: response.text });
}

