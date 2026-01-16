import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { PersonModel } from './PersonModel';
import { DynastyModel } from './DynastyModel';

@Entity('person_dynasty')
@Unique(['person_id', 'dynasty_id'])
export class PersonDynastyModel {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'person_id' })
    person_id!: string;

    @Column({ type: 'uuid', name: 'dynasty_id' })
    dynasty_id!: string;

    @Column({ type: 'text', nullable: true })
    role?: string;

    @Column({ type: 'integer', name: 'start_year', nullable: true })
    start_year?: number;

    @Column({ type: 'integer', name: 'end_year', nullable: true })
    end_year?: number;

    @ManyToOne(() => PersonModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id' })
    person?: PersonModel;

    @ManyToOne(() => DynastyModel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dynasty_id' })
    dynasty?: DynastyModel;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updated_at!: Date;
}
