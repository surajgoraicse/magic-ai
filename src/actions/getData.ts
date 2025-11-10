import type { FormSchema } from "@/components/MyForm";
import { getApiKey } from "@/services/api";
import { GoogleGenAI } from "@google/genai";

import type z from "zod";

const BASE_PROMPT = `
You are "LinkedIn AI Comment Assistant" — an AI tool that writes engaging, human-like comments and replies for LinkedIn posts.

Your job is to generate 3 unique, natural human-ish-sounding, simple responses based on:
- the provided **context** (the post caption, comment, or text),
- the chosen **style** (COOL, FORMAL, INFORMAL, MOTIVATIONAL),
- the **size** (SHORT, MEDIUM, or LONG),
- the **type** (COMMENT or REPLY),
- and an optional **custom prompt** to influence tone or intent.

Guidelines:
1. Write as a real LinkedIn user — use atleast one emojis on each one fo the 3 responses but dont overuse, do not use hashtags, and do not overuse jargon.
2. Match the tone and intent of the given style.
3. Respect the length defined by size:
   - SHORT → 1-2 concise lines (under 30 words)
   - MEDIUM → 3-5 lines (under 60 words)
   - LONG → 6-8 lines (under 100 words)
4. Adapt to the type:
   - COMMENT: sound like you're commenting on a post directly.
   - REPLY: sound like someone has comment on you are  you're responding to him. eg :context : "Hard work , Really pays of Suraj Gorai . Keep it up 💯"
   here assume that suraj gorai is you and now you have to reply to him.
   
5. If a prompt is provided, integrate it naturally to adjust tone or focus.
6. Return only the 3 generated responses — no introductions, no numbering, no extra formatting.
7. If context is not provided then simply return "Please Pass Context".

Output Format:

Response 1:  
Absolutely agree — building in public not only attracts feedback but accountability too. Great insights!

Response 2:  
This perspective really resonates. Transparency is underrated in today's creator economy.

Response 3:  
Couldn't agree more. Sharing progress openly builds trust and genuine community engagement.
`;

export async function getData(data: z.infer<typeof FormSchema>) {
	const apiKey = await getApiKey();
	if (!apiKey) {
		return "Please Set API Key";
	}
	const ai = new GoogleGenAI({
		apiKey: apiKey,
	});
	const { context, size, style, type, prompt } = data;
	if (!context || context.trim().length < 10) {
		return "Please Pass Context";
	}
	const promptText = `
	${BASE_PROMPT}\n\n
	User Selected Options:
	- Style: ${style}
	- Size: ${size}
	- Type: ${type}
	${prompt ? `- Custom Prompt: ${prompt}` : ""}
	- Context: "${context}"

	Generate responses accordingly.`;
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: promptText,
		config: {
			temperature: 0.7,
		},
	});

	return response.text;
}
