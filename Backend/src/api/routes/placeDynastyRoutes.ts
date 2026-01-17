import { Router } from 'express';
import { PlaceDynastyController } from '../controllers/PlaceDynastyController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export function createPlaceDynastyRoutes(controller: PlaceDynastyController): Router {
    const router = Router();

    // Place-centric routes: /api/places/:placeId/dynasties
    router.post(
        '/places/:placeId/dynasties', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.addDynastyToPlace(req, res)
    );
    router.get(
        '/places/:placeId/dynasties', 
        authMiddleware, 
        (req, res) => controller.getPlaceDynasties(req, res)
    );
    router.put(
        '/places/:placeId/dynasties/:dynastyId', 
        authMiddleware, 
        roleMiddleware(['admin', 'editor']), 
        (req, res) => controller.updatePlaceDynasty(req, res)
    );
    router.delete(
        '/places/:placeId/dynasties/:dynastyId', 
        authMiddleware, 
        roleMiddleware(['admin']), 
        (req, res) => controller.removeDynastyFromPlace(req, res)
    );

    // Dynasty-centric routes: /api/dynasties/:dynastyId/places
    router.get(
        '/dynasties/:dynastyId/places', 
        authMiddleware, 
        (req, res) => controller.getDynastyPlaces(req, res)
    );

    return router;
}
