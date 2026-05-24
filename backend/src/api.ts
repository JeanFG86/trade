import express, { Request, Response } from "express";
import crypo from "crypto";
import cors from "cors";
import { getAccount, signup } from "./main";
const app = express();
app.use(express.json());
app.use(cors());


app.post("/signup", async (req: Request, res: Response) => {
  const account = req.body;
  console.log("Signup endpoint hit with account data:", account);

  try {
    const output = await signup(account);
    res.json(output);
  } catch (error: any) {
    res.status(422).json(
      { message: error.message }
    );
  }
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId as string;
  const output = await getAccount(accountId);
  res.json(output);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
