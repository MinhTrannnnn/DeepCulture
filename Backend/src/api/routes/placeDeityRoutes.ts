import { Router } from 'express';
import { PlaceDeityController } from '../controllers/PlaceDeityController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export const createPlaceDeityRoutes = (controller: PlaceDeityController) => {
    const router = Router();

    // Place-centric routes
    router.post(
        '/places/:placeId/deities', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.addDeityToPlace(req, res)
    );
    router.get(
        '/places/:placeId/deities', 
        authMiddleware, 
        (req, res) => controller.getPlaceDeities(req, res)
    );
    router.put(
        '/places/:placeId/deities/:deityId', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.updatePlaceDeity(req, res)
    );
    router.delete(
        '/places/:placeId/deities/:deityId', 
        authMiddleware, 
        roleMiddleware(['admin']), 
        (req, res) => controller.removeDeityFromPlace(req, res)
    );

    // Deity-centric routes
    router.get(
        '/deities/:deityId/places', 
        authMiddleware, 
        (req, res) => controller.getDeityPlaces(req, res)
    );

    return router;
};
