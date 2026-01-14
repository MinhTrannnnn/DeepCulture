import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserModel } from '../../data/models/UserModel';
import { AdministrativeUnitModel } from '../../data/models/AdministrativeUnitModel';
import { DeityModel } from '../../data/models/DeityModel';
import { PlaceModel } from '../../data/models/PlaceModel';
import { PlaceDeityModel } from '../../data/models/PlaceDeityModel';
import { DynastyModel } from '../../data/models/DynastyModel';
import { AreaModel } from '../../data/models/AreaModel';

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
        AdministrativeUnitModel,
        DeityModel,
        PlaceModel,
        PlaceDeityModel,
        DynastyModel,
        AreaModel
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