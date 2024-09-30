import model from "../models/whitelist.model";
import { ClientSession } from "mongoose";

interface IAddWhitelistArgs {
  walletAddress: string;
}

async function add(_body: IAddWhitelistArgs, session: ClientSession) {
  return await model.create([_body], { session });
}

export default { add };
