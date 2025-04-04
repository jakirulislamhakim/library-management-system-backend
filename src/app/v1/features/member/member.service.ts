import { prisma } from '../../../../prisma/client';
import { TCreateMember } from './member.interface';

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

const getMembersByIdFromDB = async (memberId: string) => {
  const getMemberById = await prisma.$queryRaw`
      SELECT * FROM members WHERE "memberId" = ${memberId}
  `;
  // const getMemberById = await prisma.member.findUnique({
  //   where: { memberId: id },
  // });
  return getMemberById;
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getMembersByIdFromDB,
};
