import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateBookTransactions1597193183462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_transaction',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          new TableColumn({
            name: 'book_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'from_user_id',
            type: 'uuid',
            isNullable: false,
          }),
          new TableColumn({
            name: 'to_user_id',
            type: 'uuid',
            isNullable: false,
          }),
          {
            name: 'is_return',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'book_transaction',
      new TableForeignKey({
        name: 'BookID',
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_book',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'book_transaction',
      new TableForeignKey({
        name: 'FromUserID',
        columnNames: ['from_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'book_transaction',
      new TableForeignKey({
        name: 'ToUserID',
        columnNames: ['to_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('book_transaction', 'BookID');
    await queryRunner.dropForeignKey('book_transaction', 'FromUserID');
    await queryRunner.dropForeignKey('book_transaction', 'ToUserID');

    await queryRunner.dropTable('book_transaction');
  }
}
