import express, { Request, Response } from "express";
import crypo from "crypto";
import { validateCpf } from "./validateCpf";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db/trade_db");
console.log("Database connection established", connection);

function validatePassword(password: string) {
  if (password.length < 8)
    return false;
  if (!password.match(/[a-z]/))
    return false;
  if (!password.match(/[A-Z]/))
    return false;
  if (!password.match(/\d/))
    return false;
  return true;
}

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
  if (!account.email.match(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    res.status(422).json(
      { message: "Invalid email" }
    );
    return;
  }
  if (!validateCpf(account.document)) {
    res.status(422).json(
      { message: "Invalid document" }
    );
    return;
  }
  if (!validatePassword(account.password)) {
    res.status(422).json(
      { message: "Invalid password" }
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
  const [account] = await connection.query("select * from trade.account where account_id = $1", [accountId]);
  res.json(account);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
