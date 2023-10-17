import express from 'express'
import fs from 'fs'

class ChatOperation {
  private path: string

  constructor(path: string) {
    this.path = path
  }

  call() {
    this.readFile();
  }

  private readFile() {
    const data = fs.readFileSync(this.path || '', 'utf8');
    console.log(data);
    // this.res.json({ message: "Successfully uploaded files" })
  }

  private embedding_content = () => {

  }

}

export default ChatOperation
