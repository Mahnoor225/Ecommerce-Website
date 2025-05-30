import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  `${Date.now()}-${file.originalname}`)
    }
  })

  const upload = multer({ storage: storage });
  export default upload