import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import "./lib/redis";
import redis from "./lib/redis";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);


app.get("/",async (_, res) => {
  
 
  res.send("Auth Service Running with TypeScript 🚀");
});

app.listen(4000, () => {
  console.log("Auth service running on port 4000");
});