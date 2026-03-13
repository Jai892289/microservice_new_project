import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", productRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});