import { Router } from 'express';
import { BookRoutes } from '../features/book/book.route';
import { MemberRoutes } from '../features/member/member.route';
import { BorrowBookRoutes } from '../features/borrowBook/borrowBook.route';
import { TestRoutes } from '../features/test/test.route';

type TModulesRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModulesRoutes[] = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/members',
    route: MemberRoutes,
  },
  {
    path: '/',
    route: BorrowBookRoutes,
  },
  {
    path: '/test',
    route: TestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const V1ModulesRoutes = router;
