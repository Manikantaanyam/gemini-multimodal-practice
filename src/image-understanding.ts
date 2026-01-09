import { IMAGE_PROMPT_V2 } from "./prompts/image-prompts.js";
import { Gemini } from "./gemini.js";
import { createUserContent, createPartFromUri } from "@google/genai";
import fs from "fs";

// There are two ways to provide an image to the model
// 1. passing inline image data: for small files (total req size less than 20MB including prompt)
// 2. using file api (used in this file)

const ai = Gemini();

// using the files api
export async function ImageUnderstanding(prompt: string, path: string) {
  const image = await ai.files.upload({
    file: path,
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

// By passing inline data
export async function ImageUnderstandingByPassingInlineImageData(
  prompt: string,
  path: string
) {
  const base64ImageFile = fs.readFileSync(
    "E:/DSA_PREP/gemini-practice/src/assets/harkirat-bounty.png",
    { encoding: "base64" }
  );

  const content = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: prompt },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });

  console.log(response.text);
}
