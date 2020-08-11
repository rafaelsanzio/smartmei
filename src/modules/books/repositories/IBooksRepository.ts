import Book from '../infra/typeorm/entities/Book';

import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
}
