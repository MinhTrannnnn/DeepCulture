import { PlaceIntangibleRepositoryImpl } from '../../../data/repositories/PlaceIntangibleRepositoryImpl';
import { AddIntangibleToPlace } from '../../../domain/usecases/place-intangible/AddIntangibleToPlace';
import { RemoveIntangibleFromPlace } from '../../../domain/usecases/place-intangible/RemoveIntangibleFromPlace';
import { GetPlaceIntangibles } from '../../../domain/usecases/place-intangible/GetPlaceIntangibles';
import { GetIntangiblePlaces } from '../../../domain/usecases/place-intangible/GetIntangiblePlaces';
import { PlaceIntangibleController } from '../../../api/controllers/PlaceIntangibleController';

const repository = new PlaceIntangibleRepositoryImpl();

export const PlaceIntangibleModule = {
    controller: new PlaceIntangibleController(
        new AddIntangibleToPlace(repository),
        new RemoveIntangibleFromPlace(repository),
        new GetPlaceIntangibles(repository),
        new GetIntangiblePlaces(repository)
    )
};
