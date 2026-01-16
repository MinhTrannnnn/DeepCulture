import { AreaArchitectureRepositoryImpl } from '../../../data/repositories/AreaArchitectureRepositoryImpl';
import { AddArchitectureToArea } from '../../../domain/usecases/area-architecture/AddArchitectureToArea';
import { RemoveArchitectureFromArea } from '../../../domain/usecases/area-architecture/RemoveArchitectureFromArea';
import { GetAreaArchitectures } from '../../../domain/usecases/area-architecture/GetAreaArchitectures';
import { UpdateAreaArchitecture } from '../../../domain/usecases/area-architecture/UpdateAreaArchitecture';
import { AreaArchitectureController } from '../../../api/controllers/AreaArchitectureController';

const repository = new AreaArchitectureRepositoryImpl();

export const AreaArchitectureModule = {
    controller: new AreaArchitectureController(
        new AddArchitectureToArea(repository),
        new RemoveArchitectureFromArea(repository),
        new GetAreaArchitectures(repository),
        new UpdateAreaArchitecture(repository)
    )
};
