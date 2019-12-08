import express from "express";
import cors from "cors";
import { sequelize as db } from "../../../../models";
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
const { Post } = db.models;
app.route("/api/posts/:title").get(async (req, res) => {
  const post = await Post.findOne({ where: { title: req.params.title } });
  res.send(post);
});

export default app;
