import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('deities')
@Index(['name'])
@Index(['type'])
export class DeityModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text', nullable: true })
    type?: string;

    @Column({ type: 'text', nullable: true })
    origin?: string;

    @Column({ type: 'text', nullable: true })
    legend?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}
