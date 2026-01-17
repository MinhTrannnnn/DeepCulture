import { Router } from 'express';
import { IntangibleHeritageController } from '../controllers/IntangibleHeritageController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export function createIntangibleHeritageRoutes(controller: IntangibleHeritageController): Router {
    const router = Router();
    router.post(
        '/', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.create(req, res)
    );
    router.get(
        '/', 
        authMiddleware, 
        (req, res) => controller.list(req, res)
    );
    router.get(
        '/:id', 
        authMiddleware, 
        (req, res) => controller.getById(req, res)
    );
    router.put(
        '/:id', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.update(req, res)
    );
    router.delete(
        '/:id', 
        authMiddleware, 
        roleMiddleware(['admin']), 
        (req, res) => controller.delete(req, res)
    );
    return router;
}
