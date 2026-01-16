import { Request, Response } from 'express';
import { CreateDeity } from '../../domain/usecases/deity/CreateDeity';
import { GetDeity } from '../../domain/usecases/deity/GetDeity';
import { ListDeities } from '../../domain/usecases/deity/ListDeities';
import { UpdateDeity } from '../../domain/usecases/deity/UpdateDeity';
import { DeleteDeity } from '../../domain/usecases/deity/DeleteDeity';

export class DeityController {
    constructor(
        private createUseCase: CreateDeity,
        private getUseCase: GetDeity,
        private listUseCase: ListDeities,
        private updateUseCase: UpdateDeity,
        private deleteUseCase: DeleteDeity
    ) { }

    async create(req: Request, res: Response) {
        try {
            const deity = await this.createUseCase.execute(req.body);
            res.status(201).json(deity);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deity = await this.getUseCase.execute(id);
            if (!deity) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(deity);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const deities = await this.listUseCase.execute();
            res.json(deities);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deity = await this.updateUseCase.execute(id, req.body);
            res.json(deity);
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
