import express from "express";
import morgan from "morgan";

const app = express();      // ✅ app FIRST

app.use(morgan("dev"));     // ✅ then middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Campus Safety Backend Running");
});

export default app;
