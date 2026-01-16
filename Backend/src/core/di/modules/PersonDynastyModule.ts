import { PersonDynastyRepositoryImpl } from '../../../data/repositories/PersonDynastyRepositoryImpl';
import { AddDynastyToPerson } from '../../../domain/usecases/person-dynasty/AddDynastyToPerson';
import { RemoveDynastyFromPerson } from '../../../domain/usecases/person-dynasty/RemoveDynastyFromPerson';
import { GetPersonDynasties } from '../../../domain/usecases/person-dynasty/GetPersonDynasties';
import { GetDynastyPersons } from '../../../domain/usecases/person-dynasty/GetDynastyPersons';
import { UpdatePersonDynasty } from '../../../domain/usecases/person-dynasty/UpdatePersonDynasty';
import { PersonDynastyController } from '../../../api/controllers/PersonDynastyController';

const repository = new PersonDynastyRepositoryImpl();

export const PersonDynastyModule = {
    controller: new PersonDynastyController(
        new AddDynastyToPerson(repository),
        new RemoveDynastyFromPerson(repository),
        new GetPersonDynasties(repository),
        new GetDynastyPersons(repository),
        new UpdatePersonDynasty(repository)
    )
};
