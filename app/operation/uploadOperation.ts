import { openai, embeddings } from '../utils/openai'
import redisClient from '../utils/redis'
import { Document } from 'langchain/document';
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from 'fs'
import chatOperation from './chatOperation';

class uploadOperation {
  private path: string
  private docs: any

  constructor(path: string) {
    this.path = path
  }

  call() {
    this.stepReadFile();
  }

  private async stepReadFile() {
    try {
      const data = fs.readFileSync(this.path || '', 'utf8');
      const lines = data.split('\n');
      const paragraph = lines.join(' ').trim().replace(/\s+/g, ' ');
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 1,
      });

      const docOutput = await splitter.splitDocuments([
        new Document({ pageContent: paragraph }),
      ]);

      await RedisVectorStore.fromDocuments(
        docOutput,
        embeddings,
        {
          redisClient: redisClient,
          indexName: "docs",
        }
      );
      const answer = new chatOperation('Xin chào');
      answer.call();
      // await redis.disconnect();
      // const chain = RetrievalQAChain.fromLLM(openai, vectorStore.asRetriever(1), { returnSourceDocuments: true });
      // const chainRes = await chain.call({ query: "CloudTrail?" });
      // console.log(chainRes);
    } catch (error) {
      console.error(error)
    }
  }

  private chunkData(inputText: string, chunksSize: number) {
    const chunks = [];
    let i = 0;
    while (i < inputText.length) {
      chunks.push(inputText.slice(i, i + chunksSize));
      i += chunksSize;
    }
    return chunks;
  }

}

export default uploadOperation
