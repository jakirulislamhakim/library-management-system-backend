import httpStatus from 'http-status';
import { prisma } from '../../../../prisma/client';
import AppError from '../../errors/AppError';
import { TCreateMember, TMember } from './member.interface';

const createMemberIntoDB = async (payload: TCreateMember) => {
  const { email, name, phone } = payload;

  const createMember = await prisma.$queryRaw`
      INSERT INTO members ("memberId", name, email, phone)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${phone})
      RETURNING *
  `;

  // const createMember = await prisma.member.create({
  //   data: { name, email, phone },
  // });

  return createMember;
};

const getAllMembersFromDB = async () => {
  const getAllMembers = await prisma.$queryRaw`SELECT * FROM members`;

  // const getAllMembers = await prisma.member.findMany();
  return getAllMembers;
};

const getMemberByMemberIdFromDB = async (memberId: string) => {
  const getMemberById = await prisma.$queryRaw<TMember[]>`
      SELECT * FROM members WHERE "memberId" = ${memberId}
  `;

  // const getMemberById = await prisma.member.findUnique({
  //   where: { memberId: id },
  // });
  return getMemberById[0];
};

const updateMemberByMemberIdIntoDB = async (
  memberId: string,
  payload: Partial<TCreateMember>,
) => {
  // const { email, name, phone } = payload;

  const validFields = Object.entries(payload).filter(
    ([, value]) => value !== undefined,
  );

  if (validFields.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'At least one field is required for update',
    );
  }

  const clausesStr = validFields
    .map(([field], idx) => `"${field}" = $${idx + 1}`)
    .join(', ');

  const values = validFields.map(([, value]) => value);
  // Append memberId at the end of the values array
  values.push(memberId);

  const query = `UPDATE "members" SET ${clausesStr} WHERE "memberId" = $${values.length} RETURNING *;`;

  const updatedMember = await prisma.$queryRawUnsafe<TMember[]>(
    query,
    ...values,
  );

  return updatedMember[0];

  // const updatedMember = await prisma.member.update({
  //   where: { memberId },
  //   data: { name, email, phone },
  // });

  // return updatedMember;
};

const deleteMemberByMemberIdIntoDB = async (memberId: string) => {
  const deletedMember = await prisma.$queryRaw<TMember[]>`
    DELETE FROM members WHERE "memberId" = ${memberId} RETURNING *;
  `;

  // const deletedMember = await prisma.member.delete({
  //   where: { memberId },
  // });

  return deletedMember[0];
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getMemberByMemberIdFromDB,
  updateMemberByMemberIdIntoDB,
  deleteMemberByMemberIdIntoDB,
};
