import { DeityRepositoryImpl } from '../../../data/repositories/DeityRepositoryImpl';
import { CreateDeity } from '../../../domain/usecases/deity/CreateDeity';
import { GetDeity } from '../../../domain/usecases/deity/GetDeity';
import { ListDeities } from '../../../domain/usecases/deity/ListDeities';
import { UpdateDeity } from '../../../domain/usecases/deity/UpdateDeity';
import { DeleteDeity } from '../../../domain/usecases/deity/DeleteDeity';
import { DeityController } from '../../../api/controllers/DeityController';

export class DeityModule {
    private static repository = new DeityRepositoryImpl();

    private static createUseCase = new CreateDeity(this.repository);
    private static getUseCase = new GetDeity(this.repository);
    private static listUseCase = new ListDeities(this.repository);
    private static updateUseCase = new UpdateDeity(this.repository);
    private static deleteUseCase = new DeleteDeity(this.repository);

    public static controller = new DeityController(
        this.createUseCase,
        this.getUseCase,
        this.listUseCase,
        this.updateUseCase,
        this.deleteUseCase
    );
}
