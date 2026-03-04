
import { GoogleGenAI, Type } from "@google/genai";
import { SkillRoadmap, ImpactStory } from "../types";

export async function generateSkillRoadmap(skill: string): Promise<SkillRoadmap> {
  // Always create a new GoogleGenAI instance right before the API call to ensure use of latest API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Act as an expert mentor from "Forte-FY", an organization focused on youth skill development. The user wants to master the skill: "${skill}". 
  Provide a visionary statement (max 2 sentences) and a 4-step actionable mastery roadmap for a youth student. 
  Return JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skill: { type: Type.STRING },
            vision: { type: Type.STRING },
            milestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  action: { type: Type.STRING }
                },
                required: ["phase", "action"]
              }
            }
          },
          required: ["skill", "vision", "milestones"]
        }
      }
    });

    // Directly access .text property as it is a getter and ensure it is treated as a string before parsing
    return JSON.parse((response.text || "{}").trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      skill,
      vision: `Your journey into ${skill} is the first step toward professional mastery and societal advancement.`,
      milestones: [
        { phase: "Exploration", action: "Identify your specific niche within this field." },
        { phase: "Foundations", action: "Master the fundamental tools and theories." },
        { phase: "Application", action: "Build a portfolio of small real-world projects." },
        { phase: "Mastery", action: "Mentor others or lead a community project." }
      ]
    };
  }
}

export async function generateImpactVision(topic: string): Promise<ImpactStory> {
  // Always create a new GoogleGenAI instance right before the API call to ensure use of latest API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Act as an environmental visionary for "EcoHarmony". Create a vision for the topic: "${topic}". 
  Provide a visionary statement (max 2 sentences) and 3 strategic key goals. 
  Return JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            vision: { type: Type.STRING },
            keyGoals: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["topic", "vision", "keyGoals"]
        }
      }
    });

    // Directly access .text property as it is a getter and ensure it is treated as a string before parsing
    return JSON.parse((response.text || "{}").trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      topic,
      vision: `Towards a greener future where ${topic} becomes a cornerstone of ecological balance.`,
      keyGoals: ["Raise awareness", "Implement sustainable practices", "Engage local communities"]
    };
  }
}
