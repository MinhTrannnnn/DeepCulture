import { Request, Response } from 'express';
import { AddDynastyToPerson } from '../../domain/usecases/person-dynasty/AddDynastyToPerson';
import { RemoveDynastyFromPerson } from '../../domain/usecases/person-dynasty/RemoveDynastyFromPerson';
import { GetPersonDynasties } from '../../domain/usecases/person-dynasty/GetPersonDynasties';
import { GetDynastyPersons } from '../../domain/usecases/person-dynasty/GetDynastyPersons';
import { UpdatePersonDynasty } from '../../domain/usecases/person-dynasty/UpdatePersonDynasty';

export class PersonDynastyController {
    constructor(
        private addDynastyToPersonUseCase: AddDynastyToPerson,
        private removeDynastyFromPersonUseCase: RemoveDynastyFromPerson,
        private getPersonDynastiesUseCase: GetPersonDynasties,
        private getDynastyPersonsUseCase: GetDynastyPersons,
        private updatePersonDynastyUseCase: UpdatePersonDynasty
    ) { }

    async addDynastyToPerson(req: Request, res: Response) {
        try {
            const personId = req.params.personId;
            const relationship = await this.addDynastyToPersonUseCase.execute({ personId, ...req.body });
            res.status(201).json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeDynastyFromPerson(req: Request, res: Response) {
        try {
            await this.removeDynastyFromPersonUseCase.execute(req.params.personId, req.params.dynastyId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPersonDynasties(req: Request, res: Response) {
        try {
            const dynasties = await this.getPersonDynastiesUseCase.execute(req.params.personId);
            res.json(dynasties);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getDynastyPersons(req: Request, res: Response) {
        try {
            const persons = await this.getDynastyPersonsUseCase.execute(req.params.dynastyId);
            res.json(persons);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePersonDynasty(req: Request, res: Response) {
        try {
            const relationship = await this.updatePersonDynastyUseCase.execute(req.params.personId, req.params.dynastyId, req.body);
            res.json(relationship);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
