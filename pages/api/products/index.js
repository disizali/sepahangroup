import express from "express";
import { sequelize as db } from "../../../models";
import multer from "multer";
import cors from "cors";
const app = express();

var whitelist = ["http://sepahangroup.com", "http://www.sepahangroup.com"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

const { Product, Type } = db.models;

app
  .route("/api/products")
  .get(async (req, res) => {
    const products = await Product.findAll({
      include: [{ model: Type, required: false }]
    });
    res.send(products);
  })
  .post(async (req, res) => {
    upload.single("image")(req, {}, async err => {
      if (err) return res.send("failed");
      const { name, description } = req.body;
      const fileName = req.file.filename;
      if (!name || !description) return res.send("failed");
      return res.send(await Product.create({ ...req.body, image: fileName }));
    });
  });
export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
