import { z } from 'zod';

const createBookValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1, 'Title is required'),
  genre: z
    .string({
      required_error: 'Genre is required',
    })
    .min(1, 'Genre is required'),
  publishedYear: z
    .number({
      required_error: 'Published year is required',
    })
    .int()
    .gte(0, 'Published year must be a positive integer'),
  totalCopies: z.number().int().gte(1, 'Total copies must be at least 1'),
  availableCopies: z
    .number({
      required_error: 'Available copies is required',
    })
    .int()
    .gte(0, 'Available copies must be a non-negative integer'),
});

const updateBookValidationSchema = createBookValidationSchema.partial();

const uuidValidationSchema = z.object({
  bookId: z
    .string({
      required_error: 'Book ID is required',
    })
    .uuid('Invalid UUID format'),
});

export const BookValidations = {
  createBookValidationSchema,
  updateBookValidationSchema,
  uuidValidationSchema,
};
