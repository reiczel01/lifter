/*
  Warnings:

  - Made the column `image` on table `Equipment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Equipment` MODIFY `image` VARCHAR(191) NOT NULL;
