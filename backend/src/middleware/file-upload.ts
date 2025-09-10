import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
} as const;

const fileUpload = multer({
  limits: { fileSize: 500000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb: FileFilterCallback) => {
    const isValid =
      !!MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Invalid mime type!") as unknown as null, false);
    }
  },
});

export default fileUpload;
