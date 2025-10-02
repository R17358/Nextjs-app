import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

const store = {};

function getHistory(sessionId) {
    if (!store[sessionId]) {
        store[sessionId] = [];
    }
    return store[sessionId];
}

function addMessage(sessionId, role, content) {
    if (!store[sessionId]) store[sessionId] = [];
    store[sessionId].push({ role, content });
}

export async function POST(req) {

    const {userId} = auth();

    const {prompt} = await req.json();

    if(!userId)
    {
        //     userId = 1
        return NextResponse.json({ text: "Please login" }, { status: 400 });
    }
    
    if (!prompt) {
        console.log("Prompt or user ID is missing", prompt);
        return NextResponse.json({ text: "Prompt or user ID is missing" }, { status: 400 });
    }

    const history = getHistory(userId);

    // Add user message to history
    addMessage(userId, "user", prompt);

    const formattedHistory = history.map(h => `${h.role}: ${h.content}`).join("\n");

    try {
        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            contents:`${prompt}\n\nPast conversation:\n${formattedHistory}`,
        });

        addMessage(userId, "ai", response.text);

        console.log(response.text);
        return NextResponse.json({ text: response.text }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ text: error }, { status: 500 });
    }
}
