import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('dynasty')
@Index(['name'], { unique: true })
@Index(['start_year'])
export class DynastyModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255, unique: true })
    name!: string;

    @Column({ type: 'integer', name: 'start_year' })
    start_year!: number;

    @Column({ type: 'integer', name: 'end_year', nullable: true })
    end_year!: number | null;

    @Column({ length: 255 })
    capital!: string;

    @Column({ type: 'text' })
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
