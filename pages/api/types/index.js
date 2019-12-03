import express from "express";
const app = express();
import { sequelize as db } from "../../../models";
const { Product, Type } = db.models;

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

app
  .route("/api/types")
  .get(async (req, res) => {
    const types = await Type.findAll({
      include: [{ model: Product, required: false }]
    });
    res.send(types);
  })
  .post(async (req, res) => {
    const {
      code,
      name,
      thinkness,
      width,
      brand,
      mood,
      deliver,
      unit,
      price,
      ProductId
    } = req.body;
    if (
      !code ||
      !name ||
      !thinkness ||
      !width ||
      !brand ||
      !mood ||
      !deliver ||
      !unit ||
      !price ||
      !ProductId
    )
      return res.send("failed1");

    return res.send(await Type.create(req.body));
  });

export default app;
