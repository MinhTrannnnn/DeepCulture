import { Router } from 'express';
import { PlaceDeityController } from '../controllers/PlaceDeityController';

export const createPlaceDeityRoutes = (controller: PlaceDeityController) => {
    const router = Router();

    // Place-centric routes
    router.post('/places/:placeId/deities', (req, res) => controller.addDeityToPlace(req, res));
    router.get('/places/:placeId/deities', (req, res) => controller.getPlaceDeities(req, res));
    router.put('/places/:placeId/deities/:deityId', (req, res) => controller.updatePlaceDeity(req, res));
    router.delete('/places/:placeId/deities/:deityId', (req, res) => controller.removeDeityFromPlace(req, res));

    // Deity-centric routes
    router.get('/deities/:deityId/places', (req, res) => controller.getDeityPlaces(req, res));

    return router;
};
