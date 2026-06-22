import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

const main = async () => {
  await initDB();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
