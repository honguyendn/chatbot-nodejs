import uploadOperation from '../operation/uploadOperation';

class ChatController {

  upload(req: any, res: any): void {
    if (!req.file) throw 'File not found';

    const operation = new uploadOperation(req.file.path);
    operation.call();
    res.json({ message: "Successfully uploaded files" })
  }
}

export default new ChatController
