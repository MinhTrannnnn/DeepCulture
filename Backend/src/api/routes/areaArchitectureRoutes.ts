import { Router } from 'express';
import { AreaArchitectureController } from '../controllers/AreaArchitectureController';

export function createAreaArchitectureRoutes(controller: AreaArchitectureController): Router {
    const router = Router();
    router.post('/areas/:areaId/architectures', (req, res) => controller.addArchitectureToArea(req, res));
    router.get('/areas/:areaId/architectures', (req, res) => controller.getAreaArchitectures(req, res));
    router.put('/areas/:areaId/architectures/:architectureId', (req, res) => controller.updateAreaArchitecture(req, res));
    router.delete('/areas/:areaId/architectures/:architectureId', (req, res) => controller.removeArchitectureFromArea(req, res));
    return router;
}
