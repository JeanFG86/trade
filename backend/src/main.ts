
import crypo from "crypto";
import { validateCpf } from "./validateCpf";
import pgp from "pg-promise";
import { validatePassword } from "./validatePassword";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { error } from "console";
import { getConnectionByAccountId, saveAccount } from "./data";

const connection = pgp()("postgres://postgres:123456@db/trade_db");
console.log("Database connection established", connection);

export const signup = async (account: any) => {

  const accountId = crypo.randomUUID();
  if (!validateName(account.name)) throw new Error("Invalid name");
  if (!validateEmail(account.email)) throw new Error("Invalid email");
  if (!validateCpf(account.document)) throw new Error("Invalid document");
  if (!validatePassword(account.password)) throw new Error("Invalid password");

  await saveAccount(account);
  return {
    accountId: account.accountId
  }
}

export const getAccount = async (accountId: string) => {
  const account = await getConnectionByAccountId(accountId);
  return account;
}
