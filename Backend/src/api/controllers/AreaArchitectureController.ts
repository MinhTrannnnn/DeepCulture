import { Request, Response } from 'express';
import { AddArchitectureToArea } from '../../domain/usecases/area-architecture/AddArchitectureToArea';
import { RemoveArchitectureFromArea } from '../../domain/usecases/area-architecture/RemoveArchitectureFromArea';
import { GetAreaArchitectures } from '../../domain/usecases/area-architecture/GetAreaArchitectures';
import { UpdateAreaArchitecture } from '../../domain/usecases/area-architecture/UpdateAreaArchitecture';

export class AreaArchitectureController {
    constructor(
        private addArchitectureToAreaUseCase: AddArchitectureToArea,
        private removeArchitectureFromAreaUseCase: RemoveArchitectureFromArea,
        private getAreaArchitecturesUseCase: GetAreaArchitectures,
        private updateAreaArchitectureUseCase: UpdateAreaArchitecture
    ) { }

    async addArchitectureToArea(req: Request, res: Response) {
        try {
            const areaId = req.params.areaId;
            const relationship = await this.addArchitectureToAreaUseCase.execute({ areaId, ...req.body });
            res.status(201).json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeArchitectureFromArea(req: Request, res: Response) {
        try {
            await this.removeArchitectureFromAreaUseCase.execute(req.params.areaId, req.params.architectureId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAreaArchitectures(req: Request, res: Response) {
        try {
            const architectures = await this.getAreaArchitecturesUseCase.execute(req.params.areaId);
            res.json(architectures);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateAreaArchitecture(req: Request, res: Response) {
        try {
            const relationship = await this.updateAreaArchitectureUseCase.execute(req.params.areaId, req.params.architectureId, req.body);
            res.json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
