-- DropIndex
DROP INDEX "Memo_date_ownerId_idx";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookmarkToMemo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookmarkToMemo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Bookmark_editedAt_idx" ON "Bookmark"("editedAt");

-- CreateIndex
CREATE INDEX "_BookmarkToMemo_B_index" ON "_BookmarkToMemo"("B");

-- CreateIndex
CREATE INDEX "Hashtag_referredAt_idx" ON "Hashtag"("referredAt");

-- CreateIndex
CREATE INDEX "Memo_editedAt_date_ownerId_idx" ON "Memo"("editedAt", "date", "ownerId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToMemo" ADD CONSTRAINT "_BookmarkToMemo_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToMemo" ADD CONSTRAINT "_BookmarkToMemo_B_fkey" FOREIGN KEY ("B") REFERENCES "Memo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
