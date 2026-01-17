import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('refresh_token_sessions')
export class RefreshTokenSessionModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    userId!: string;

    @Column({ type: 'text' })
    refreshToken!: string;

    @Column({ type: 'boolean', default: false })
    isRevoked!: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    revokedAt!: Date | null;

    @Column({ type: 'timestamptz' })
    expiresAt!: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;
}
