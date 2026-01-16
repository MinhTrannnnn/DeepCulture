import { Request, Response } from 'express';
import { AddIntangibleToPlace } from '../../domain/usecases/place-intangible/AddIntangibleToPlace';
import { RemoveIntangibleFromPlace } from '../../domain/usecases/place-intangible/RemoveIntangibleFromPlace';
import { GetPlaceIntangibles } from '../../domain/usecases/place-intangible/GetPlaceIntangibles';
import { GetIntangiblePlaces } from '../../domain/usecases/place-intangible/GetIntangiblePlaces';

export class PlaceIntangibleController {
    constructor(
        private addIntangibleToPlaceUseCase: AddIntangibleToPlace,
        private removeIntangibleFromPlaceUseCase: RemoveIntangibleFromPlace,
        private getPlaceIntangiblesUseCase: GetPlaceIntangibles,
        private getIntangiblePlacesUseCase: GetIntangiblePlaces
    ) { }

    async addIntangibleToPlace(req: Request, res: Response) {
        try {
            const placeId = req.params.placeId;
            const relationship = await this.addIntangibleToPlaceUseCase.execute({ placeId, ...req.body });
            res.status(201).json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeIntangibleFromPlace(req: Request, res: Response) {
        try {
            await this.removeIntangibleFromPlaceUseCase.execute(req.params.placeId, req.params.intangibleHeritageId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPlaceIntangibles(req: Request, res: Response) {
        try {
            const intangibles = await this.getPlaceIntangiblesUseCase.execute(req.params.placeId);
            res.json(intangibles);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getIntangiblePlaces(req: Request, res: Response) {
        try {
            const places = await this.getIntangiblePlacesUseCase.execute(req.params.intangibleHeritageId);
            res.json(places);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
