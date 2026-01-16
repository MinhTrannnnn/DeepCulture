import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text', unique: true })
    username!: string;

    @Column({ type: 'text', unique: true })
    email!: string;

    @Column({ type: 'text' })
    password!: string;

    @Column({ type: 'text' })
    role!: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}