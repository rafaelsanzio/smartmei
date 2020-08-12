import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IBookTransactionRepository from '@modules/books/repositories/IBookTransactionRepository';

import ICreateBookTransactionDTO from '@modules/books/dtos/ICreateBookTransactionDTO';
import IFindBookByUserDTO from '@modules/books/dtos/IFindBookByUserDTO';

import BookTransaction from '../../infra/typeorm/entities/BookTransaction';

class FakeBookTransactionRepository implements IBookTransactionRepository {
  private booksTransaction: BookTransaction[] = [];

  public async create({
    book_id,
    from_user_id,
    to_user_id,
  }: ICreateBookTransactionDTO): Promise<BookTransaction> {
    const bookTrasaction = new BookTransaction();

    Object.assign(bookTrasaction, {
      id: uuid(),
      book_id,
      from_user_id,
      to_user_id,
    });

    this.booksTransaction.push(bookTrasaction);

    return bookTrasaction;
  }

  public async findBookByUser({
    book_id,
    from_user_id,
  }: IFindBookByUserDTO): Promise<BookTransaction | undefined> {
    const findUserBook = this.booksTransaction.find(
      bookTransaction =>
        bookTransaction.book_id === book_id &&
        bookTransaction.from_user_id === from_user_id,
    );

    return findUserBook;
  }

  public async update(id: string): Promise<BookTransaction | undefined> {
    const findBookTransaction = this.booksTransaction.find(
      transaction => transaction.id === id,
    );

    if (findBookTransaction) {
      findBookTransaction.is_return = true;
    }

    return findBookTransaction;
  }

  public async findById(id: string): Promise<BookTransaction | undefined> {
    const findBookTransaction = this.booksTransaction.find(
      bookTransaction => bookTransaction.id === id,
    );

    return findBookTransaction;
  }
}

export default FakeBookTransactionRepository;
