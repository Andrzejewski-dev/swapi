import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Film } from './film.entity';
import { Person } from './person.entity';
import { Planet } from './planet.entity';

@Entity('species')
@Index('IDX_spacies_name', ['name'])
export class Species {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  classification: string;

  @Column({ type: 'varchar', length: 255 })
  designation: string;

  @Column({ type: 'varchar', length: 50 })
  average_height: string;

  @Column({ type: 'varchar', length: 50 })
  average_lifespan: string;

  @Column({ type: 'varchar', length: 255 })
  eye_colors: string;

  @Column({ type: 'varchar', length: 255 })
  hair_colors: string;

  @Column({ type: 'varchar', length: 255 })
  skin_colors: string;

  @Column({ type: 'varchar', length: 255 })
  language: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld: Planet;

  @ManyToMany(() => Person, (person) => person.species)
  @JoinTable({
    name: 'species_people',
    joinColumn: { name: 'species_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  people: Person[];

  @ManyToMany(() => Film, (film) => film.species)
  films: Film[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
