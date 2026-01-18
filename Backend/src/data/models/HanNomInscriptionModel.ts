import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AreaModel } from './AreaModel';

@Entity('han_nom_inscriptions')
export class HanNomInscriptionModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', nullable: true })
    type?: string;

    @Column({ type: 'text', nullable: true })
    location?: string;

    @Column({ type: 'text', nullable: true })
    transcription?: string;

    @Column({ type: 'text', nullable: true })
    translation?: string;

    @Column({ type: 'integer', nullable: true })
    year?: number;

    @Column({ type: 'text', nullable: true })
    condition?: string;

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
