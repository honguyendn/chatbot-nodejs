import { Router} from 'express';
import ChatController from '../app/controllers/chatController'
import { upload } from '../app/utils/upload';

const router = Router();

router.post("/upload", upload.single("files"), ChatController.upload)

export default router
