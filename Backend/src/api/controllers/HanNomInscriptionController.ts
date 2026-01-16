import { Request, Response } from 'express';
import { CreateHanNomInscription } from '../../domain/usecases/han-nom-inscription/CreateHanNomInscription';
import { GetHanNomInscription } from '../../domain/usecases/han-nom-inscription/GetHanNomInscription';
import { ListHanNomInscriptions } from '../../domain/usecases/han-nom-inscription/ListHanNomInscriptions';
import { UpdateHanNomInscription } from '../../domain/usecases/han-nom-inscription/UpdateHanNomInscription';
import { DeleteHanNomInscription } from '../../domain/usecases/han-nom-inscription/DeleteHanNomInscription';

export class HanNomInscriptionController {
    constructor(
        private createUseCase: CreateHanNomInscription,
        private getUseCase: GetHanNomInscription,
        private listUseCase: ListHanNomInscriptions,
        private updateUseCase: UpdateHanNomInscription,
        private deleteUseCase: DeleteHanNomInscription
    ) { }

    async create(req: Request, res: Response) {
        try {
            const inscription = await this.createUseCase.execute(req.body);
            res.status(201).json(inscription);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const inscription = await this.getUseCase.execute(req.params.id);
            if (!inscription) return res.status(404).json({ error: 'Not found' });
            res.json(inscription);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const areaId = req.query.areaId as string | undefined;
            const inscriptions = await this.listUseCase.execute(areaId);
            res.json(inscriptions);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const inscription = await this.updateUseCase.execute(req.params.id, req.body);
            res.json(inscription);
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
