import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Book from '../infra/typeorm/entities/Book';

import IBooksRepository from '../repositories/IBooksRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  user_id: string;
}

@injectable()
class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, user_id }: IRequest): Promise<Book> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'You are not able to create a book for a non-exist user!',
      );
    }

    const book = await this.booksRepository.create({
      name,
      user_id,
    });

    return book;
  }
}

export default CreateBookService;
