import BookTransaction from '../infra/typeorm/entities/BookTransaction';

import ICreateBookTransactionDTO from '../dtos/ICreateBookTransactionDTO';
import IFindBookByUserDTO from '../dtos/IFindBookByUserDTO';

export default interface IBookTransactionRepository {
  create(data: ICreateBookTransactionDTO): Promise<BookTransaction>;
  findBookByUser(
    data: IFindBookByUserDTO,
  ): Promise<BookTransaction | undefined>;
  update(id: string): Promise<BookTransaction | undefined>;
  findById(id: string): Promise<BookTransaction | undefined>;
}
