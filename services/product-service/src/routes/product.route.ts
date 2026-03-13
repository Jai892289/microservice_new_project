import { Router } from "express";
import { createProduct } from "../controllers/product.controller";


const router = Router();

router.post("/products/create", createProduct);

export default router;