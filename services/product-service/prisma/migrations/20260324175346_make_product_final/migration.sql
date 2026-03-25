/*
  Warnings:

  - Made the column `updatedAt` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vendorId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "vendorId" SET NOT NULL;
