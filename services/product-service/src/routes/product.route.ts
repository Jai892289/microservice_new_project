import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { authenticateToken } from "../middleware/authenticate";
import { authorise } from "../middleware/authorize";


const router = Router();

router.post("/products/create", authenticateToken, authorise(["SELLER"]), createProduct);

export default router;