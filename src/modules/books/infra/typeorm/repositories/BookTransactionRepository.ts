import { getRepository, Repository } from 'typeorm';

import IBookTransactionRepository from '@modules/books/repositories/IBookTransactionRepository';

import ICreateBookTransactionDTO from '@modules/books/dtos/ICreateBookTransactionDTO';

import BookTransaction from '../entities/BookTransaction';
import IFindBookByUserDTO from '@modules/books/dtos/IFindBookByUserDTO';

class BookTransactionRepository implements IBookTransactionRepository {
  private ormRepository: Repository<BookTransaction>;

  constructor() {
    this.ormRepository = getRepository(BookTransaction);
  }

  public async create({
    book_id,
    from_user_id,
    to_user_id,
  }: ICreateBookTransactionDTO): Promise<BookTransaction> {
    const bookTransaction = this.ormRepository.create({
      book_id,
      from_user_id,
      to_user_id,
    });

    await this.ormRepository.save(bookTransaction);

    return bookTransaction;
  }

  public async findBookByUser({
    book_id,
    from_user_id,
  }: IFindBookByUserDTO): Promise<BookTransaction | undefined> {
    const findBookByUser = this.ormRepository.findOne({
      where: { book_id, from_user_id },
    });

    return findBookByUser;
  }

  public async update(id: string): Promise<BookTransaction | undefined> {
    await this.ormRepository.update({ id }, { is_return: true });

    const bookTransaction = await this.ormRepository.findOne({ id });
    return bookTransaction;
  }

  public async findById(id: string): Promise<BookTransaction | undefined> {
    const bookTransaction = await this.ormRepository.findOne(id);

    return bookTransaction;
  }

  public async findBookTransactionsByUserID(
    user_id: string,
  ): Promise<BookTransaction[]> {
    const bookTransaction = await this.ormRepository.find({
      from_user_id: user_id,
    });

    return bookTransaction;
  }
}

export default BookTransactionRepository;
