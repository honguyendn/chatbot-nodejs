import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname + '-' + Date.now())
  }
});

export const upload = multer({ storage: storage });
