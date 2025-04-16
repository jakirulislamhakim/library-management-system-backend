import catchAsync from '../../utils/catchAsync';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { TestServices } from './test.service';

/*
 * not found error handler
 * wrong uuid
 *
 *
 *
 */

const testController = catchAsync(async (req, res) => {
  const payload = await TestServices.testService();

  sendApiResponse(res, {
    statusCode: 200,
    message: 'Success Fully Get Response',
    payload,
  });
});

export const TestControllers = {
  testController,
};
