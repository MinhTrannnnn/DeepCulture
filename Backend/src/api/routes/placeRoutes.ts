import { Router } from 'express';
import { PlaceController } from '../controllers/PlaceController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export const createPlaceRoutes = (controller: PlaceController) => {
    const router = Router();

    router.post(
        '/', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.create(req, res)
    );
    router.get(
        '/:id', 
        authMiddleware, 
        (req, res) => controller.getById(req, res)
    );
    router.get(
        '/', 
        authMiddleware, 
        (req, res) => controller.list(req, res)
    );
    router.put(
        '/:id', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.update(req, res)
    );
    router.delete(
        '/:id', 
        authMiddleware, 
        roleMiddleware(['ADMIN']), 
        (req, res) => controller.delete(req, res)
    );

    return router;
};
