import fs from "fs";

(async () => {
  const length = fs.readdirSync("./images").length;

  for (let i: number = 0; i < length; i++) {
    fs.writeFile("users.json", JSON.stringify({}), (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
      console.log("Done writing");
    });
    console.log(i + 1);
  }
})();
