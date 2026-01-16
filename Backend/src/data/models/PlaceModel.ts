import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AdministrativeUnitModel } from './AdministrativeUnitModel';

@Entity('place')
@Index(['name'])
@Index(['administrative_unit_id'])
export class PlaceModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    name!: string;

    @Column({ type: 'text', nullable: true })
    common_name?: string;

    @Column({ type: 'text', nullable: true })
    type?: string;

    @Column({ type: 'text', nullable: true })
    address?: string;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    longitude?: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    latitude?: number;

    @Column({ type: 'integer', nullable: true })
    established_year?: number;

    @Column({ type: 'integer', nullable: true })
    land_area?: number;

    @Column({ type: 'text', nullable: true })
    status?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    history?: string;

    @Column({ type: 'uuid', nullable: true })
    administrative_unit_id?: string;

    @ManyToOne(() => AdministrativeUnitModel, { nullable: true })
    @JoinColumn({ name: 'administrative_unit_id' })
    administrativeUnit?: AdministrativeUnitModel;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at!: Date;
}
