import { prisma } from '../../../../prisma/client';
import { TBorrowBook, TCreateBorrowBook } from './borrowBook.interface';

const createBorrowBookIntoDB = async (payload: TCreateBorrowBook) => {
  const { bookId, memberId } = payload;

  //   const borrowBook = await prisma.borrow.create({
  //     data: {
  //       bookId,
  //       memberId,
  //     },
  //     select: {
  //       bookId: true,
  //       memberId: true,
  //       borrowDate: true,
  //       borrowId: true,
  //     },
  //   });

  const borrowBook = await prisma.$queryRaw<TBorrowBook[]>`
  INSERT INTO borrows ("borrowId", "bookId", "memberId", "borrowDate")
  VALUES (gen_random_uuid(), ${bookId}, ${memberId}, NOW())
  RETURNING "borrowId", "borrowDate", "bookId", "memberId";
`;

  return borrowBook[0];
};

const returnBorrowBook = async (borrowId: string) => {
  // await prisma.borrow.update({
  //   where: {
  //     borrowId,
  //   },
  //   data: {
  //     returnDate: new Date(),
  //   },
  // });

  await prisma.$executeRaw`
  UPDATE borrows SET "returnDate" = NOW()
  WHERE "borrowId" = ${borrowId};
`;
};

export const BorrowBookServices = {
  createBorrowBookIntoDB,
  returnBorrowBook,
};
