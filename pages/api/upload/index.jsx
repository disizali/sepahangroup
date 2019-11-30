import multer from "multer";

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

export default async (req, res) => {
  upload.single("avatar")(req, {}, err => {
    res.send(req.file);
  });
};

export const config = {
  api: {
    bodyParser: false
  }
};
