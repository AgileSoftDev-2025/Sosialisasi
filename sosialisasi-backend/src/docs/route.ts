import { Express } from "express";

export default function docs(app: Express) {
  app.get("/docs", (req, res) => {
    res.status(200).json({
      message: "Documentation is running",
      data: null,
    });
  });
}
