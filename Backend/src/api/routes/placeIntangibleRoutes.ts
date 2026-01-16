import { Router } from 'express';
import { PlaceIntangibleController } from '../controllers/PlaceIntangibleController';

export function createPlaceIntangibleRoutes(controller: PlaceIntangibleController): Router {
    const router = Router();
    router.post('/places/:placeId/intangible-heritages', (req, res) => controller.addIntangibleToPlace(req, res));
    router.get('/places/:placeId/intangible-heritages', (req, res) => controller.getPlaceIntangibles(req, res));
    router.delete('/places/:placeId/intangible-heritages/:intangibleHeritageId', (req, res) => controller.removeIntangibleFromPlace(req, res));
    router.get('/intangible-heritages/:intangibleHeritageId/places', (req, res) => controller.getIntangiblePlaces(req, res));
    return router;
}
