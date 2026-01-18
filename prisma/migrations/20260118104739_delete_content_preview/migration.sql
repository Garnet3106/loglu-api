/*
  Warnings:

  - You are about to drop the column `contentPreview` on the `Memo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,name]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Hashtag_name_key";

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "contentPreview";

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_ownerId_name_key" ON "Hashtag"("ownerId", "name");
