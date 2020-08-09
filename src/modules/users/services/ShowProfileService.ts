import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userID: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userID }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userID);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
