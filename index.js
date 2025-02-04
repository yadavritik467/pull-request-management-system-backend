import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { mongoDbConnection } from "./database/db.js";
import { errorHandler } from "./utils/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import pullRequestRoutes from "./routes/pull-request.routes.js";
import commentsRoutes from "./routes/review.routes.js";
import approvalRoutes from "./routes/approvals.routes.js";

config({ path: "./.env" });
const app = express();

const port = process.env.port;

mongoDbConnection();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", pullRequestRoutes);
app.use("/api/v1", commentsRoutes);
app.use("/api/v1", approvalRoutes);

app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
