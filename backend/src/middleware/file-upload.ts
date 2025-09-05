import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
} as const;

const fileUpload = multer({
  limits: { fileSize: 500000 }, // 500 KB limit
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid =
      !!MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
    let error = isValid ? null : new Error("Invalid mime type!");

    cb(error, isValid);
  },
});

export default fileUpload;
