import AppError from '@shared/errors/AppError';

import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateBookService from './CreateBookService';

let fakeBooksRepository: FakeBooksRepository;
let fakeUsersRepository: FakeUsersRepository;
let createBook: CreateBookService;

describe('Create Book', () => {
  beforeEach(() => {
    fakeBooksRepository = new FakeBooksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createBook = new CreateBookService(
      fakeBooksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new book for an exist user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john-doe@example.com',
      password: '123',
    });

    const book = await createBook.execute({
      name: 'book-name',
      user_id: user.id,
    });

    expect(book).toHaveProperty('id');
    expect(book.user_id).toBe(user.id);
  });

  it('should not be able to create a new book for a non-exist user', async () => {
    await expect(
      createBook.execute({
        name: 'book-name',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
