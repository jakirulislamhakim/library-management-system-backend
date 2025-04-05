import { z } from 'zod';
import { BorrowBookValidations } from './borrowBook.validation';

export type TCreateBorrowBook = z.infer<
  typeof BorrowBookValidations.borrowBookValidationSchema
>;

export type TBorrowBook = TCreateBorrowBook & {
  borrowId: string;
  borrowDate: Date;
  returnDate?: Date | null;
};
