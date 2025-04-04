import { prisma } from '../../../../prisma/client';
import { TCreateBook, TUpdateBook } from './book.interface';

const createBookIntoDB = async (book: TCreateBook) => {
  const createBook = await prisma.book.create({
    data: book,
  });

  return createBook;
};

const getAllBooksFromDB = async () => {
  const books = await prisma.book.findMany();

  return books;
};

const getBookByIdFromDB = async (bookId: string) => {
  const book = await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  return book;
};

const updateBookByBookIdIntoDB = async (bookId: string, book: TUpdateBook) => {
  const updatedBook = await prisma.book.update({
    where: {
      bookId,
    },
    data: book,
  });

  return updatedBook;
};

const deleteBookByBookIdFromDB = async (bookId: string) => {
  const deletedBook = await prisma.book.delete({
    where: {
      bookId,
    },
  });

  return deletedBook;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookByIdFromDB,
  updateBookByBookIdIntoDB,
  deleteBookByBookIdFromDB,
};
