import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AreaModel } from './AreaModel';

@Entity('artifacts')
export class ArtifactModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text' })
    type!: string;

    @Column({ type: 'double precision', nullable: true })
    weight?: number;

    @Column({ type: 'integer', nullable: true })
    year?: number;

    @Column({ type: 'text', nullable: true })
    origin?: string;

    @Column({ type: 'text', nullable: true })
    condition?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    symbolism?: string;

    @Column({ type: 'uuid', name: 'area_id', nullable: true })
    area_id?: string;

    @ManyToOne(() => AreaModel, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'area_id' })
    area?: AreaModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
