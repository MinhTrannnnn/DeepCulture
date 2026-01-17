import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRefreshTokenSessions1705515600000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'refresh_token_sessions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'refreshToken',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'isRevoked',
                        type: 'boolean',
                        default: false,
                        isNullable: false
                    },
                    {
                        name: 'revokedAt',
                        type: 'timestamptz',
                        isNullable: true
                    },
                    {
                        name: 'expiresAt',
                        type: 'timestamptz',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP'
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ],
                indices: [
                    {
                        columnNames: ['refreshToken'],
                        isUnique: true
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('refresh_token_sessions');
    }
}
