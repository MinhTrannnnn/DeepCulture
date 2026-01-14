import { Request, Response } from 'express';
import { CreatePlace } from '../../domain/usecases/place/CreatePlace';
import { GetPlace } from '../../domain/usecases/place/GetPlace';
import { ListPlaces } from '../../domain/usecases/place/ListPlaces';
import { UpdatePlace } from '../../domain/usecases/place/UpdatePlace';
import { DeletePlace } from '../../domain/usecases/place/DeletePlace';

export class PlaceController {
    constructor(
        private createUseCase: CreatePlace,
        private getUseCase: GetPlace,
        private listUseCase: ListPlaces,
        private updateUseCase: UpdatePlace,
        private deleteUseCase: DeletePlace
    ) { }

    async create(req: Request, res: Response) {
        try {
            const place = await this.createUseCase.execute(req.body);
            res.status(201).json(place);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const place = await this.getUseCase.execute(id);
            if (!place) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(place);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const administrativeUnitId = req.query.administrativeUnitId
                ? parseInt(req.query.administrativeUnitId as string)
                : undefined;
            const places = await this.listUseCase.execute(administrativeUnitId);
            res.json(places);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const place = await this.updateUseCase.execute(id, req.body);
            res.json(place);
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
