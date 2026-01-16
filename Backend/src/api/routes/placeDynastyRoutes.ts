import { Router } from 'express';
import { PlaceDynastyController } from '../controllers/PlaceDynastyController';

export function createPlaceDynastyRoutes(controller: PlaceDynastyController): Router {
    const router = Router();

    // Place-centric routes: /api/places/:placeId/dynasties
    router.post('/places/:placeId/dynasties', (req, res) => controller.addDynastyToPlace(req, res));
    router.get('/places/:placeId/dynasties', (req, res) => controller.getPlaceDynasties(req, res));
    router.put('/places/:placeId/dynasties/:dynastyId', (req, res) => controller.updatePlaceDynasty(req, res));
    router.delete('/places/:placeId/dynasties/:dynastyId', (req, res) => controller.removeDynastyFromPlace(req, res));

    // Dynasty-centric routes: /api/dynasties/:dynastyId/places
    router.get('/dynasties/:dynastyId/places', (req, res) => controller.getDynastyPlaces(req, res));

    return router;
}
