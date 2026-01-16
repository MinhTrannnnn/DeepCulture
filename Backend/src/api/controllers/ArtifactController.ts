import { Request, Response } from 'express';
import { CreateArtifact } from '../../domain/usecases/artifact/CreateArtifact';
import { GetArtifact } from '../../domain/usecases/artifact/GetArtifact';
import { ListArtifacts } from '../../domain/usecases/artifact/ListArtifacts';
import { UpdateArtifact } from '../../domain/usecases/artifact/UpdateArtifact';
import { DeleteArtifact } from '../../domain/usecases/artifact/DeleteArtifact';

export class ArtifactController {
    constructor(
        private createUseCase: CreateArtifact,
        private getUseCase: GetArtifact,
        private listUseCase: ListArtifacts,
        private updateUseCase: UpdateArtifact,
        private deleteUseCase: DeleteArtifact
    ) { }

    async create(req: Request, res: Response) {
        try {
            const artifact = await this.createUseCase.execute(req.body);
            res.status(201).json(artifact);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const artifact = await this.getUseCase.execute(req.params.id);
            if (!artifact) return res.status(404).json({ error: 'Not found' });
            res.json(artifact);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const areaId = req.query.areaId as string | undefined;
            const type = req.query.type as string | undefined;
            const artifacts = await this.listUseCase.execute(areaId, type);
            res.json(artifacts);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const artifact = await this.updateUseCase.execute(req.params.id, req.body);
            res.json(artifact);
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
