import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BookController from '../controllers/BookController';

const booksRouter = Router();
const bookController = new BookController();

booksRouter.use(ensureAuthenticated);

booksRouter.post('/', bookController.create);

export default booksRouter;
