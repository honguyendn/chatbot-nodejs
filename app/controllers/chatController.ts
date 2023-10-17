import ChatOperation from '../operation/uploadOperation';

class ChatController {

  upload(req: any, res: any): void {
    const operation = new ChatOperation(req.path);
    operation.call();
    res.redirect('/')
  }
}

export default new ChatController
