import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import BookTransaction from '../infra/typeorm/entities/BookTransaction';

import IBookTransactionRepository from '../repositories/IBookTransactionRepository';
import IBooksRepository from '../repositories/IBooksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  book_id: string;
  from_user_id: string;
  to_user_id: string;
}

@injectable()
class CreateBookTransactionService {
  constructor(
    @inject('BookTransactionRepository')
    private bookTransactionRepository: IBookTransactionRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    book_id,
    from_user_id,
    to_user_id,
  }: IRequest): Promise<BookTransaction> {
    const user = await this.usersRepository.findById(to_user_id);

    if (!user) {
      throw new AppError(
        'You are not able to lend a book for a non-exist user!',
      );
    }

    const bookLended = await this.bookTransactionRepository.findBookByUser({
      book_id,
      from_user_id,
    });

    if (bookLended) {
      if (!bookLended.is_return) {
        throw new AppError('You cannot lend this book. Its already lended.');
      }
    }

    const bookTransaction = await this.bookTransactionRepository.create({
      book_id,
      from_user_id,
      to_user_id,
    });

    return bookTransaction;
  }
}

export default CreateBookTransactionService;
