-- CreateTable
CREATE TABLE "_BookmarkToHashtag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookmarkToHashtag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookmarkToHashtag_B_index" ON "_BookmarkToHashtag"("B");

-- AddForeignKey
ALTER TABLE "_BookmarkToHashtag" ADD CONSTRAINT "_BookmarkToHashtag_A_fkey" FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToHashtag" ADD CONSTRAINT "_BookmarkToHashtag_B_fkey" FOREIGN KEY ("B") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
