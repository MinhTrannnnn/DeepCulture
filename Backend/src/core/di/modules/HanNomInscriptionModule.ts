import { HanNomInscriptionRepositoryImpl } from '../../../data/repositories/HanNomInscriptionRepositoryImpl';
import { CreateHanNomInscription } from '../../../domain/usecases/han-nom-inscription/CreateHanNomInscription';
import { GetHanNomInscription } from '../../../domain/usecases/han-nom-inscription/GetHanNomInscription';
import { ListHanNomInscriptions } from '../../../domain/usecases/han-nom-inscription/ListHanNomInscriptions';
import { UpdateHanNomInscription } from '../../../domain/usecases/han-nom-inscription/UpdateHanNomInscription';
import { DeleteHanNomInscription } from '../../../domain/usecases/han-nom-inscription/DeleteHanNomInscription';
import { HanNomInscriptionController } from '../../../api/controllers/HanNomInscriptionController';

const repository = new HanNomInscriptionRepositoryImpl();

export const HanNomInscriptionModule = {
    controller: new HanNomInscriptionController(
        new CreateHanNomInscription(repository),
        new GetHanNomInscription(repository),
        new ListHanNomInscriptions(repository),
        new UpdateHanNomInscription(repository),
        new DeleteHanNomInscription(repository)
    )
};
