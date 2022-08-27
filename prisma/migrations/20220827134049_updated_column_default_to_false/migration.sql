-- AlterTable
ALTER TABLE `Cat` MODIFY `favorited` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_adopted` BOOLEAN NOT NULL DEFAULT false;
