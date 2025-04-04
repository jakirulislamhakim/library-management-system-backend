import { Router } from 'express';
import { BookControllers } from './book.controller';
import { validateReq } from '../../middlewares';
import { BookValidations } from './book.validation';

const router = Router();

router.post(
  '/',
  validateReq.body(BookValidations.createBookValidationSchema),
  BookControllers.createBook,
);

router.get('/', BookControllers.getAllBooks);

router.get(
  '/:bookId',
  validateReq.params(BookValidations.uuidValidationSchema),
  BookControllers.getBookByBookId,
);

router.patch(
  '/:bookId',
  validateReq.params(BookValidations.uuidValidationSchema),
  validateReq.body(BookValidations.updateBookValidationSchema),
  BookControllers.updateBookByBookId,
);

router.delete(
  '/:bookId',
  validateReq.params(BookValidations.uuidValidationSchema),
  BookControllers.deleteBookByBookId,
);

export const BookRoutes = router;
