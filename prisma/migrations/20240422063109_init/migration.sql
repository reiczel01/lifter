-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToType_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EquipmentToType` ADD CONSTRAINT `_EquipmentToType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToType` ADD CONSTRAINT `_EquipmentToType_B_fkey` FOREIGN KEY (`B`) REFERENCES `Type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
