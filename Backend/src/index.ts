import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './infra/database/postgres';
import { createAuthRoutes } from './api/routes/authRoutes';
import { createAdministrativeUnitRoutes } from './api/routes/administrativeUnitRoutes';
import { createDeityRoutes } from './api/routes/deityRoutes';
import { createPlaceRoutes } from './api/routes/placeRoutes';
import { createPlaceDeityRoutes } from './api/routes/placeDeityRoutes';
import { createDynastyRoutes } from './api/routes/dynastyRoutes';
import { createAreaRoutes } from './api/routes/areaRoutes';
import { createPersonRoutes } from './api/routes/personRoutes';
import { createIntangibleHeritageRoutes } from './api/routes/intangibleHeritageRoutes';
import { createArchitectureRoutes } from './api/routes/architectureRoutes';
import { createArtifactRoutes } from './api/routes/artifactRoutes';
import { createHanNomInscriptionRoutes } from './api/routes/hanNomInscriptionRoutes';
import { createPlaceDynastyRoutes } from './api/routes/placeDynastyRoutes';
import { createPlaceIntangibleRoutes } from './api/routes/placeIntangibleRoutes';
import { createAreaArchitectureRoutes } from './api/routes/areaArchitectureRoutes';
import { createPersonDynastyRoutes } from './api/routes/personDynastyRoutes';
import { createMediaRoutes } from './api/routes/mediaRoutes';

// Import DI Modules
import { AuthModule } from './core/di/modules/AuthModule';
import { AdministrativeUnitModule } from './core/di/modules/AdministrativeUnitModule';
import { DeityModule } from './core/di/modules/DeityModule';
import { PlaceModule } from './core/di/modules/PlaceModule';
import { PlaceDeityModule } from './core/di/modules/PlaceDeityModule';
import { DynastyModule } from './core/di/modules/DynastyModule';
import { AreaModule } from './core/di/modules/AreaModule';
import { PersonModule } from './core/di/modules/PersonModule';
import { IntangibleHeritageModule } from './core/di/modules/IntangibleHeritageModule';
import { ArchitectureModule } from './core/di/modules/ArchitectureModule';
import { ArtifactModule } from './core/di/modules/ArtifactModule';
import { HanNomInscriptionModule } from './core/di/modules/HanNomInscriptionModule';
import { PlaceDynastyModule } from './core/di/modules/PlaceDynastyModule';
import { PlaceIntangibleModule } from './core/di/modules/PlaceIntangibleModule';
import { AreaArchitectureModule } from './core/di/modules/AreaArchitectureModule';
import { PersonDynastyModule } from './core/di/modules/PersonDynastyModule';
import { MediaModule } from './core/di/modules/MediaModule';

const app = express();
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString('vi-VN');
    console.log(`📡 [${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
});

// Routes - Clean and simple!
app.use('/api/auth', createAuthRoutes(AuthModule.controller));
app.use('/api/administrative-units', createAdministrativeUnitRoutes(AdministrativeUnitModule.controller));
app.use('/api/deities', createDeityRoutes(DeityModule.controller));
app.use('/api/places', createPlaceRoutes(PlaceModule.controller));
app.use('/api', createPlaceDeityRoutes(PlaceDeityModule.controller));
app.use('/api/dynasties', createDynastyRoutes(DynastyModule.controller));
app.use('/api/areas', createAreaRoutes(AreaModule.controller));
app.use('/api/persons', createPersonRoutes(PersonModule.controller));
app.use('/api/intangible-heritages', createIntangibleHeritageRoutes(IntangibleHeritageModule.controller));
app.use('/api/architectures', createArchitectureRoutes(ArchitectureModule.controller));
app.use('/api/artifacts', createArtifactRoutes(ArtifactModule.controller));
app.use('/api/han-nom-inscriptions', createHanNomInscriptionRoutes(HanNomInscriptionModule.controller));
app.use('/api', createPlaceDynastyRoutes(PlaceDynastyModule.controller));
app.use('/api', createPlaceIntangibleRoutes(PlaceIntangibleModule.controller));
app.use('/api', createAreaArchitectureRoutes(AreaArchitectureModule.controller));
app.use('/api', createPersonDynastyRoutes(PersonDynastyModule.controller));
app.use('/api/media', createMediaRoutes(MediaModule.controller));

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});