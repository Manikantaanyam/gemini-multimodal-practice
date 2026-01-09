import { Queue } from "bullmq";
import { IMAGE_PROMPT_V2 } from "./prompts/image-prompts.js";
import { EFFICIENT_PROMPT } from "./prompts/video-prompt.js";

const aiQueue = new Queue("ai-queue");

async function addJobs() {
  await aiQueue.add("ai", {
    prompt: EFFICIENT_PROMPT,
    path: "E:/DSA_PREP/gemini-practice/src/assets/Hero-Animation2 (1).mp4",
  });

  await aiQueue.add("ai", {
    prompt: EFFICIENT_PROMPT,
    path: "E:/DSA_PREP/gemini-practice/src/assets/eden.mp4",
  });
}

await addJobs();
