import { z } from 'zod';
import { prisma } from '../../../../prisma/client';

const borrowBookValidationSchema = z.object({
  bookId: z
    .string()
    .uuid({
      message: 'Book ID must be a valid UUID',
    })
    .nonempty('Book ID is required')
    .refine(
      async (bookId) => {
        const isExistsBook = await prisma.book.findUnique({
          where: {
            bookId,
          },
        });

        return !!isExistsBook;
      },
      {
        message: 'Book ID does not exist',
      },
    ),

  memberId: z
    .string()
    .uuid({
      message: 'Member ID must be a valid UUID',
    })
    .nonempty('Member ID is required')
    .refine(
      async (memberId) => {
        const isExistsBook = await prisma.member.findUnique({
          where: {
            memberId,
          },
        });

        return !!isExistsBook;
      },
      {
        message: 'Member ID does not exist',
      },
    ),
});

const uuidValidationSchema = z.object({
  borrowId: z
    .string()
    .uuid({
      message: 'Borrow ID must be a valid UUID',
    })
    .nonempty('Borrow ID is required'),
});

export const BorrowBookValidations = {
  borrowBookValidationSchema,
  uuidValidationSchema,
};
