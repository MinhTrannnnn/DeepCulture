import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('intangible_heritages')
export class IntangibleHeritageModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text', nullable: true })
    type?: string;

    @Column({ type: 'text', nullable: true })
    origin?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    significance?: string;

    @Column({ type: 'text', nullable: true })
    community?: string;

    @Column({ type: 'text', nullable: true })
    region?: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
