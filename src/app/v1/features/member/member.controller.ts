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

const getMemberByMemberId = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const payload = await MemberServices.getMemberByMemberIdFromDB(memberId);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Member retrieved successfully',
    payload,
  });
});

const updateMemberByMemberId = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const payload = await MemberServices.updateMemberByMemberIdIntoDB(
    memberId,
    req.body,
  );
  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Member updated successfully',
    payload,
  });
});

const deletedMemberByMemberId = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const payload = await MemberServices.deleteMemberByMemberIdIntoDB(memberId);

  sendApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Member successfully deleted',
    payload,
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getMemberByMemberId,
  updateMemberByMemberId,
  deletedMemberByMemberId,
};
