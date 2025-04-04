import { z } from 'zod';
import { MemberValidations } from './member.validation';

export type TCreateMember = z.infer<
  typeof MemberValidations.createMemberValidationSchema
>;
