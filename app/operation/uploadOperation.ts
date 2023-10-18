import openaiService from '../utils/openai'
import redis from '../utils/redis'
import fs from 'fs'

class ChatOperation {
  private path: string

  constructor(path: string) {
    this.path = path
  }

  call() {
    this.readFile();
  }

  private async readFile() {
    try {
      const data = fs.readFileSync(this.path || '', 'utf8');
      const lines = data.split('\n');
      const paragraph = lines.join(' ').trim().replace(/\s+/g, ' ');
      const chunks = this.chunkData(paragraph, 500);
      const embedding = new openaiService(chunks);
      const embeddingData = embedding.createEmbedding();
      let i = 0;
      while (i < (await embeddingData).data.length) {
        this.saveData((await embeddingData).data[i]['embedding'])
      }
      console.log(data);
    } catch (error) {
      console.error('Error reading file' + error)
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

  private async saveData(document: any) {
    const statusRedis = redis.isOpen
    await redis.set('embaddings', JSON.stringify(document))
    console.log(statusRedis)
  }

}

export default ChatOperation
