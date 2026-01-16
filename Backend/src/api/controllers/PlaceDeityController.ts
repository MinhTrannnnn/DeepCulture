import { Request, Response } from 'express';
import { AddDeityToPlace } from '../../domain/usecases/place-deity/AddDeityToPlace';
import { RemoveDeityFromPlace } from '../../domain/usecases/place-deity/RemoveDeityFromPlace';
import { GetPlaceDeities } from '../../domain/usecases/place-deity/GetPlaceDeities';
import { GetDeityPlaces } from '../../domain/usecases/place-deity/GetDeityPlaces';
import { UpdatePlaceDeity } from '../../domain/usecases/place-deity/UpdatePlaceDeity';

export class PlaceDeityController {
    constructor(
        private addDeityToPlaceUseCase: AddDeityToPlace,
        private removeDeityFromPlaceUseCase: RemoveDeityFromPlace,
        private getPlaceDeitiesUseCase: GetPlaceDeities,
        private getDeityPlacesUseCase: GetDeityPlaces,
        private updatePlaceDeityUseCase: UpdatePlaceDeity
    ) { }

    async addDeityToPlace(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const relationship = await this.addDeityToPlaceUseCase.execute({
                placeId,
                ...req.body
            });
            res.status(201).json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeDeityFromPlace(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const deityId = req.params.deityId;
            await this.removeDeityFromPlaceUseCase.execute(placeId, deityId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPlaceDeities(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const deities = await this.getPlaceDeitiesUseCase.execute(placeId);
            res.json(deities);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getDeityPlaces(req: Request, res: Response) {
        try {
            const deityId = req.params.deityId;
            const places = await this.getDeityPlacesUseCase.execute(deityId);
            res.json(places);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePlaceDeity(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const deityId = req.params.deityId;
            const relationship = await this.updatePlaceDeityUseCase.execute(placeId, deityId, req.body);
            res.json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
