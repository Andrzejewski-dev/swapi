import {
  Entity,
  PrimaryColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';
import { Film } from './film.entity';
import { Species } from './species.entity';
import { Vehicle } from './vehicle.entity';
import { Starship } from './starship.entity';
import { Planet } from './planet.entity';

@Entity('people')
@Index('IDX_people_name', ['name'])
export class Person {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  height: string;

  @Column({ type: 'varchar', length: 50 })
  mass: string;

  @Column({ type: 'varchar', length: 50 })
  hair_color: string;

  @Column({ type: 'varchar', length: 50 })
  skin_color: string;

  @Column({ type: 'varchar', length: 50 })
  eye_color: string;

  @Column({ type: 'varchar', length: 50 })
  birth_year: string;

  @Column({ type: 'varchar', length: 50 })
  gender: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld: Planet;

  @ManyToMany(() => Film, (film) => film.characters)
  films: Film[];

  @ManyToMany(() => Species, (species) => species.people)
  species: Species[];

  @ManyToMany(() => Starship, (starship) => starship.people)
  starships: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  vehicles: Vehicle[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
