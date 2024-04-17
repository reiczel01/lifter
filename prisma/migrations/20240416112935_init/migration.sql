/*
  Warnings:

  - A unique constraint covering the columns `[valMod]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `valMod` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Permission` ADD COLUMN `valMod` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_valMod_key` ON `Permission`(`valMod`);
