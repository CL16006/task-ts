-- AlterTable
ALTER TABLE `user` ADD COLUMN `otpAttempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `otpBlockedUntil` DATETIME(3) NULL;
