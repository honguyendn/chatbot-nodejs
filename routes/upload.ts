import { Router} from 'express';
import ChatController from '../app/controllers/chatController'
import { upload } from '../app/utils/upload';

const router = Router();

router.post("/upload", upload.single("file-input"), ChatController.upload)

export default router
