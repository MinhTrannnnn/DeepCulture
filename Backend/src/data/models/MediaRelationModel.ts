import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { MediaModel } from './MediaModel';

@Entity('media_relations')
@Unique(['media_id', 'entity_type', 'entity_id'])
export class MediaRelationModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'media_id' })
    media_id!: string;

    @Column({ type: 'text', name: 'entity_type' })
    entity_type!: string;

    @Column({ type: 'uuid', name: 'entity_id' })
    entity_id!: string;

    @Column({ type: 'text', nullable: true })
    role?: string;

    @Column({ type: 'integer', name: 'order_index', default: 0 })
    order_index!: number;

    @ManyToOne(() => MediaModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'media_id' })
    media?: MediaModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;
}