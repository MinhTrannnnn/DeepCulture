import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('administrative_units')
export class AdministrativeUnitModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text' })
    level!: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}