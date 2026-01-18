import { Request, Response } from 'express';
import { UploadMedia } from '../../domain/usecases/media/UploadMedia';
import { LinkMediaToEntity } from '../../domain/usecases/media/LinkMediaToEntity';
import { GetEntityMedia } from '../../domain/usecases/media/GetEntityMedia';
import { DeleteMedia } from '../../domain/usecases/media/DeleteMedia';

export class MediaController {
    constructor(
        private uploadMediaUseCase: UploadMedia,
        private linkMediaToEntityUseCase: LinkMediaToEntity,
        private getEntityMediaUseCase: GetEntityMedia,
        private deleteMediaUseCase: DeleteMedia
    ) { }

    async upload(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const media = await this.uploadMediaUseCase.execute({
                file: req.file,
                caption: req.body.caption,
                folder: req.body.folder
            });

            res.status(201).json(media);
        } catch (error: any) {
            console.error('Upload error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async linkToEntity(req: Request, res: Response) {
        try {
            const mediaId = req.params.mediaId;
            const { entityType, entityId, role, orderIndex } = req.body;

            if (!entityType || !entityId) {
                return res.status(400).json({ error: 'entityType and entityId are required' });
            }

            const relation = await this.linkMediaToEntityUseCase.execute({
                mediaId,
                entityType,
                entityId,
                role,
                orderIndex
            });

            res.status(201).json(relation);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByEntity(req: Request, res: Response) {
        try {
            const { entityType, entityId } = req.params;
            const media = await this.getEntityMediaUseCase.execute(entityType, entityId);
            res.json(media);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const mediaId = req.params.id;
            await this.deleteMediaUseCase.execute(mediaId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
