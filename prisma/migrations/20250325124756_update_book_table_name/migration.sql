/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_bookId_fkey";

-- DropTable
DROP TABLE "book";

-- CreateTable
CREATE TABLE "books" (
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "totalCopies" INTEGER NOT NULL,
    "availableCopies" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("bookId")
);

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("bookId") ON DELETE RESTRICT ON UPDATE CASCADE;
