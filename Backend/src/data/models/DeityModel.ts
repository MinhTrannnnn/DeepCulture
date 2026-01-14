import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';

@Entity('deities')
@Index(['name'])
@Index(['type'])
export class DeityModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 100 })
    type!: string;

    @Column({ length: 255 })
    origin!: string;

    @Column({ type: 'text' })
    legend!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
