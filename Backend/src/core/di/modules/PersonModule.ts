import { PersonRepositoryImpl } from '../../../data/repositories/PersonRepositoryImpl';
import { CreatePerson } from '../../../domain/usecases/person/CreatePerson';
import { GetPerson } from '../../../domain/usecases/person/GetPerson';
import { ListPersons } from '../../../domain/usecases/person/ListPersons';
import { UpdatePerson } from '../../../domain/usecases/person/UpdatePerson';
import { DeletePerson } from '../../../domain/usecases/person/DeletePerson';
import { PersonController } from '../../../api/controllers/PersonController';

// Dependency Injection for Person module
const repository = new PersonRepositoryImpl();

const createPerson = new CreatePerson(repository);
const getPerson = new GetPerson(repository);
const listPersons = new ListPersons(repository);
const updatePerson = new UpdatePerson(repository);
const deletePerson = new DeletePerson(repository);

export const PersonModule = {
    controller: new PersonController(
        createPerson,
        getPerson,
        listPersons,
        updatePerson,
        deletePerson
    )
};
