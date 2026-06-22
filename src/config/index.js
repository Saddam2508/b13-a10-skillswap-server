import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTIONSTRING,
  client_uri: process.env.CLIENT_URL,
  port: process.env.PORT,
};

export default config;
