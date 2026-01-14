import { PlaceDeityRepositoryImpl } from '../../../data/repositories/PlaceDeityRepositoryImpl';
import { AddDeityToPlace } from '../../../domain/usecases/place-deity/AddDeityToPlace';
import { RemoveDeityFromPlace } from '../../../domain/usecases/place-deity/RemoveDeityFromPlace';
import { GetPlaceDeities } from '../../../domain/usecases/place-deity/GetPlaceDeities';
import { GetDeityPlaces } from '../../../domain/usecases/place-deity/GetDeityPlaces';
import { UpdatePlaceDeity } from '../../../domain/usecases/place-deity/UpdatePlaceDeity';
import { PlaceDeityController } from '../../../api/controllers/PlaceDeityController';

export class PlaceDeityModule {
    private static repository = new PlaceDeityRepositoryImpl();

    private static addDeityToPlaceUseCase = new AddDeityToPlace(this.repository);
    private static removeDeityFromPlaceUseCase = new RemoveDeityFromPlace(this.repository);
    private static getPlaceDeitiesUseCase = new GetPlaceDeities(this.repository);
    private static getDeityPlacesUseCase = new GetDeityPlaces(this.repository);
    private static updatePlaceDeityUseCase = new UpdatePlaceDeity(this.repository);

    public static controller = new PlaceDeityController(
        this.addDeityToPlaceUseCase,
        this.removeDeityFromPlaceUseCase,
        this.getPlaceDeitiesUseCase,
        this.getDeityPlacesUseCase,
        this.updatePlaceDeityUseCase
    );
}
