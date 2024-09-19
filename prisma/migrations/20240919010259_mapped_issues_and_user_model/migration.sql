-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `developerId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
