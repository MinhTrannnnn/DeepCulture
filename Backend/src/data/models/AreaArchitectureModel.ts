import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { AreaModel } from './AreaModel';
import { ArchitectureModel } from './ArchitectureModel';

@Entity('area_architecture')
@Unique(['area_id', 'architecture_id'])
export class AreaArchitectureModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'area_id' })
    area_id!: string;

    @Column({ type: 'uuid', name: 'architecture_id' })
    architecture_id!: string;

    @Column({ type: 'text', nullable: true })
    position?: string;

    @ManyToOne(() => AreaModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'area_id' })
    area?: AreaModel;

    @ManyToOne(() => ArchitectureModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'architecture_id' })
    architecture?: ArchitectureModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
