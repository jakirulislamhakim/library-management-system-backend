import { z } from 'zod';

const createMemberValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email is invalid',
    })
    .nonempty({
      message: 'Email cannot be empty',
    }),
  phone: z
    .string({
      required_error: 'Phone is required',
    })
    .nonempty({
      message: 'Phone cannot be empty',
    }),
});

const uuidValidationSchema = z.object({
  memberId: z
    .string({
      required_error: 'Book ID is required',
    })
    .uuid('Invalid UUID format'),
});

export const MemberValidations = {
  createMemberValidationSchema,
  uuidValidationSchema,
};
