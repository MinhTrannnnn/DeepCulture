import { Request, Response } from 'express';
import { CreateIntangibleHeritage } from '../../domain/usecases/intangible-heritage/CreateIntangibleHeritage';
import { GetIntangibleHeritage } from '../../domain/usecases/intangible-heritage/GetIntangibleHeritage';
import { ListIntangibleHeritages } from '../../domain/usecases/intangible-heritage/ListIntangibleHeritages';
import { UpdateIntangibleHeritage } from '../../domain/usecases/intangible-heritage/UpdateIntangibleHeritage';
import { DeleteIntangibleHeritage } from '../../domain/usecases/intangible-heritage/DeleteIntangibleHeritage';

export class IntangibleHeritageController {
    constructor(
        private createUseCase: CreateIntangibleHeritage,
        private getUseCase: GetIntangibleHeritage,
        private listUseCase: ListIntangibleHeritages,
        private updateUseCase: UpdateIntangibleHeritage,
        private deleteUseCase: DeleteIntangibleHeritage
    ) { }

    async create(req: Request, res: Response) {
        try {
            const heritage = await this.createUseCase.execute(req.body);
            res.status(201).json(heritage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const heritage = await this.getUseCase.execute(req.params.id);
            if (!heritage) return res.status(404).json({ error: 'Not found' });
            res.json(heritage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const searchName = req.query.name as string | undefined;
            const heritages = await this.listUseCase.execute(searchName);
            res.json(heritages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const heritage = await this.updateUseCase.execute(req.params.id, req.body);
            res.json(heritage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.deleteUseCase.execute(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
