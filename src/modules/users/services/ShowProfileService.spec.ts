import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeBookTransactionRepository from '@modules/books/repositories/fakes/FakeBookTransactionRepository';
import FakeBooksRepository from '@modules/books/repositories/fakes/FakeBooksRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBookTransactionRepository: FakeBookTransactionRepository;
let fakeBooksRepository: FakeBooksRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBookTransactionRepository = new FakeBookTransactionRepository();
    fakeBooksRepository = new FakeBooksRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
      fakeBooksRepository,
      fakeBookTransactionRepository,
    );
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const toUser = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'johntree@mail.com',
      password: '123456',
    });

    const book = await fakeBooksRepository.create({
      name: 'book-name',
      user_id: user.id,
    });

    await fakeBookTransactionRepository.create({
      book_id: book.id,
      from_user_id: user.id,
      to_user_id: toUser.id,
    });

    const profile = await showProfile.execute({
      userID: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@mail.com');
  });

  it('should be able to show user profile without lended books', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await fakeBookTransactionRepository.create({
      book_id: 'non-exist-book-id',
      from_user_id: user.id,
      to_user_id: 'non-exist-to-user-id',
    });

    const profile = await showProfile.execute({
      userID: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@mail.com');
  });

  it('should not be able to show user profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        userID: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
