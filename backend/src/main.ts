
import crypo from "crypto";
import { validateCpf } from "./validateCpf";
import pgp from "pg-promise";
import { validatePassword } from "./validatePassword";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { error } from "console";

const connection = pgp()("postgres://postgres:123456@db/trade_db");
console.log("Database connection established", connection);

export const signup = async (account: any) => {

  const accountId = crypo.randomUUID();
  if (!validateName(account.name)) throw new Error("Invalid name");
  if (!validateEmail(account.email)) throw new Error("Invalid email");
  if (!validateCpf(account.document)) throw new Error("Invalid document");
  if (!validatePassword(account.password)) throw new Error("Invalid password");


  await connection.query("INSERT INTO trade.account (account_id, name, email, document, password) VALUES ($1, $2, $3, $4, $5)", [
    accountId,
    account.name,
    account.email,
    account.document,
    account.password,
  ]);
  return {
    accountId
  }
}

export const getAccount = async (accountId: string) => {
  const [account] = await connection.query("select * from trade.account where account_id = $1", [accountId]);
  return account;
}
