import { z } from 'zod';

const uuidValidationSchema = z.object({
  memberId: z
    .string({
      required_error: 'Book ID is required',
    })
    .uuid('Invalid UUID format'),
});

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

const updateMemberValidationSchema = createMemberValidationSchema.partial();
// .refine((data) => Object.keys(data).length > 0, {
//   message: 'At least one field must be provided',
// });

export const MemberValidations = {
  uuidValidationSchema,
  createMemberValidationSchema,
  updateMemberValidationSchema,
};
