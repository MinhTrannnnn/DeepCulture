import 'reflect-metadata'; // QUAN TRỌNG: Phải import đầu tiên cho TypeORM
import dotenv from 'dotenv';
dotenv.config(); // Load biến môi trường từ file .env

import express from 'express';
import { connectDB } from './infra/database/postgres';
import { createAuthRoutes } from './api/routes/authRoutes';
import { createAdministrativeUnitRoutes } from './api/routes/administrativeUnitRoutes';
import { createDeityRoutes } from './api/routes/deityRoutes';
import { createPlaceRoutes } from './api/routes/placeRoutes';
import { createPlaceDeityRoutes } from './api/routes/placeDeityRoutes';
import { createDynastyRoutes } from './api/routes/dynastyRoutes';
import { createAreaRoutes } from './api/routes/areaRoutes';

// Import DI Modules
import { AuthModule } from './core/di/modules/AuthModule';
import { AdministrativeUnitModule } from './core/di/modules/AdministrativeUnitModule';
import { DeityModule } from './core/di/modules/DeityModule';
import { PlaceModule } from './core/di/modules/PlaceModule';
import { PlaceDeityModule } from './core/di/modules/PlaceDeityModule';
import { DynastyModule } from './core/di/modules/DynastyModule';
import { AreaModule } from './core/di/modules/AreaModule';

const app = express();
app.use(express.json());

// Routes - Clean and simple!
app.use('/api/auth', createAuthRoutes(AuthModule.controller));
app.use('/api/administrative-units', createAdministrativeUnitRoutes(AdministrativeUnitModule.controller));
app.use('/api/deities', createDeityRoutes(DeityModule.controller));
app.use('/api/places', createPlaceRoutes(PlaceModule.controller));
app.use('/api', createPlaceDeityRoutes(PlaceDeityModule.controller));
app.use('/api/dynasties', createDynastyRoutes(DynastyModule.controller));
app.use('/api/areas', createAreaRoutes(AreaModule.controller));

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});