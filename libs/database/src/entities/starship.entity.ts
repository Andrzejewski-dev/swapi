import {
  Entity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { Film } from './film.entity';
import { Person } from './person.entity';

@Entity('starships')
@Index('IDX_starships_name', ['name'])
@Index('IDX_starships_model', ['model'])
export class Starship {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'varchar', length: 255 })
  starship_class: string;

  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;

  @Column({ type: 'varchar', length: 255 })
  cost_in_credits: string;

  @Column({ type: 'varchar', length: 255 })
  length: string;

  @Column({ type: 'varchar', length: 255 })
  crew: string;

  @Column({ type: 'varchar', length: 255 })
  passengers: string;

  @Column({ type: 'varchar', length: 255 })
  max_atmosphering_speed: string;

  @Column({ type: 'varchar', length: 255 })
  hyperdrive_rating: string;

  @Column({ type: 'varchar', length: 255 })
  MGLT: string;

  @Column({ type: 'varchar', length: 255 })
  cargo_capacity: string;

  @Column({ type: 'varchar', length: 255 })
  consumables: string;

  @ManyToMany(() => Film, (film) => film.starships)
  films: Film[];

  @ManyToMany(() => Person, (person) => person.starships)
  @JoinTable({
    name: 'starships_people',
    joinColumn: { name: 'starship_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  people: Person[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
