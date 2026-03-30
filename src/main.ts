import "dotenv/config";
import express from "express";
import cors from "cors";
import config from "./config/config.js";
import employee from "./routes/employee.js";
import department from "./routes/department.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/department", department);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(config.server.port, config.server.host, () => {
  console.log("The server started: ", config.server.port);
});
