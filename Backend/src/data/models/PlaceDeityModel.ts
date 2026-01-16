import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { PlaceModel } from './PlaceModel';
import { DeityModel } from './DeityModel';

@Entity('place_deities')
@Index(['place_id'])
@Index(['deity_id'])
export class PlaceDeityModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    place_id!: string;

    @ManyToOne(() => PlaceModel)
    @JoinColumn({ name: 'place_id' })
    place!: PlaceModel;

    @Column({ type: 'uuid' })
    deity_id!: string;

    @ManyToOne(() => DeityModel)
    @JoinColumn({ name: 'deity_id' })
    deity!: DeityModel;

    @Column({ type: 'text', nullable: true })
    role?: string;

    @Column({ type: 'text', nullable: true })
    worship_type?: string;

    @Column({ type: 'text', nullable: true })
    significance_level?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}
