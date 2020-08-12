import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import booksRouter from '@modules/books/infra/http/routes/books.routes';
import booktransactionRouter from '@modules/books/infra/http/routes/booktransaction.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/books', booksRouter);
routes.use('/book-transaction', booktransactionRouter);

export default routes;
