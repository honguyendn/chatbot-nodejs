import { openai, embeddings } from '../utils/openai'
import redisClient from '../utils/redis'
import { Document } from 'langchain/document';
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { RetrievalQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from 'fs'

class chatOperation {
  private question: string;
  private responeAnswer: string;

  constructor(question: string) {
    this.question = question;
  }

  call() {
    this.stepRetriveUserQuestion();
  }

  private async stepRetriveUserQuestion() {
    const vectorStore = new RedisVectorStore(embeddings, { redisClient: redisClient, indexName: "docs" })
    const chain = RetrievalQAChain.fromLLM(openai, vectorStore.asRetriever(1), { returnSourceDocuments: true });
    const chainRes = await chain.call({ query: this.question });
    console.log(chainRes);
  }
}

export default chatOperation
