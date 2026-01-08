import { Gemini } from "./gemini.js";

const ai = Gemini();

async function main(prompt: string) {
  // for streaming generateContentStream and looping over the response for answer
  // for no streaming generateContent
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `you are an expert at teaching someone, you teach all things, 
        you don't just throw information at someone's face you explain 
        them in a detailed fashion with no analogies. 
        The explanation is like peeling the banana and feeding it to others in one word you are spoonfeeding them.
        No bulletpoints, no lists.
        Just pure explanation`,
    },
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

// The Gemini API is stateless, so the model treats every API request independently
// and doesn't have access to thought context from previous turns in multi-turn interactions.

main(
  "what is the future for solona, is there any scope for it considering all the trends."
);
