import AppError from '@shared/errors/AppError';

import FakeBookTransactionRepository from '../repositories/fakes/FakeBookTransactionRepository';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CreateBookTransactionService from './CreateBookTransactionService';

let fakeBookTransactionRepository: FakeBookTransactionRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBooksRepository: FakeBooksRepository;

let createBookTransaction: CreateBookTransactionService;

describe('Create Book Transaction', () => {
  beforeEach(() => {
    fakeBookTransactionRepository = new FakeBookTransactionRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBooksRepository = new FakeBooksRepository();
    createBookTransaction = new CreateBookTransactionService(
      fakeBookTransactionRepository,
      fakeBooksRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to lend a book for an exist user', async () => {
    const from_user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john-doe@example.com',
      password: '123',
    });

    const book = await fakeBooksRepository.create({
      name: 'John Doe Book',
      user_id: from_user.id,
    });

    const to_user = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'john-tree@example.com',
      password: '123',
    });

    const bookTransaction = await createBookTransaction.execute({
      book_id: book.id,
      from_user_id: from_user.id,
      to_user_id: to_user.id,
    });

    expect(bookTransaction).toHaveProperty('id');
    expect(bookTransaction.to_user_id).toBe(to_user.id);
  });

  it('should not be able to lend a book for a non-exist user', async () => {
    const from_user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john-doe@example.com',
      password: '123',
    });

    const book = await fakeBooksRepository.create({
      name: 'John Doe Book',
      user_id: from_user.id,
    });

    await expect(
      createBookTransaction.execute({
        book_id: book.id,
        from_user_id: from_user.id,
        to_user_id: 'to_user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to lend a book that its already lended', async () => {
    const from_user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john-doe@example.com',
      password: '123',
    });

    const book = await fakeBooksRepository.create({
      name: 'John Doe Book',
      user_id: from_user.id,
    });

    const to_user = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'john-tree@example.com',
      password: '123',
    });

    await createBookTransaction.execute({
      book_id: book.id,
      from_user_id: from_user.id,
      to_user_id: to_user.id,
    });

    await expect(
      createBookTransaction.execute({
        book_id: book.id,
        from_user_id: from_user.id,
        to_user_id: to_user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to lend a book that its already returned', async () => {
    const from_user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john-doe@example.com',
      password: '123',
    });

    const book = await fakeBooksRepository.create({
      name: 'John Doe Book',
      user_id: from_user.id,
    });

    const to_user = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'john-tree@example.com',
      password: '123',
    });

    const firstBookTransaction = await createBookTransaction.execute({
      book_id: book.id,
      from_user_id: from_user.id,
      to_user_id: to_user.id,
    });

    firstBookTransaction.is_return = true;

    const secondBookTransaction = await createBookTransaction.execute({
      book_id: book.id,
      from_user_id: from_user.id,
      to_user_id: to_user.id,
    });

    expect(secondBookTransaction).toHaveProperty('id');
    expect(secondBookTransaction.to_user_id).toBe(to_user.id);
  });
});
