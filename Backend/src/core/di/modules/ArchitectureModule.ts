import { ArchitectureRepositoryImpl } from '../../../data/repositories/ArchitectureRepositoryImpl';
import { CreateArchitecture } from '../../../domain/usecases/architecture/CreateArchitecture';
import { GetArchitecture } from '../../../domain/usecases/architecture/GetArchitecture';
import { ListArchitectures } from '../../../domain/usecases/architecture/ListArchitectures';
import { UpdateArchitecture } from '../../../domain/usecases/architecture/UpdateArchitecture';
import { DeleteArchitecture } from '../../../domain/usecases/architecture/DeleteArchitecture';
import { ArchitectureController } from '../../../api/controllers/ArchitectureController';

const repository = new ArchitectureRepositoryImpl();

export const ArchitectureModule = {
    controller: new ArchitectureController(
        new CreateArchitecture(repository),
        new GetArchitecture(repository),
        new ListArchitectures(repository),
        new UpdateArchitecture(repository),
        new DeleteArchitecture(repository)
    )
};
