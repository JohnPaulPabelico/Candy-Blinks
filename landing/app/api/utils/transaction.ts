import mongoose from "mongoose";
export const transaction = async (
  session: any,
  operations: any,
  action: any
) => {
  let data: any;
  return await session
    .withTransaction(async () => {
      const temp = await operations();
      data = !Array.isArray(temp) ? [temp] : temp;
    })
    .then(() => {
      return {
        data,
        status: "success",
        message: `${action} success`,
      };
    })
    .catch((e: any) => {
      return {
        data: [],
        status: "fail",
        message: `${e} failed`,
      };
    })
    .finally(() => {
      session.endSession();
    });
};

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(
        "mongodb+srv://admin:admin@cluster0.dceq2mc.mongodb.net/candy-blinks?retryWrites=true&w=majority",
        opts
      )
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
