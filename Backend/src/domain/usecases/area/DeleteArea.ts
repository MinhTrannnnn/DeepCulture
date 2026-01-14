import { AreaRepository } from '../../repositories/AreaRepository';

export class DeleteArea {
    constructor(private repository: AreaRepository) { }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
