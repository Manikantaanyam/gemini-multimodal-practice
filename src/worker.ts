import { Worker } from "bullmq";
import { ImageUnderstanding } from "./image-understanding.js";
import fs from "fs";
import { VideoUnderstandingByPassingInlineData } from "./video-understanding.js";
const worker = new Worker(
  "ai-queue",
  async (job) => {
    const { prompt, path } = job.data;

    console.log(`Working on job ${job.id} with file: ${path}`);

    if (!fs.existsSync(path)) {
      throw new Error(`File not found at path: ${path}`);
    }
    return await VideoUnderstandingByPassingInlineData(prompt, path);
  },
  {
    connection: { host: "localhost", port: 6379 },
  }
);
