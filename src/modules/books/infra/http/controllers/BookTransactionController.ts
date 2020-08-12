import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBookTransactionService from '@modules/books/services/CreateBookTransactionService';
import UpdateBookTransactionService from '@modules/books/services/UpdateBookTransactionService';

export default class BookTransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const from_user_id = request.user.id;
    const { book_id, to_user_id } = request.body;

    const createBookTransaction = container.resolve(
      CreateBookTransactionService,
    );

    const bookTransaction = await createBookTransaction.execute({
      book_id,
      from_user_id,
      to_user_id,
    });

    return response.json(bookTransaction);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.query.id;

    const updateBookTransaction = container.resolve(
      UpdateBookTransactionService,
    );

    const updatedBookTransaction = await updateBookTransaction.execute(id);

    return response.json(updatedBookTransaction);
  }
}
