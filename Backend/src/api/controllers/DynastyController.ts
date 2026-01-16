import { Request, Response } from 'express';
import { CreateDynasty } from '../../domain/usecases/dynasty/CreateDynasty';
import { GetDynasty } from '../../domain/usecases/dynasty/GetDynasty';
import { ListDynasties } from '../../domain/usecases/dynasty/ListDynasties';
import { UpdateDynasty } from '../../domain/usecases/dynasty/UpdateDynasty';
import { DeleteDynasty } from '../../domain/usecases/dynasty/DeleteDynasty';

export class DynastyController {
    constructor(
        private createUseCase: CreateDynasty,
        private getUseCase: GetDynasty,
        private listUseCase: ListDynasties,
        private updateUseCase: UpdateDynasty,
        private deleteUseCase: DeleteDynasty
    ) { }

    async create(req: Request, res: Response) {
        try {
            const dynasty = await this.createUseCase.execute(req.body);
            res.status(201).json(dynasty);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const dynasty = await this.getUseCase.execute(id);
            if (!dynasty) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(dynasty);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const dynasties = await this.listUseCase.execute();
            res.json(dynasties);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const dynasty = await this.updateUseCase.execute(id, req.body);
            res.json(dynasty);
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
