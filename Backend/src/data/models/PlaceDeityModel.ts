import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { PlaceModel } from './PlaceModel';
import { DeityModel } from './DeityModel';

@Entity('place_deities')
@Index(['place_id', 'deity_id'], { unique: true })
@Index(['place_id'])
@Index(['deity_id'])
export class PlaceDeityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'place_id' })
    place_id!: number;

    @ManyToOne(() => PlaceModel)
    @JoinColumn({ name: 'place_id' })
    place!: PlaceModel;

    @Column({ name: 'deity_id' })
    deity_id!: number;

    @ManyToOne(() => DeityModel)
    @JoinColumn({ name: 'deity_id' })
    deity!: DeityModel;

    @Column({ length: 100, name: 'worship_type' })
    worship_type!: string;

    @Column({ length: 50, name: 'significance_level' })
    significance_level!: string;

    @Column({ type: 'text', nullable: true })
    notes!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
