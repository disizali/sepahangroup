import express from "express";
import { sequelize as db } from "../../../models";
import cors from "cors";
const app = express();
const { Product, Type } = db.models;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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
