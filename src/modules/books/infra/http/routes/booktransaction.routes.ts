import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BookTransactionController from '../controllers/BookTransactionController';

const bookTransactionRouter = Router();
const bookTransactionController = new BookTransactionController();

bookTransactionRouter.use(ensureAuthenticated);

bookTransactionRouter.post('/', bookTransactionController.create);
bookTransactionRouter.put('/:id', bookTransactionController.update);

export default bookTransactionRouter;
