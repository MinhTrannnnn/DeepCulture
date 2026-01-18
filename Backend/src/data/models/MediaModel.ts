import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('media')
export class MediaModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', name: 'media_type' })
    media_type!: string;

    @Column({ type: 'text' })
    url!: string;

    @Column({ type: 'text', nullable: true })
    caption?: string;

    @Column({ type: 'text', name: 'mime_type', nullable: true })
    mime_type?: string;

    @Column({ type: 'bigint', name: 'file_size', nullable: true })
    file_size?: number;

    @Column({ type: 'integer', nullable: true })
    width?: number;

    @Column({ type: 'integer', nullable: true })
    height?: number;

    @Column({ type: 'integer', nullable: true })
    duration?: number;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}