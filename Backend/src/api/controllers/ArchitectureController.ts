import { Request, Response } from 'express';
import { CreateArchitecture } from '../../domain/usecases/architecture/CreateArchitecture';
import { GetArchitecture } from '../../domain/usecases/architecture/GetArchitecture';
import { ListArchitectures } from '../../domain/usecases/architecture/ListArchitectures';
import { UpdateArchitecture } from '../../domain/usecases/architecture/UpdateArchitecture';
import { DeleteArchitecture } from '../../domain/usecases/architecture/DeleteArchitecture';

export class ArchitectureController {
    constructor(
        private createUseCase: CreateArchitecture,
        private getUseCase: GetArchitecture,
        private listUseCase: ListArchitectures,
        private updateUseCase: UpdateArchitecture,
        private deleteUseCase: DeleteArchitecture
    ) { }

    async create(req: Request, res: Response) {
        try {
            const architecture = await this.createUseCase.execute(req.body);
            res.status(201).json(architecture);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const architecture = await this.getUseCase.execute(req.params.id);
            if (!architecture) return res.status(404).json({ error: 'Not found' });
            res.json(architecture);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const type = req.query.type as string | undefined;
            const architectures = await this.listUseCase.execute(type);
            res.json(architectures);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const architecture = await this.updateUseCase.execute(req.params.id, req.body);
            res.json(architecture);
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
