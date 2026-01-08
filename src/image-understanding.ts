import { IMAGE_PROMPT_V2 } from "./prompts/image-prompts.js";
import { Gemini } from "./gemini.js";
import { createUserContent, createPartFromUri } from "@google/genai";

const ai = Gemini();

async function ImageUnderstanding(prompt: string) {
  const image = await ai.files.upload({
    file: "gemini-practice/src/assets/harkirat-bounty.png",
  });

  if (!image.uri || !image.mimeType) {
    throw new Error("No images");
  }

  const reponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      createUserContent([prompt, createPartFromUri(image.uri, image.mimeType)]),
    ],
  });

  console.log(reponse.text);
}

ImageUnderstanding(IMAGE_PROMPT_V2);
