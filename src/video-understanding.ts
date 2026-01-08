import { Gemini } from "./gemini.js";
import { createPartFromUri, createUserContent } from "@google/genai";
import { VIDEO_PROMPT_V1 } from "./prompts/video-prompt.js";
import fs from "fs";

// There are 3 ways to pass videos as input
// 1. Upload the file ( use this approach for files larger than 20MB )
// 2. Pass inline video data (for files smaller than 20 MB)
// 3. pass youtube urls

const ai = Gemini();

export async function VideoUnderstandingByFilesApi(prompt: string) {
  const myfile = await ai.files.upload({
    file: "E:/DSA_PREP/gemini-practice/src/assets/eden.mp4",
    config: { mimeType: "video/mp4" },
  });

  if (!myfile.uri || !myfile.mimeType) {
    throw new Error("No video");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent([
      createPartFromUri(myfile.uri, myfile.mimeType),
      prompt,
    ]),
  });

  console.log(response.text);
}

export async function VideoUnderstandingByPassingInlineData(prompt: string) {
  const base64VideoFile = fs.readFileSync(
    "E:/DSA_PREP/gemini-practice/src/assets/eden.mp4",
    { encoding: "base64" }
  );

  const content = [
    {
      inlineData: {
        mimeType: "video/mp4",
        data: base64VideoFile,
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

export async function VideoUnderstandingByPassingYoutubeURL(prompt: string) {
  const contents = [
    {
      fileData: {
        fileUri: "https://youtube.com/shorts/FCOR--8GN4A?si=QkDPQQZYKwv-d9ri",
      },
    },
    { text: prompt },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
}

VideoUnderstandingByPassingYoutubeURL(VIDEO_PROMPT_V1);
