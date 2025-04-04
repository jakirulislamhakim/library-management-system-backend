import { z } from 'zod';
import { BookValidations } from './book.validation';

export type TCreateBook = z.infer<
  typeof BookValidations.createBookValidationSchema
>;

export type TUpdateBook = z.infer<
  typeof BookValidations.updateBookValidationSchema
>;
