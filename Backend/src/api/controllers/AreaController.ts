import { Request, Response } from 'express';
import { CreateArea } from '../../domain/usecases/area/CreateArea';
import { GetArea } from '../../domain/usecases/area/GetArea';
import { ListAreas } from '../../domain/usecases/area/ListAreas';
import { UpdateArea } from '../../domain/usecases/area/UpdateArea';
import { DeleteArea } from '../../domain/usecases/area/DeleteArea';

export class AreaController {
    constructor(
        private createUseCase: CreateArea,
        private getUseCase: GetArea,
        private listUseCase: ListAreas,
        private updateUseCase: UpdateArea,
        private deleteUseCase: DeleteArea
    ) { }

    async create(req: Request, res: Response) {
        try {
            const area = await this.createUseCase.execute(req.body);
            res.status(201).json(area);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const area = await this.getUseCase.execute(id);
            if (!area) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(area);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const placeId = req.query.placeId
                ? parseInt(req.query.placeId as string)
                : undefined;
            const areas = await this.listUseCase.execute(placeId);
            res.json(areas);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const area = await this.updateUseCase.execute(id, req.body);
            res.json(area);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.deleteUseCase.execute(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
