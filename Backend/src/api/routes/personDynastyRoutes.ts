import { Router } from 'express';
import { PersonDynastyController } from '../controllers/PersonDynastyController';

export function createPersonDynastyRoutes(controller: PersonDynastyController): Router {
    const router = Router();
    router.post('/persons/:personId/dynasties', (req, res) => controller.addDynastyToPerson(req, res));
    router.get('/persons/:personId/dynasties', (req, res) => controller.getPersonDynasties(req, res));
    router.put('/persons/:personId/dynasties/:dynastyId', (req, res) => controller.updatePersonDynasty(req, res));
    router.delete('/persons/:personId/dynasties/:dynastyId', (req, res) => controller.removeDynastyFromPerson(req, res));
    router.get('/dynasties/:dynastyId/persons', (req, res) => controller.getDynastyPersons(req, res));
    return router;
}
