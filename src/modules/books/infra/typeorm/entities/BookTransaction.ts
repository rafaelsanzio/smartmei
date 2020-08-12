import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Book from '@modules/books/infra/typeorm/entities/Book';

@Entity('book_transaction')
class BookTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  book_id: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: Book;

  @Column()
  from_user_id: string;

  @Column()
  to_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'from_user_id' }, { name: 'to_user_id' }])
  user: User;

  @Column()
  is_return: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BookTransaction;
