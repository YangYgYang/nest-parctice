import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1630222102818 implements MigrationInterface {
  name = 'CreateUser1630222102818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'role',
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
    await queryRunner.dropTable('user');
    // await queryRunner.dropTable('role');
  }
}
