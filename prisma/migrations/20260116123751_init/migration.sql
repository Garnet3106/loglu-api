-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fbUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentPreview" TEXT NOT NULL,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemoContent" (
    "memoId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "MemoContent_pkey" PRIMARY KEY ("memoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_fbUid_key" ON "User"("fbUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Memo_date_ownerId_idx" ON "Memo"("date", "ownerId");

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoContent" ADD CONSTRAINT "MemoContent_memoId_fkey" FOREIGN KEY ("memoId") REFERENCES "Memo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
