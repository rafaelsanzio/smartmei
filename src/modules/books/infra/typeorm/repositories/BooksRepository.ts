import { getRepository, Repository } from 'typeorm';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';

import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';

import Book from '../entities/Book';
import IFindBookByUserDTO from '@modules/books/dtos/IFindBookByUserDTO';

class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async create({ name, user_id }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      name,
      user_id,
    });

    await this.ormRepository.save(book);

    return book;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id);

    return book;
  }
}

export default BooksRepository;
