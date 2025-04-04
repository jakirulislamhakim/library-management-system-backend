/*
  Warnings:

  - You are about to drop the `borrow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_memberId_fkey";

-- DropTable
DROP TABLE "borrow";

-- DropTable
DROP TABLE "member";

-- CreateTable
CREATE TABLE "members" (
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "memberShipDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "borrows" (
    "borrowId" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "bookId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "borrows_pkey" PRIMARY KEY ("borrowId")
);

-- CreateIndex
CREATE UNIQUE INDEX "borrows_bookId_key" ON "borrows"("bookId");

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
