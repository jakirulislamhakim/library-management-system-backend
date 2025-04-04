import httpStatus from 'http-status';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { MemberServices } from './member.service';
import catchAsync from '../../utils/catchAsync';

const createMember = catchAsync(async (req, res) => {
  const payload = await MemberServices.createMemberIntoDB(req.body);

  sendApiResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Member created successfully',
    payload,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const payload = await MemberServices.getAllMembersFromDB();

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Members retrieved successfully',
    payload,
  });
});

const getMemberById = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const payload = await MemberServices.getMembersByIdFromDB(memberId);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Member retrieved successfully',
    payload,
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getMemberById,
};
