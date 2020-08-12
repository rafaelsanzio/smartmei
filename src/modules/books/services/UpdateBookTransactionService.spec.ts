import AppError from '@shared/errors/AppError';

import FakeBookTransactionRepository from '../repositories/fakes/FakeBookTransactionRepository';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateBookTransactionService from './UpdateBookTransactionService';

let fakeBookTransactionRepository: FakeBookTransactionRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBooksRepository: FakeBooksRepository;

let updateBookTransaction: UpdateBookTransactionService;

describe('Update Book Transaction', () => {
  beforeEach(() => {
    fakeBookTransactionRepository = new FakeBookTransactionRepository();
    fakeBooksRepository = new FakeBooksRepository();
    updateBookTransaction = new UpdateBookTransactionService(
      fakeBookTransactionRepository,
      fakeBooksRepository,
    );
  });

  it('should be able to return a book', async () => {
    const bookTransaction = await fakeBookTransactionRepository.create({
      book_id: 'book_id',
      from_user_id: 'from_user_id',
      to_user_id: 'to_user_id',
    });

    const returnBook = await updateBookTransaction.execute({
      id: bookTransaction.id,
    });

    expect(returnBook?.is_return).toBe(true);
  });

  it('should not be able to return a book for a non-exist transaction', async () => {
    await expect(
      updateBookTransaction.execute({
        id: 'non-exists-transaction',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to return a book already returned', async () => {
    const bookTransaction = await fakeBookTransactionRepository.create({
      book_id: 'book_id',
      from_user_id: 'from_user_id',
      to_user_id: 'to_user_id',
    });

    await updateBookTransaction.execute(bookTransaction.id);

    await expect(
      updateBookTransaction.execute(bookTransaction.id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
