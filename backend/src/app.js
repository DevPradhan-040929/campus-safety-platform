import express from "express";
import cors from "cors";
import morgan from "morgan";
app.use(morgan("dev"));

const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/", (req, res) => {
  res.send("Campus Safety API running");
});

export default app;
