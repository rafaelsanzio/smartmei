import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersConroller = new UsersController();

usersRouter.post('/', usersConroller.create);

export default usersRouter;
