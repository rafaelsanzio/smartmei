import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookService from '@modules/books/services/CreateBookService';

export default class BookController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({
      name,
      user_id,
    });

    return response.json(book);
  }
}
