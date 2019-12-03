import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app
  .route("/api/auth")
  .post((req, res) => {
    const { username, password, token } = req.body;
    if ((!username || !password) && !token) return res.send("failed");
    if (token) {
      const { username, password } = jwt.decode(token, "sepahangroupsecret");
      if (username == "sepahangroup" && password == "sepahangroup@apweb") {
        return res.send("verified");
      }
      return res.send("failed");
    }
    if (username == "sepahangroup" && password == "sepahangroup@apweb") {
      return res.send(jwt.sign({ username, password }, "sepahangroupsecret"));
    }
    return res.send("failed");
  })
  .get((req, res) => {
    return res.send("LOGIN");
  });
export default app;