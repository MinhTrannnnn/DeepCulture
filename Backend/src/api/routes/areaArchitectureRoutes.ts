import { Router } from 'express';
import { AreaArchitectureController } from '../controllers/AreaArchitectureController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export function createAreaArchitectureRoutes(controller: AreaArchitectureController): Router {
    const router = Router();
    router.post(
        '/areas/:areaId/architectures', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.addArchitectureToArea(req, res)
    );
    router.get(
        '/areas/:areaId/architectures', 
        authMiddleware, 
        (req, res) => controller.getAreaArchitectures(req, res)
    );
    router.put(
        '/areas/:areaId/architectures/:architectureId', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.updateAreaArchitecture(req, res)
    );
    router.delete(
        '/areas/:areaId/architectures/:architectureId', 
        authMiddleware, 
        roleMiddleware(['ADMIN']), 
        (req, res) => controller.removeArchitectureFromArea(req, res)
    );
    return router;
}
