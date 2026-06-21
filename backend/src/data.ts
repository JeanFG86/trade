
import pgp from "pg-promise";

export const saveAccount = async (account: any) => {
  const connection = pgp()("postgres://postgres:123456@db/trade_db");
  await connection.query("INSERT INTO trade.account (account.accountId, account.name, account.email, account.document, account.password) VALUES ($1, $2, $3, $4, $5)", [
    account.accountId,
    account.name,
    account.email,
    account.document,
    account.password,
  ]);
  await connection.$pool.end();
}

export const getConnectionByAccountId = async (accountId: string) => {
  const connection = pgp()("postgres://postgres:123456@db/trade_db");
  const [account] = await connection.query("select * from trade.account where account_id = $1", [accountId]);
  await connection.$pool.end();
  return account;
}
