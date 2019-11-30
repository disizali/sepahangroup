import jwt from "jsonwebtoken";
export default async (req, res) => {
  if (req.method == "POST") {
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
  }
  if (req.method == "GET") {
    return res.send("LOGIN");
  }
};