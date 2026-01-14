import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { PlaceModel } from './PlaceModel';

@Entity('area')
@Index(['name'])
@Index(['place_id'])
@Index(['area_type'])
export class AreaModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ name: 'place_id' })
    place_id!: number;

    @ManyToOne(() => PlaceModel)
    @JoinColumn({ name: 'place_id' })
    place!: PlaceModel;

    @Column({ length: 100, name: 'area_type' })
    area_type!: string;

    @Column({ type: 'text' })
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
