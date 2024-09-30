import { Schema, model } from "mongoose";

const option = {
  timestamps: true,
};

const schema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model("Whitelists", schema);
