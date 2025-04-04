/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "book" (
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "totalCopies" INTEGER NOT NULL,
    "availableCopies" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("bookId")
);

-- CreateTable
CREATE TABLE "member" (
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "memberShipDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "borrow" (
    "borrowId" TEXT NOT NULL,
    "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),
    "bookId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "borrow_pkey" PRIMARY KEY ("borrowId")
);

-- CreateIndex
CREATE UNIQUE INDEX "borrow_bookId_key" ON "borrow"("bookId");

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;
