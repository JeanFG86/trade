import express, { Request, Response } from "express";
import crypo from "crypto";
import pgp from "pg-promise";
const app = express();

const connection = pgp()("postgres://postgres:123456@db/trade_db");
console.log("Database connection established", connection);

app.post("/signup", (req: Request, res: Response) => {
  const account = req.body;
  console.log("Signup endpoint hit with account data:", account);
  const accountId = crypo.randomUUID();
  res.json({ accountId });
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  console.log(`Get account endpoint hit for accountId: ${accountId}`);
  const [account] = await connection.query("SELECT * FROM trade.account", []);
  res.json({ accountId });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
