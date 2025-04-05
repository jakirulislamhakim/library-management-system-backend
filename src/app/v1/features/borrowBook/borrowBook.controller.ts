import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { BorrowBookServices } from './borrowBook.service';

const createBorrowBook = catchAsync(async (req, res) => {
  const payload = await BorrowBookServices.createBorrowBookIntoDB(req.body);

  sendApiResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Book borrowed successfully',
    payload,
  });
});

const returnBorrowBook = catchAsync(async (req, res) => {
  const { borrowId } = req.params;

  await BorrowBookServices.returnBorrowBook(borrowId);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book returned successfully',
    payload: null,
  });
});

export const BorrowBookControllers = {
  createBorrowBook,
  returnBorrowBook,
};
