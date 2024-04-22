-- CreateTable
CREATE TABLE `Equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registrationNumber` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(191) NOT NULL,
    `liftingCapacityKg` INTEGER NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `constructionYear` INTEGER NOT NULL,
    `validityDate` DATETIME(3) NOT NULL,
    `protocolFilePath` VARCHAR(191) NULL,
    `decisionFilePath` VARCHAR(191) NULL,
    `manualFilePath` VARCHAR(191) NULL,
    `deviceSchematics` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Equipment_registrationNumber_key`(`registrationNumber`),
    UNIQUE INDEX `Equipment_serialNumber_key`(`serialNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fault` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `present` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `valMod` INTEGER NOT NULL,

    UNIQUE INDEX `Permission_valMod_key`(`valMod`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToType_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToPermission` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToPermission_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentToFault` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EquipmentToFault_AB_unique`(`A`, `B`),
    INDEX `_EquipmentToFault_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EquipmentToType` ADD CONSTRAINT `_EquipmentToType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToType` ADD CONSTRAINT `_EquipmentToType_B_fkey` FOREIGN KEY (`B`) REFERENCES `Type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToPermission` ADD CONSTRAINT `_EquipmentToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToPermission` ADD CONSTRAINT `_EquipmentToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToFault` ADD CONSTRAINT `_EquipmentToFault_A_fkey` FOREIGN KEY (`A`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentToFault` ADD CONSTRAINT `_EquipmentToFault_B_fkey` FOREIGN KEY (`B`) REFERENCES `Fault`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
