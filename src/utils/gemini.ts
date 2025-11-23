import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// Note: In a real production app, you should proxy this through a backend to hide the key.
// For this portfolio demo, we'll use the environment variable directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
} else {
  console.warn("VITE_GEMINI_API_KEY is missing in .env file");
}

export const sendMessageToGemini = async (message: string, context: string): Promise<string> => {
  if (!model) {
    return "I'm not correctly configured yet. Please check the API key.";
  }

  try {
    const prompt = `
      You are a helpful AI assistant for Xiang Ren's portfolio website.
      Your goal is to answer questions about Xiang Ren based on the context provided below.
      
      CONTEXT ABOUT XIANG REN:
      ${context}
      
      INSTRUCTIONS:
      - Be friendly, professional, and concise.
      - Only answer based on the provided context. If you don't know, say so politely.
      - Keep answers short (under 3 sentences) unless asked for details.
      - You are acting as a representative of Xiang Ren.
      
      USER QUESTION: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
