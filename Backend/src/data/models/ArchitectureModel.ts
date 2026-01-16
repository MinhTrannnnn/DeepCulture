import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('architectures')
export class ArchitectureModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text', nullable: true })
    type?: string;

    @Column({ type: 'text', nullable: true })
    material?: string;

    @Column({ type: 'text', nullable: true })
    technique?: string;

    @Column({ type: 'text', nullable: true })
    pattern?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', name: 'image_url', nullable: true })
    image_url?: string;

    @Column({ type: 'integer', nullable: true })
    year?: number;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
