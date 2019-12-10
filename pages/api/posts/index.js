import express from "express";
import cors from "cors";
import { sequelize as db } from "../../../models";
import multer from "multer";
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
const { Post } = db.models;
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
app
  .route("/api/posts")
  .get(async (req, res) => {
    const posts = await Post.findAll({ order: [["id", "DESC"]] });
    res.send(posts);
  })
  .post(async (req, res) => {
    upload.single("image")(req, {}, async err => {
      if (err) return res.send("failed");
      const { title, body } = req.body;
      const fileName = req.file.filename;
      if (!title || !body) {
        return res.send("failed");
      }
      return res.send(await Post.create({ ...req.body, image: fileName }));
    });
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    if (!id) return res.send("failed1");
    const result = await Post.destroy({ where: { id } });
    res.send(result ? "deleted" : "failed2");
  })
  .put(async (req, res) => {
    upload.single("image")(req, {}, async err => {
      if (err) return res.send("failed1");
      const { id , title, body } = req.body;
      if (!id || !title || !body) {
        return res.send("failed2");
      }
      let updatedData = { title, body };
      if (req.file) {
        updatedData.image = req.file.filename;
      }
      const result = await Post.update(updatedData, { where: { id } });
      res.send(result ? "updated" : "failed3");
    });
  });

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
