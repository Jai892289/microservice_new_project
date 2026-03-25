import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const createProductService = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  vendorId:string
) => { 
 
    if (!name || price == null || stock == null) {
    throw new Error("Required fields missing");
  }
 
  const createProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      vendorId
    } as Prisma.ProductCreateInput,
  });
  return createProduct;
};
