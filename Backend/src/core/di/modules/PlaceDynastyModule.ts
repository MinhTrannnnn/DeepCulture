import { PlaceDynastyRepositoryImpl } from '../../../data/repositories/PlaceDynastyRepositoryImpl';
import { AddDynastyToPlace } from '../../../domain/usecases/place-dynasty/AddDynastyToPlace';
import { RemoveDynastyFromPlace } from '../../../domain/usecases/place-dynasty/RemoveDynastyFromPlace';
import { GetPlaceDynasties } from '../../../domain/usecases/place-dynasty/GetPlaceDynasties';
import { GetDynastyPlaces } from '../../../domain/usecases/place-dynasty/GetDynastyPlaces';
import { UpdatePlaceDynasty } from '../../../domain/usecases/place-dynasty/UpdatePlaceDynasty';
import { PlaceDynastyController } from '../../../api/controllers/PlaceDynastyController';

const repository = new PlaceDynastyRepositoryImpl();

export const PlaceDynastyModule = {
    controller: new PlaceDynastyController(
        new AddDynastyToPlace(repository),
        new RemoveDynastyFromPlace(repository),
        new GetPlaceDynasties(repository),
        new GetDynastyPlaces(repository),
        new UpdatePlaceDynasty(repository)
    )
};
