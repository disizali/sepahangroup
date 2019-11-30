import express from "express";
const app = express();
import { sequelize as db } from "../../../models";
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
    const { name, description } = req.body;
    if (!name || !description) return res.send("failed");
    return res.send(await Product.create(req.body));
  });

export default app;