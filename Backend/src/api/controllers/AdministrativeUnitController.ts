import { Request, Response } from 'express';
import { CreateAdministrativeUnit } from '../../domain/usecases/administrative-unit/CreateAdministrativeUnit';
import { GetAdministrativeUnit } from '../../domain/usecases/administrative-unit/GetAdministrativeUnit';
import { ListAdministrativeUnits } from '../../domain/usecases/administrative-unit/ListAdministrativeUnits';
import { UpdateAdministrativeUnit } from '../../domain/usecases/administrative-unit/UpdateAdministrativeUnit';
import { DeleteAdministrativeUnit } from '../../domain/usecases/administrative-unit/DeleteAdministrativeUnit';

export class AdministrativeUnitController {
    constructor(
        private createUseCase: CreateAdministrativeUnit,
        private getUseCase: GetAdministrativeUnit,
        private listUseCase: ListAdministrativeUnits,
        private updateUseCase: UpdateAdministrativeUnit,
        private deleteUseCase: DeleteAdministrativeUnit
    ) { }

    async create(req: Request, res: Response) {
        try {
            const unit = await this.createUseCase.execute(req.body);
            res.status(201).json(unit);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const unit = await this.getUseCase.execute(id);
            if (!unit) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(unit);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const level = req.query.level as string | undefined;
            const units = await this.listUseCase.execute(level);
            res.json(units);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const unit = await this.updateUseCase.execute(id, req.body);
            res.json(unit);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.deleteUseCase.execute(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}