import { Request, Response } from 'express';
import { AddDynastyToPlace } from '../../domain/usecases/place-dynasty/AddDynastyToPlace';
import { RemoveDynastyFromPlace } from '../../domain/usecases/place-dynasty/RemoveDynastyFromPlace';
import { GetPlaceDynasties } from '../../domain/usecases/place-dynasty/GetPlaceDynasties';
import { GetDynastyPlaces } from '../../domain/usecases/place-dynasty/GetDynastyPlaces';
import { UpdatePlaceDynasty } from '../../domain/usecases/place-dynasty/UpdatePlaceDynasty';

export class PlaceDynastyController {
    constructor(
        private addDynastyToPlaceUseCase: AddDynastyToPlace,
        private removeDynastyFromPlaceUseCase: RemoveDynastyFromPlace,
        private getPlaceDynastiesUseCase: GetPlaceDynasties,
        private getDynastyPlacesUseCase: GetDynastyPlaces,
        private updatePlaceDynastyUseCase: UpdatePlaceDynasty
    ) { }

    async addDynastyToPlace(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const relationship = await this.addDynastyToPlaceUseCase.execute({
                placeId,
                ...req.body
            });
            res.status(201).json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeDynastyFromPlace(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const dynastyId = req.params.dynastyId;
            await this.removeDynastyFromPlaceUseCase.execute(placeId, dynastyId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPlaceDynasties(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const dynasties = await this.getPlaceDynastiesUseCase.execute(placeId);
            res.json(dynasties);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getDynastyPlaces(req: Request, res: Response) {
        try {
            const dynastyId = req.params.dynastyId;
            const places = await this.getDynastyPlacesUseCase.execute(dynastyId);
            res.json(places);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePlaceDynasty(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const dynastyId = req.params.dynastyId;
            const relationship = await this.updatePlaceDynastyUseCase.execute(placeId, dynastyId, req.body);
            res.json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
