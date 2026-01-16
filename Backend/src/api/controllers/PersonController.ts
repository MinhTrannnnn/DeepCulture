import { Request, Response } from 'express';
import { CreatePerson } from '../../domain/usecases/person/CreatePerson';
import { GetPerson } from '../../domain/usecases/person/GetPerson';
import { ListPersons } from '../../domain/usecases/person/ListPersons';
import { UpdatePerson } from '../../domain/usecases/person/UpdatePerson';
import { DeletePerson } from '../../domain/usecases/person/DeletePerson';

export class PersonController {
    constructor(
        private createUseCase: CreatePerson,
        private getUseCase: GetPerson,
        private listUseCase: ListPersons,
        private updateUseCase: UpdatePerson,
        private deleteUseCase: DeletePerson
    ) { }

    async create(req: Request, res: Response) {
        try {
            const person = await this.createUseCase.execute(req.body);
            res.status(201).json(person);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const person = await this.getUseCase.execute(id);
            if (!person) {
                return res.status(404).json({ error: 'Person not found' });
            }
            res.json(person);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const searchName = req.query.name as string | undefined;
            const persons = await this.listUseCase.execute(searchName);
            res.json(persons);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const person = await this.updateUseCase.execute(id, req.body);
            res.json(person);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.deleteUseCase.execute(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
