import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export async function POST(req) {

    const { prompt } = await req.json();

    if (!prompt) {
        console.log("Prompt is missing", prompt);
        return NextResponse.json({ text: "Please Enter prompt" }, { status: 400 });
    }

    try {
        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log(response.text);
        return NextResponse.json({ text: response.text }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ text: error }, { status: 500 });
    }
}
