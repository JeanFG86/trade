import express, { Request, Response } from "express";
import crypo from "crypto";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db/trade_db");
console.log("Database connection established", connection);

app.post("/signup", async (req: Request, res: Response) => {
  const account = req.body;
  console.log("Signup endpoint hit with account data:", account);
  const accountId = crypo.randomUUID();
  if (!account.name.match(/[a-zA-Z]+ [a-zA-Z]+/)) {
    res.status(422).json(
      { message: "Invalid name" }
    );
    return;
  }
  await connection.query("INSERT INTO trade.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [
    accountId,
    account.name,
    account.email,
    account.document,
    account.password,
  ]);
  res.json({ accountId });
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const [account] = await connection.query("select * from trade.account", []);
  res.json(account);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
