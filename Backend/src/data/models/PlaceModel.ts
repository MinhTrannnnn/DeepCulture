import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { AdministrativeUnitModel } from './AdministrativeUnitModel';

@Entity('place')
@Index(['name'])
@Index(['administrative_unit_id'])
@Index(['latitude', 'longitude'])
export class PlaceModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 500 })
    address!: string;

    @Column({ name: 'administrative_unit_id' })
    administrative_unit_id!: number;

    @ManyToOne(() => AdministrativeUnitModel)
    @JoinColumn({ name: 'administrative_unit_id' })
    administrativeUnit!: AdministrativeUnitModel;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude!: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude!: number;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text', name: 'historical_significance' })
    historical_significance!: string;

    @Column({ length: 255, name: 'visiting_hours', nullable: true })
    visiting_hours!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'entry_fee', nullable: true })
    entry_fee!: number;

    @Column({ length: 500, name: 'contact_info', nullable: true })
    contact_info!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
