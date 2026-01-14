import { PlaceRepositoryImpl } from '../../../data/repositories/PlaceRepositoryImpl';
import { CreatePlace } from '../../../domain/usecases/place/CreatePlace';
import { GetPlace } from '../../../domain/usecases/place/GetPlace';
import { ListPlaces } from '../../../domain/usecases/place/ListPlaces';
import { UpdatePlace } from '../../../domain/usecases/place/UpdatePlace';
import { DeletePlace } from '../../../domain/usecases/place/DeletePlace';
import { PlaceController } from '../../../api/controllers/PlaceController';

export class PlaceModule {
    private static repository = new PlaceRepositoryImpl();

    private static createUseCase = new CreatePlace(this.repository);
    private static getUseCase = new GetPlace(this.repository);
    private static listUseCase = new ListPlaces(this.repository);
    private static updateUseCase = new UpdatePlace(this.repository);
    private static deleteUseCase = new DeletePlace(this.repository);

    public static controller = new PlaceController(
        this.createUseCase,
        this.getUseCase,
        this.listUseCase,
        this.updateUseCase,
        this.deleteUseCase
    );
}
