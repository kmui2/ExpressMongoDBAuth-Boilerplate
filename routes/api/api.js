import express from "express";
import fs from "fs"
import path from "path";

export const router = express.Router();

// Creates the next layer of url call
// example go to /api/count to go to count folder
// Also: index.js is the file called inside the folder
fs.readdir("./routes/api", (err, items) => {
  items.filter(file => file.match(/^(.(?!.*\.js))*$/)).forEach(folder => {
    router.use("/" + folder, require("./" + folder).router);
  });
});