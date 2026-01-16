import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('dynasty')
@Index(['name'])
export class DynastyModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'integer', nullable: true })
    start_year?: number;

    @Column({ type: 'integer', nullable: true })
    end_year?: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}
