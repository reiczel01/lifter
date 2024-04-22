-- CreateTable
CREATE TABLE `Fault` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `present` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToFault` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToFault_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToFault_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EquipmentToFault` ADD CONSTRAINT `_EquipmentToFault_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToFault` ADD CONSTRAINT `_EquipmentToFault_B_fkey` FOREIGN KEY (`B`) REFERENCES `Fault`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
