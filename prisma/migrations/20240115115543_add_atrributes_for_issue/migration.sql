/*
  Warnings:

  - The values [CLOSED] on the enum `Issue_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `company` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyLink` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLink` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workModel` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `company` VARCHAR(255) NOT NULL,
    ADD COLUMN `companyLink` TEXT NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `jobLink` TEXT NOT NULL,
    ADD COLUMN `location` VARCHAR(255) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(255) NOT NULL,
    ADD COLUMN `tags` VARCHAR(255) NOT NULL,
    ADD COLUMN `workModel` ENUM('HYBRID', 'ON_SITE', 'REMOTE') NOT NULL,
    MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'VIEWED', 'REJECTED', 'PHONE_SCREEN', 'TECHNICAL_INTERVIEW', 'BEHAVIOR_INTERVIEW') NOT NULL DEFAULT 'OPEN';
