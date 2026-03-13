import { prisma } from "../lib/prisma";

export const createProductService = async (
  name: string,
  description: string,
  price: number,
  stock: number,
) => {
  (!name || !description || !price || !stock) &&
    Promise.reject(new Error("All fields are required"));

  const createProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
    },
  });
  return createProduct;
};
