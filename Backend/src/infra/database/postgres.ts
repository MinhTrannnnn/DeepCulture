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
import { PersonModel } from '../../data/models/PersonModel';
import { IntangibleHeritageModel } from '../../data/models/IntangibleHeritageModel';
import { ArchitectureModel } from '../../data/models/ArchitectureModel';
import { ArtifactModel } from '../../data/models/ArtifactModel';
import { HanNomInscriptionModel } from '../../data/models/HanNomInscriptionModel';
import { PlaceDynastyModel } from '../../data/models/PlaceDynastyModel';
import { PlaceIntangibleModel } from '../../data/models/PlaceIntangibleModel';
import { AreaArchitectureModel } from '../../data/models/AreaArchitectureModel';
import { PersonDynastyModel } from '../../data/models/PersonDynastyModel';
import { MediaModel } from '../../data/models/MediaModel';
import { MediaRelationModel } from '../../data/models/MediaRelationModel';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_NAME,
        }
    ),
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [
        UserModel,
        AdministrativeUnitModel,
        DeityModel,
        PlaceModel,
        PlaceDeityModel,
        DynastyModel,
        AreaModel,
        PersonModel,
        IntangibleHeritageModel,
        ArchitectureModel,
        ArtifactModel,
        HanNomInscriptionModel,
        PlaceDynastyModel,
        PlaceIntangibleModel,
        AreaArchitectureModel,
        PersonDynastyModel,
        MediaModel,
        MediaRelationModel
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