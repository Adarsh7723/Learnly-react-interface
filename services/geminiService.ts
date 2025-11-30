import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Chatbot using Gemini 3 Pro Preview
export const sendChatMessage = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "You are a helpful and encouraging AI learning assistant named Coursue AI. Keep answers concise and motivating.",
      }
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I'm having trouble connecting to the AI right now.";
  }
};

// 2. Complex Reasoning (Thinking Mode) using Gemini 3 Pro Preview with Thinking Budget
export const generateStudyPlan = async (goal: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Create a detailed, step-by-step weekly study plan for a student who wants to learn: ${goal}. Structure it with daily focus areas.`,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, // Max for Gemini 3 Pro
        },
      },
    });
    return response.text || "Unable to generate study plan.";
  } catch (error) {
    console.error("Thinking mode error:", error);
    throw error;
  }
};

// 3. Search Grounding using Gemini 2.5 Flash
export const searchTopicInfo = async (query: string): Promise<{ text: string; sources: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Find the latest information and trends regarding: ${query}.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No results found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Search error:", error);
    return { text: "Error performing search.", sources: [] };
  }
};

// 4. Image Editing using Gemini 2.5 Flash Image (Nano Banana)
export const editCourseImage = async (base64Image: string, prompt: string): Promise<string | null> => {
  try {
    // Strip header if present to get pure base64
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return the image only.`,
          },
        ],
      },
    });

    // Check for image in response parts
    if (response.candidates && response.candidates[0].content.parts) {
       for (const part of response.candidates[0].content.parts) {
         if (part.inlineData) {
           return `data:image/png;base64,${part.inlineData.data}`;
         }
       }
    }
    return null;
  } catch (error) {
    console.error("Image edit error:", error);
    throw error;
  }
};