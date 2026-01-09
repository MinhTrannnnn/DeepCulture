import 'reflect-metadata'; // QUAN TRỌNG: Phải import đầu tiên cho TypeORM
import dotenv from 'dotenv';
dotenv.config(); // Load biến môi trường từ file .env

import express from 'express';
import { connectDB } from './infra/database/postgres';
import { createAuthRoutes } from './api/routes/authRoutes';
import { createAdministrativeUnitRoutes } from './api/routes/administrativeUnitRoutes';

// Import DI Modules
import { AuthModule } from './core/di/modules/AuthModule';
import { AdministrativeUnitModule } from './core/di/modules/AdministrativeUnitModule';

const app = express();
app.use(express.json());

// Routes - Clean and simple!
app.use('/api/auth', createAuthRoutes(AuthModule.controller));
app.use('/api/administrative-units', createAdministrativeUnitRoutes(AdministrativeUnitModule.controller));

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});