import * as multer from "multer";

declare global {
  namespace Express {
    interface Request {
      userData?: {
        userId: string;
        email?: string;
      };
      file?: multer.File;
    }
  }
}

export {};
