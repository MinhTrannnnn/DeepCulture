import { DynastyRepositoryImpl } from '../../../data/repositories/DynastyRepositoryImpl';
import { CreateDynasty } from '../../../domain/usecases/dynasty/CreateDynasty';
import { GetDynasty } from '../../../domain/usecases/dynasty/GetDynasty';
import { ListDynasties } from '../../../domain/usecases/dynasty/ListDynasties';
import { UpdateDynasty } from '../../../domain/usecases/dynasty/UpdateDynasty';
import { DeleteDynasty } from '../../../domain/usecases/dynasty/DeleteDynasty';
import { DynastyController } from '../../../api/controllers/DynastyController';

export class DynastyModule {
    private static repository = new DynastyRepositoryImpl();

    private static createUseCase = new CreateDynasty(this.repository);
    private static getUseCase = new GetDynasty(this.repository);
    private static listUseCase = new ListDynasties(this.repository);
    private static updateUseCase = new UpdateDynasty(this.repository);
    private static deleteUseCase = new DeleteDynasty(this.repository);

    public static controller = new DynastyController(
        this.createUseCase,
        this.getUseCase,
        this.listUseCase,
        this.updateUseCase,
        this.deleteUseCase
    );
}
