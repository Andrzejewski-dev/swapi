import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  JoinTable,
} from 'typeorm';
import { Film } from './film.entity';
import { Person } from './person.entity';

@Entity('vehicles')
@Index('IDX_vehicle_name', ['name'])
@Index('IDX_vehicle_model', ['model'])
export class Vehicle {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'varchar', length: 255 })
  vehicle_class: string;

  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;

  @Column({ type: 'varchar', length: 255 })
  length: string;

  @Column({ type: 'varchar', length: 255 })
  cost_in_credits: string;

  @Column({ type: 'varchar', length: 255 })
  crew: string;

  @Column({ type: 'varchar', length: 255 })
  passengers: string;

  @Column({ type: 'varchar', length: 255 })
  max_atmosphering_speed: string;

  @Column({ type: 'varchar', length: 255 })
  cargo_capacity: string;

  @Column({ type: 'varchar', length: 255 })
  consumables: string;

  @ManyToMany(() => Film, (film) => film.vehicles)
  films: Film[];

  @ManyToMany(() => Person, (person) => person.vehicles)
  @JoinTable({
    name: 'vehicles_people',
    joinColumn: { name: 'vehicle_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  pilots: Person[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
