import express, { Request, Response } from "express";
import crypo from "crypto";
const app = express();

app.post("/signup", (req: Request, res: Response) => {
  console.log("Signup endpoint hit2");
  const accountId = crypo.randomUUID();
  res.json({ accountId });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
