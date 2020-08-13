import { uuid } from 'uuidv4';

import IBooksRepository from '@modules/books/repositories/IBooksRepository';

import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';

import Book from '../../infra/typeorm/entities/Book';

class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  public async create({ name, user_id }: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, { id: uuid(), name, user_id });

    this.books.push(book);

    return book;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const findBook = this.books.find(book => book.id === id);

    return findBook;
  }
}

export default FakeBooksRepository;
