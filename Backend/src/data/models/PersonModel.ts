import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('persons')
export class PersonModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', name: 'full_name' })
    full_name!: string;

    @Column({ type: 'text', name: 'other_name', nullable: true })
    other_name?: string;

    @Column({ type: 'integer', name: 'birth_year', nullable: true })
    birth_year?: number;

    @Column({ type: 'integer', name: 'death_year', nullable: true })
    death_year?: number;

    @Column({ type: 'text', nullable: true })
    hometown?: string;

    @Column({ type: 'text', nullable: true })
    position?: string;

    @Column({ type: 'text', nullable: true })
    field?: string;

    @Column({ type: 'text', nullable: true })
    achievements?: string;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
