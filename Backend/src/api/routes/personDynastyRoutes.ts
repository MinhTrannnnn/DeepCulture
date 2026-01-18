import { Router } from 'express';
import { PersonDynastyController } from '../controllers/PersonDynastyController';
import { authMiddleware } from '../middlewares/authenticate';
import { roleMiddleware } from '../middlewares/authorize';

export function createPersonDynastyRoutes(controller: PersonDynastyController): Router {
    const router = Router();
    router.post(
        '/persons/:personId/dynasties', 
        authMiddleware, 
        roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.addDynastyToPerson(req, res)
    );
    router.get(
        '/persons/:personId/dynasties', 
        authMiddleware, 
        (req, res) => controller.getPersonDynasties(req, res)
    );
    router.put(
        '/persons/:personId/dynasties/:dynastyId', 
        authMiddleware, roleMiddleware(['ADMIN', 'EDITOR']), 
        (req, res) => controller.updatePersonDynasty(req, res)
    );
    router.delete(
        '/persons/:personId/dynasties/:dynastyId', 
        authMiddleware, roleMiddleware(['ADMIN']), 
        (req, res) => controller.removeDynastyFromPerson(req, res)
    );
    router.get(
        '/dynasties/:dynastyId/persons', 
        authMiddleware, 
        (req, res) => controller.getDynastyPersons(req, res)
    );
    return router;
}
