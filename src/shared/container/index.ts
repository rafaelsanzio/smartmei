import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import BooksRepository from '@modules/books/infra/typeorm/repositories/BooksRepository';

import IBookTransactionRepository from '@modules/books/repositories/IBookTransactionRepository';
import BookTransactionRepository from '@modules/books/infra/typeorm/repositories/BookTransactionRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<IBookTransactionRepository>(
  'BookTransactionRepository',
  BookTransactionRepository,
);
