import { OpenAI } from 'openai'

class openaiService {
  private openai = new OpenAI();
  private document: string;

  constructor(document: any) {
    this.document = document
  }

  async createEmbedding() {
    const embedding = await this.openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: this.document
    });
    console.log(embedding);
    return embedding;
  }

}

export default openaiService
