import { IntangibleHeritageRepositoryImpl } from '../../../data/repositories/IntangibleHeritageRepositoryImpl';
import { CreateIntangibleHeritage } from '../../../domain/usecases/intangible-heritage/CreateIntangibleHeritage';
import { GetIntangibleHeritage } from '../../../domain/usecases/intangible-heritage/GetIntangibleHeritage';
import { ListIntangibleHeritages } from '../../../domain/usecases/intangible-heritage/ListIntangibleHeritages';
import { UpdateIntangibleHeritage } from '../../../domain/usecases/intangible-heritage/UpdateIntangibleHeritage';
import { DeleteIntangibleHeritage } from '../../../domain/usecases/intangible-heritage/DeleteIntangibleHeritage';
import { IntangibleHeritageController } from '../../../api/controllers/IntangibleHeritageController';

const repository = new IntangibleHeritageRepositoryImpl();

export const IntangibleHeritageModule = {
    controller: new IntangibleHeritageController(
        new CreateIntangibleHeritage(repository),
        new GetIntangibleHeritage(repository),
        new ListIntangibleHeritages(repository),
        new UpdateIntangibleHeritage(repository),
        new DeleteIntangibleHeritage(repository)
    )
};
