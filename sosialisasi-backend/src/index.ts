import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";
import docs from "./docs/route";
import cors from "cors";
import path from "path";
import { initSocket } from "./lib/socket";

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

async function init() {
  try {
    const result = await db();
    console.log("database status", result);

    const app = express();
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: FRONTEND_URL,
        credentials: true,
      })
    );

    app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.use("/api", router);
    docs(app);

    const server = initSocket(app);

    server.listen(PORT, () => {
      console.log(`Server + Socket running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
