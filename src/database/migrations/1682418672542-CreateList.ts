import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateList1682418672542 implements MigrationInterface {
  name = 'CreateList1682418672542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'list',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'item',
            type: 'varchar',
          },
          {
            name: 'isDone',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable('user');
    // const foreignKey = table.foreignKeys.find(
    //   (fk) => fk.columnNames.indexOf('roleId') !== -1,
    // );
    // await queryRunner.dropForeignKey('user', foreignKey);
    // await queryRunner.dropColumn('user', 'roleId');
    await queryRunner.dropTable('list');
    // await queryRunner.dropTable('role');
  }
}
