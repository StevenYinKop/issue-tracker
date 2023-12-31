-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assignee` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignee_fkey` FOREIGN KEY (`assignee`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
