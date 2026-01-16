import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { PlaceModel } from './PlaceModel';
import { DynastyModel } from './DynastyModel';

@Entity('place_dynasty')
@Unique(['place_id', 'dynasty_id'])
export class PlaceDynastyModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'place_id' })
    place_id!: string;

    @Column({ type: 'uuid', name: 'dynasty_id' })
    dynasty_id!: string;

    @Column({ type: 'text', nullable: true })
    role?: string;

    @Column({ type: 'text', nullable: true })
    note?: string;

    @ManyToOne(() => PlaceModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'place_id' })
    place?: PlaceModel;

    @ManyToOne(() => DynastyModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dynasty_id' })
    dynasty?: DynastyModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
