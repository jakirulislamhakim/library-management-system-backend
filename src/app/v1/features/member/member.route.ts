import { Router } from 'express';
import { validateReq } from '../../middlewares';
import { MemberValidations } from './member.validation';
import { MemberControllers } from './member.controller';

const router = Router();

router.post(
  '/',
  validateReq.body(MemberValidations.createMemberValidationSchema),
  MemberControllers.createMember,
);

router.get('/', MemberControllers.getAllMembers);

router.get(
  '/:memberId',
  validateReq.params(MemberValidations.uuidValidationSchema),
  MemberControllers.getMemberById,
);

export const MemberRoutes = router;
