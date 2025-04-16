import { Router } from 'express';
import { TestControllers } from './test.controller';

const router = Router();

router.get('/', TestControllers.testController);

export const TestRoutes = router;
