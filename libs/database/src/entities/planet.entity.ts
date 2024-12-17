import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { Film } from './film.entity';
import { Person } from './person.entity';

@Entity('planets')
@Index('IDX_planets_name', ['name'])
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  diameter: string;

  @Column({ type: 'varchar', length: 50 })
  rotation_period: string;

  @Column({ type: 'varchar', length: 50 })
  orbital_period: string;

  @Column({ type: 'varchar', length: 50 })
  gravity: string;

  @Column({ type: 'varchar', length: 255 })
  population: string;

  @Column({ type: 'varchar', length: 255 })
  climate: string;

  @Column({ type: 'varchar', length: 255 })
  terrain: string;

  @Column({ type: 'varchar', length: 50 })
  surface_water: string;

  @ManyToMany(() => Film, (film) => film.planets)
  films: Film[];

  @OneToMany(() => Person, (person) => person.homeworld)
  residents: Person[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
