import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { PlaceModel } from './PlaceModel';
import { IntangibleHeritageModel } from './IntangibleHeritageModel';

@Entity('place_intangible')
@Unique(['place_id', 'intangible_heritage_id'])
export class PlaceIntangibleModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'place_id' })
    place_id!: string;

    @Column({ type: 'uuid', name: 'intangible_heritage_id' })
    intangible_heritage_id!: string;

    @ManyToOne(() => PlaceModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'place_id' })
    place?: PlaceModel;

    @ManyToOne(() => IntangibleHeritageModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'intangible_heritage_id' })
    intangibleHeritage?: IntangibleHeritageModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
