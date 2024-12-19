import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Person } from './person.entity';
import { Planet } from './planet.entity';
import { Starship } from './starship.entity';
import { Species } from './species.entity';
import { Vehicle } from './vehicle.entity';

@Entity('films')
@Index('IDX_films_title', ['title'])
export class Film {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'integer' })
  episode_id: number;

  @Column({ type: 'text' })
  opening_crawl: string;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'varchar', length: 255 })
  producer: string;

  @Column({ type: 'date' })
  release_date: string;

  @ManyToMany(() => Person, (character) => character.films)
  @JoinTable({
    name: 'films_characters',
    joinColumn: { name: 'film_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'character_id', referencedColumnName: 'id' },
  })
  characters: Person[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable({
    name: 'films_planets',
    joinColumn: { name: 'film_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'planet_id', referencedColumnName: 'id' },
  })
  planets: Planet[];

  @ManyToMany(() => Starship, (starship) => starship.films)
  @JoinTable({
    name: 'films_starships',
    joinColumn: { name: 'film_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'starship_id', referencedColumnName: 'id' },
  })
  starships: Starship[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films)
  @JoinTable({
    name: 'films_vehicles',
    joinColumn: { name: 'film_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'vehicle_id', referencedColumnName: 'id' },
  })
  vehicles: Vehicle[];

  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable({
    name: 'films_species',
    joinColumn: { name: 'film_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'species_id', referencedColumnName: 'id' },
  })
  species: Species[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
