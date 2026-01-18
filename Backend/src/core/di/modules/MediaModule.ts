import { MediaRepositoryImpl } from '../../../data/repositories/MediaRepositoryImpl';
import { MediaRelationRepositoryImpl } from '../../../data/repositories/MediaRelationRepositoryImpl';
import { S3Storage } from '../../../infra/storage/S3Storage';
import { UploadMedia } from '../../../domain/usecases/media/UploadMedia';
import { LinkMediaToEntity } from '../../../domain/usecases/media/LinkMediaToEntity';
import { GetEntityMedia } from '../../../domain/usecases/media/GetEntityMedia';
import { DeleteMedia } from '../../../domain/usecases/media/DeleteMedia';
import { MediaController } from '../../../api/controllers/MediaController';

const mediaRepository = new MediaRepositoryImpl();
const mediaRelationRepository = new MediaRelationRepositoryImpl();
const s3Storage = new S3Storage();

export const MediaModule = {
    controller: new MediaController(
        new UploadMedia(mediaRepository, s3Storage),
        new LinkMediaToEntity(mediaRelationRepository),
        new GetEntityMedia(mediaRepository, mediaRelationRepository),
        new DeleteMedia(mediaRepository, mediaRelationRepository, s3Storage)
    )
};
