import { AdministrativeUnitRepositoryImpl } from '../../../data/repositories/AdministrativeUnitRepositoryImpl';
import { CreateAdministrativeUnit } from '../../../domain/usecases/administrative-unit/CreateAdministrativeUnit';
import { GetAdministrativeUnit } from '../../../domain/usecases/administrative-unit/GetAdministrativeUnit';
import { ListAdministrativeUnits } from '../../../domain/usecases/administrative-unit/ListAdministrativeUnits';
import { UpdateAdministrativeUnit } from '../../../domain/usecases/administrative-unit/UpdateAdministrativeUnit';
import { DeleteAdministrativeUnit } from '../../../domain/usecases/administrative-unit/DeleteAdministrativeUnit';
import { AdministrativeUnitController } from '../../../api/controllers/AdministrativeUnitController';

export class AdministrativeUnitModule {
    private static repository = new AdministrativeUnitRepositoryImpl();

    private static createUseCase = new CreateAdministrativeUnit(this.repository);
    private static getUseCase = new GetAdministrativeUnit(this.repository);
    private static listUseCase = new ListAdministrativeUnits(this.repository);
    private static updateUseCase = new UpdateAdministrativeUnit(this.repository);
    private static deleteUseCase = new DeleteAdministrativeUnit(this.repository);

    public static controller = new AdministrativeUnitController(
        this.createUseCase,
        this.getUseCase,
        this.listUseCase,
        this.updateUseCase,
        this.deleteUseCase
    );
}
