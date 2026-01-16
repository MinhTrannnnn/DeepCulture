import { ArtifactRepositoryImpl } from '../../../data/repositories/ArtifactRepositoryImpl';
import { CreateArtifact } from '../../../domain/usecases/artifact/CreateArtifact';
import { GetArtifact } from '../../../domain/usecases/artifact/GetArtifact';
import { ListArtifacts } from '../../../domain/usecases/artifact/ListArtifacts';
import { UpdateArtifact } from '../../../domain/usecases/artifact/UpdateArtifact';
import { DeleteArtifact } from '../../../domain/usecases/artifact/DeleteArtifact';
import { ArtifactController } from '../../../api/controllers/ArtifactController';

const repository = new ArtifactRepositoryImpl();

export const ArtifactModule = {
    controller: new ArtifactController(
        new CreateArtifact(repository),
        new GetArtifact(repository),
        new ListArtifacts(repository),
        new UpdateArtifact(repository),
        new DeleteArtifact(repository)
    )
};
