import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { BookServices } from './book.service';

const createBook = catchAsync(async (req, res) => {
  const payload = await BookServices.createBookIntoDB(req.body);

  sendApiResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Book created successfully',
    payload,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const payload = await BookServices.getAllBooksFromDB();

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    payload,
  });
});

const getBookByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const payload = await BookServices.getBookByIdFromDB(bookId);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    payload,
  });
});

const updateBookByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const payload = await BookServices.updateBookByBookIdIntoDB(bookId, req.body);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    payload,
  });
});

const deleteBookByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const payload = await BookServices.deleteBookByBookIdFromDB(bookId);
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book successfully deleted',
    payload,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookByBookId,
  updateBookByBookId,
  deleteBookByBookId,
};
