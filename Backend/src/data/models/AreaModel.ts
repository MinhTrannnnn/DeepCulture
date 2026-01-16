import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { PlaceModel } from './PlaceModel';

@Entity('area')
@Index(['name'])
@Index(['place_id'])
@Index(['area_type'])
export class AreaModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text', nullable: true })
    area_type?: string;

    @Column({ type: 'text', nullable: true })
    function?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'uuid', nullable: true })
    place_id?: string;

    @ManyToOne(() => PlaceModel, { nullable: true })
    @JoinColumn({ name: 'place_id' })
    place?: PlaceModel;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}
