import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Tên bảng trong PostgreSQL
export class UserModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;
}