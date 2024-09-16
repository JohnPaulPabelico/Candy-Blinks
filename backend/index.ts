import "express-async-errors";
import connectDB from "./app/db";
import ENV from "./app/env/index";
import app from "./app";

(() => {
  connectDB(ENV.MONGO_CON).then(() => {
    console.log(`Database connected to ${ENV.MONGO_CON}`);
    app.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  });
})();
