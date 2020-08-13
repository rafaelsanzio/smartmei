import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IBookTransactionRepository from '@modules/books/repositories/IBookTransactionRepository';
import IBooksRepository from '@modules/books/repositories/IBooksRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userID: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('BookTransactionRepository')
    private bookTransactionRepository: IBookTransactionRepository,
  ) {}

  public async execute({ userID }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userID);

    if (!user) {
      throw new AppError('User not found.');
    }

    const bookTransactions = await this.bookTransactionRepository.findBookTransactionsByUserID(
      userID,
    );

    const lendedBooks = await Promise.all(
      bookTransactions.map(async bookTransaction => {
        const toUser = await this.usersRepository.findById(
          bookTransaction.to_user_id,
        );
        const book = await this.booksRepository.findById(
          bookTransaction.book_id,
        );

        return {
          book: book?.name,
          to_user_name: toUser?.name,
          date_lended: bookTransaction.created_at,
          is_return: bookTransaction.is_return,
        };
      }),
    );

    const userHistory = {
      ...user,
      history: lendedBooks,
    };

    return userHistory;
  }
}

export default ShowProfileService;
