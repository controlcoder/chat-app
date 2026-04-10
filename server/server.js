import "dotenv/config.js";
import server from "./src/app.js";

import connectToDB from "./src/config/db.js";
await connectToDB();

const port = process.env.PORT;
server.listen(port,()=>{
  console.log("server is listening");
});
