import express from "express";
import { sequelize as db } from "../../../../models";
import cors from "cors";
const { Product, Type } = db.models;

const app = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());

app.route("/api/products/:name").get(async (req, res) => {
  const product = await Product.findOne({
    where: { name: req.params.name },
    include: [{ model: Type }]
  });
  res.send(product);
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default app;
