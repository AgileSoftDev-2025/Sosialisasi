import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";
import docs from "./docs/route";
import cors from "cors";
import path from "path";

async function init() {
  try {
    const result = await db();
    console.log("database status", result);

    const app = express();
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

    const PORT = 3001;

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
