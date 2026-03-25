import { Request, Response } from "express";
import { createProductService } from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock  } = req.body;
        if (!name || !description || !price || !stock) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const createdProduct = await createProductService(name, description, price, stock,  (req as any).user.userId);
        res.status(201).json({ message: "Product created successfully", product: createdProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }

}