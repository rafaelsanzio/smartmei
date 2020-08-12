import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import BookTransaction from '../infra/typeorm/entities/BookTransaction';

import IBookTransactionRepository from '../repositories/IBookTransactionRepository';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class UpdateBookTransactionService {
  constructor(
    @inject('BookTransactionRepository')
    private bookTransactionRepository: IBookTransactionRepository,

    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(id: string): Promise<BookTransaction | undefined> {
    const bookTransaction = await this.bookTransactionRepository.findById(id);

    if (!bookTransaction) {
      throw new AppError('This book transaction does not exists!');
    }

    if (bookTransaction && bookTransaction.is_return) {
      throw new AppError('This book was already returned.');
    }

    const updateTransaction = await this.bookTransactionRepository.update(id);

    return updateTransaction;
  }
}

export default UpdateBookTransactionService;
