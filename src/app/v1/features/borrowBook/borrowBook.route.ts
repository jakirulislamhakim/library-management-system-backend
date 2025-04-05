import { Router } from 'express';
import { validateReq } from '../../middlewares';
import { BorrowBookValidations } from './borrowBook.validation';
import { BorrowBookControllers } from './borrowBook.controller';

const router = Router();

router.post(
  '/borrow',
  validateReq.body(BorrowBookValidations.borrowBookValidationSchema),
  BorrowBookControllers.createBorrowBook,
);

router.patch(
  '/return/:borrowId',
  validateReq.params(BorrowBookValidations.uuidValidationSchema),
  BorrowBookControllers.returnBorrowBook,
);

export const BorrowBookRoutes = router;
