// import { OpenAI } from 'openai'

// class openaiService {
//   private openai = new OpenAI();
//   private document: string;

//   constructor(document: any) {
//     this.document = document
//   }

//   async createEmbedding() {
//     const embedding = await this.openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: this.document
//     });
//     console.log(embedding);
//     return embedding;
//   }

// }

// export default openaiService
import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
require('dotenv').config();

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo"
});

export { openai }
