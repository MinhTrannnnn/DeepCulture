import { Router } from 'express';
import { MediaController } from '../controllers/MediaController';
import { uploadMiddleware } from '../middlewares/upload';

export function createMediaRoutes(controller: MediaController): Router {
    const router = Router();

    // Upload new media
    router.post('/upload', uploadMiddleware.single('file'), (req, res) => controller.upload(req, res));

    // Link media to entity
    router.post('/:mediaId/link', (req, res) => controller.linkToEntity(req, res));

    // Get media for an entity
    router.get('/:entityType/:entityId', (req, res) => controller.getByEntity(req, res));

    // Delete media
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
}
