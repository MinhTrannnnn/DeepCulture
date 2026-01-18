import { Router } from 'express';
import { PlaceIntangibleController } from '../controllers/PlaceIntangibleController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export function createPlaceIntangibleRoutes(controller: PlaceIntangibleController): Router {
    const router = Router();
    router.post(
        '/places/:placeId/intangible-heritages', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.addIntangibleToPlace(req, res)
    );
    router.get(
        '/places/:placeId/intangible-heritages', 
        authMiddleware, 
        (req, res) => controller.getPlaceIntangibles(req, res)
    );
    router.delete(
        '/places/:placeId/intangible-heritages/:intangibleHeritageId', 
        authMiddleware, 
        roleMiddleware(['ADMIN']), 
        (req, res) => controller.removeIntangibleFromPlace(req, res)
    );
    router.get(
        '/intangible-heritages/:intangibleHeritageId/places', 
        authMiddleware, 
        (req, res) => controller.getIntangiblePlaces(req, res)
    );
    return router;
}
