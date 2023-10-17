import multer from 'multer';
import path from 'path'

const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads');

const storage = multer.diskStorage({
  destination: uploadFilePath,
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage});

export { upload }
