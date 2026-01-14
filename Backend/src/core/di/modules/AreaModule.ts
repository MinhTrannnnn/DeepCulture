import { AreaRepositoryImpl } from '../../../data/repositories/AreaRepositoryImpl';
import { CreateArea } from '../../../domain/usecases/area/CreateArea';
import { GetArea } from '../../../domain/usecases/area/GetArea';
import { ListAreas } from '../../../domain/usecases/area/ListAreas';
import { UpdateArea } from '../../../domain/usecases/area/UpdateArea';
import { DeleteArea } from '../../../domain/usecases/area/DeleteArea';
import { AreaController } from '../../../api/controllers/AreaController';

export class AreaModule {
    private static repository = new AreaRepositoryImpl();

    private static createUseCase = new CreateArea(this.repository);
    private static getUseCase = new GetArea(this.repository);
    private static listUseCase = new ListAreas(this.repository);
    private static updateUseCase = new UpdateArea(this.repository);
    private static deleteUseCase = new DeleteArea(this.repository);

    public static controller = new AreaController(
        this.createUseCase,
        this.getUseCase,
        this.listUseCase,
        this.updateUseCase,
        this.deleteUseCase
    );
}
