import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserModel } from '../../data/models/UserModel';
import { AdministrativeUnitModel } from '../../data/models/AdministrativeUnitModel';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [
        UserModel,
        AdministrativeUnitModel
    ],
    migrations: ['src/infra/database/migrations/*.ts'],
    migrationsTableName: 'migrations_history'
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('✅ PostgreSQL connected');
    } catch (error) {
        console.error('❌ PostgreSQL connection failed:', error);
        process.exit(1);
    }
};