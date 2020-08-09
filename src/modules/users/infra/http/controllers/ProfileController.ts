import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userID = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userID });

    delete user.password;

    return response.json(user);
  }
}
