import { prisma } from '../../../../prisma/client';

const testService = async () => {
  // const result = await prisma.$executeRaw`
  //   INSERT INTO members ("memberId", name, email, phone , "memberShipDate")
  //   VALUES (gen_random_uuid(), 'test', null, 'test', NOW());
  //   `;

  // const result = await prisma.member.create({
  //   data: {
  //     memberId: '4908269e-4e01-465f-983e-eaa34654ae3a',
  //     name: 'test',
  //     email: '',
  //     phone: 'test',
  //   },
  // });

  // const result = await prisma.member.findUniqueOrThrow({
  //   where: {
  //     memberId: '4908269e-4e01-465f-983e-eaa34654ae3d',
  //   },
  // });

  // const result = await prisma.borrow.create({
  //   data: {
  //     bookId: '1',
  //     memberId: '1',
  //   },
  // });

  // const result = await prisma.borrow.create({
  //   data: {
  //     bookId: '6e300aa5-a8bb-49b9-a19c-3f7f8679442',
  //     memberId: '4908269e-4e01-465f-983e-eaa34654ae3',
  //   },
  // });

  // const result = await prisma.member.delete({
  //   where: {
  //     memberId: '4908269e-4e01-465f-983e-eaa34654ae3a',
  //   },
  // });

  const result = await prisma.$transaction(async (tx) => {
    // Create a new book
    const book = await tx.book.create({
      data: {
        genre: 'Test Genre',
        availableCopies: 10,
        title: 'Test Book',
        totalCopies: 10,
        publishedYear: 2023,
      },
    });

    // Create a new member
    const member = await tx.member.create({
      data: {
        memberId: '5d2bbfc7-6d49-48dd-83dd-0cc793f624d6',
        name: 'Test Member',
        email: 'test@example.com',
        phone: '1234567890',
      },
    });

    // Create a borrow record using the new book and member
    const borrow = await tx.borrow.create({
      data: {
        bookId: book.bookId,
        memberId: member.memberId,
      },
    });

    return {
      book,
      member,
      borrow,
    };
  });

  return result;
};

export const TestServices = {
  testService,
};
