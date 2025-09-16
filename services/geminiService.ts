import { GoogleGenAI } from "@google/genai";

// Fix: Per Gemini API guidelines, assume API_KEY is present in environment variables.
// Removed unnecessary checks and used a non-null assertion.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateOfferDescription = async (keywords: string): Promise<string> => {
  // Fix: Removed API key check as per guidelines.
  if (!keywords.trim()) {
    return "Please provide some keywords to generate a description.";
  }

  try {
    const prompt = `You are a professional marketing copywriter for a large shopping mall. 
    Write a short, exciting, and compelling promotional offer description based on these keywords: "${keywords}".
    Keep it under 250 characters. Focus on customer benefits and urgency.
    Do not use markdown or special formatting.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.8,
            topP: 0.95,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "Failed to generate description. Please check the console for details.";
  }
};
