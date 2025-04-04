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
  MemberControllers.getMemberByMemberId,
);

router.patch(
  '/:memberId',
  validateReq.params(MemberValidations.uuidValidationSchema),
  validateReq.body(MemberValidations.updateMemberValidationSchema),
  MemberControllers.updateMemberByMemberId,
);

router.delete(
  '/:memberId',
  validateReq.params(MemberValidations.uuidValidationSchema),
  MemberControllers.deletedMemberByMemberId,
);
export const MemberRoutes = router;
