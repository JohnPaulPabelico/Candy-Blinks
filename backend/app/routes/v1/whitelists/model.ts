import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants";
import { IWhitelistModel } from "../../../types";

const option = {
  timestamps: true,
};

const schema = new Schema<IWhitelistModel>(
  {
    walletAddress: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.WHITELISTS, schema);
