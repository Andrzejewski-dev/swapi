import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734602091642 implements MigrationInterface {
    name = 'Init1734602091642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "planets" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "diameter" character varying(50) NOT NULL, "rotation_period" character varying(50) NOT NULL, "orbital_period" character varying(50) NOT NULL, "gravity" character varying(50) NOT NULL, "population" character varying(255) NOT NULL, "climate" character varying(255) NOT NULL, "terrain" character varying(255) NOT NULL, "surface_water" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d5fbc2513a6d4909fe31938b0fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_planets_name" ON "planets" ("name") `);
        await queryRunner.query(`CREATE TABLE "species" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "classification" character varying(255) NOT NULL, "designation" character varying(255) NOT NULL, "average_height" character varying(50) NOT NULL, "average_lifespan" character varying(50) NOT NULL, "eye_colors" character varying(255) NOT NULL, "hair_colors" character varying(255) NOT NULL, "skin_colors" character varying(255) NOT NULL, "language" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "homeworldId" integer, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_spacies_name" ON "species" ("name") `);
        await queryRunner.query(`CREATE TABLE "starships" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "starship_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "hyperdrive_rating" character varying(255) NOT NULL, "MGLT" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_10c86d0ac9be05d3f986287a092" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_starships_model" ON "starships" ("model") `);
        await queryRunner.query(`CREATE INDEX "IDX_starships_name" ON "starships" ("name") `);
        await queryRunner.query(`CREATE TABLE "people" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "height" character varying(50) NOT NULL, "mass" character varying(50) NOT NULL, "hair_color" character varying(50) NOT NULL, "skin_color" character varying(50) NOT NULL, "eye_color" character varying(50) NOT NULL, "birth_year" character varying(50) NOT NULL, "gender" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "homeworldId" integer, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_people_name" ON "people" ("name") `);
        await queryRunner.query(`CREATE TABLE "films" ("id" integer NOT NULL, "title" character varying(255) NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" text NOT NULL, "director" character varying(255) NOT NULL, "producer" character varying(255) NOT NULL, "release_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_films_title" ON "films" ("title") `);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "vehicle_class" character varying(255) NOT NULL, "manufacturer" character varying(255) NOT NULL, "length" character varying(255) NOT NULL, "cost_in_credits" character varying(255) NOT NULL, "crew" character varying(255) NOT NULL, "passengers" character varying(255) NOT NULL, "max_atmosphering_speed" character varying(255) NOT NULL, "cargo_capacity" character varying(255) NOT NULL, "consumables" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_vehicle_model" ON "vehicles" ("model") `);
        await queryRunner.query(`CREATE INDEX "IDX_vehicle_name" ON "vehicles" ("name") `);
        await queryRunner.query(`CREATE TABLE "species_people" ("species_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_6f4942ed4509cfd59d8e32e8ec9" PRIMARY KEY ("species_id", "person_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e00f511e662fa5235138c3ea8" ON "species_people" ("species_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac56d5614a83a50ac67ed7c344" ON "species_people" ("person_id") `);
        await queryRunner.query(`CREATE TABLE "starships_people" ("starship_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_b08b38637a47c7c2b2397be35bf" PRIMARY KEY ("starship_id", "person_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38e9d1ac521f5700c816e50c0d" ON "starships_people" ("starship_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_08c2cc975a35550378d7e516e0" ON "starships_people" ("person_id") `);
        await queryRunner.query(`CREATE TABLE "films_characters" ("film_id" integer NOT NULL, "character_id" integer NOT NULL, CONSTRAINT "PK_d655f0e61fdb9ba0493390ebd58" PRIMARY KEY ("film_id", "character_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_92ef0326390645270cf0055645" ON "films_characters" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d309c14888ac91f3b6bb7e7447" ON "films_characters" ("character_id") `);
        await queryRunner.query(`CREATE TABLE "films_planets" ("film_id" integer NOT NULL, "planet_id" integer NOT NULL, CONSTRAINT "PK_a7260d32839af82154051851290" PRIMARY KEY ("film_id", "planet_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b8a6435392aab3ea47ed974132" ON "films_planets" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0f979a772311cb09e158670e6" ON "films_planets" ("planet_id") `);
        await queryRunner.query(`CREATE TABLE "films_starships" ("film_id" integer NOT NULL, "starship_id" integer NOT NULL, CONSTRAINT "PK_782d5f238eac7f5657c96996c6b" PRIMARY KEY ("film_id", "starship_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_444471b3def6a5fd00c6345df3" ON "films_starships" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_588c9888678faab2635a36b361" ON "films_starships" ("starship_id") `);
        await queryRunner.query(`CREATE TABLE "films_vehicles" ("film_id" integer NOT NULL, "vehicle_id" integer NOT NULL, CONSTRAINT "PK_b2bcc5461fa4bf5b52dd9ea946b" PRIMARY KEY ("film_id", "vehicle_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_566192317512e27185cd19c036" ON "films_vehicles" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_129d973beec0dc7265ea220bcd" ON "films_vehicles" ("vehicle_id") `);
        await queryRunner.query(`CREATE TABLE "films_species" ("film_id" integer NOT NULL, "species_id" integer NOT NULL, CONSTRAINT "PK_b8aff46250eeca9e986882b09cc" PRIMARY KEY ("film_id", "species_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b4564b7d840b6ad4b6147dcca" ON "films_species" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_33627205eb18f19ef50b7b16aa" ON "films_species" ("species_id") `);
        await queryRunner.query(`CREATE TABLE "vehicles_people" ("vehicle_id" integer NOT NULL, "person_id" integer NOT NULL, CONSTRAINT "PK_ece842311485d1f39ba6e6b7e73" PRIMARY KEY ("vehicle_id", "person_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_220cf61a40c5b5c82a25529a68" ON "vehicles_people" ("vehicle_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c93d565fa8fbd801b4e1be80a" ON "vehicles_people" ("person_id") `);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_3427f7c92316561d7131c296bc6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6" FOREIGN KEY ("homeworldId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_7e00f511e662fa5235138c3ea8b" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "species_people" ADD CONSTRAINT "FK_ac56d5614a83a50ac67ed7c3449" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_38e9d1ac521f5700c816e50c0de" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "starships_people" ADD CONSTRAINT "FK_08c2cc975a35550378d7e516e05" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_characters" ADD CONSTRAINT "FK_92ef0326390645270cf00556459" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_characters" ADD CONSTRAINT "FK_d309c14888ac91f3b6bb7e74475" FOREIGN KEY ("character_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets" ADD CONSTRAINT "FK_b8a6435392aab3ea47ed974132d" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_planets" ADD CONSTRAINT "FK_f0f979a772311cb09e158670e62" FOREIGN KEY ("planet_id") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships" ADD CONSTRAINT "FK_444471b3def6a5fd00c6345df31" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_starships" ADD CONSTRAINT "FK_588c9888678faab2635a36b3614" FOREIGN KEY ("starship_id") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" ADD CONSTRAINT "FK_566192317512e27185cd19c0363" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" ADD CONSTRAINT "FK_129d973beec0dc7265ea220bcd6" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species" ADD CONSTRAINT "FK_1b4564b7d840b6ad4b6147dcca2" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "films_species" ADD CONSTRAINT "FK_33627205eb18f19ef50b7b16aa5" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_220cf61a40c5b5c82a25529a68b" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" ADD CONSTRAINT "FK_1c93d565fa8fbd801b4e1be80a8" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_1c93d565fa8fbd801b4e1be80a8"`);
        await queryRunner.query(`ALTER TABLE "vehicles_people" DROP CONSTRAINT "FK_220cf61a40c5b5c82a25529a68b"`);
        await queryRunner.query(`ALTER TABLE "films_species" DROP CONSTRAINT "FK_33627205eb18f19ef50b7b16aa5"`);
        await queryRunner.query(`ALTER TABLE "films_species" DROP CONSTRAINT "FK_1b4564b7d840b6ad4b6147dcca2"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" DROP CONSTRAINT "FK_129d973beec0dc7265ea220bcd6"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" DROP CONSTRAINT "FK_566192317512e27185cd19c0363"`);
        await queryRunner.query(`ALTER TABLE "films_starships" DROP CONSTRAINT "FK_588c9888678faab2635a36b3614"`);
        await queryRunner.query(`ALTER TABLE "films_starships" DROP CONSTRAINT "FK_444471b3def6a5fd00c6345df31"`);
        await queryRunner.query(`ALTER TABLE "films_planets" DROP CONSTRAINT "FK_f0f979a772311cb09e158670e62"`);
        await queryRunner.query(`ALTER TABLE "films_planets" DROP CONSTRAINT "FK_b8a6435392aab3ea47ed974132d"`);
        await queryRunner.query(`ALTER TABLE "films_characters" DROP CONSTRAINT "FK_d309c14888ac91f3b6bb7e74475"`);
        await queryRunner.query(`ALTER TABLE "films_characters" DROP CONSTRAINT "FK_92ef0326390645270cf00556459"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_08c2cc975a35550378d7e516e05"`);
        await queryRunner.query(`ALTER TABLE "starships_people" DROP CONSTRAINT "FK_38e9d1ac521f5700c816e50c0de"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_ac56d5614a83a50ac67ed7c3449"`);
        await queryRunner.query(`ALTER TABLE "species_people" DROP CONSTRAINT "FK_7e00f511e662fa5235138c3ea8b"`);
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "FK_8f79bb098a482fa585da15ef3a6"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_3427f7c92316561d7131c296bc6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c93d565fa8fbd801b4e1be80a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_220cf61a40c5b5c82a25529a68"`);
        await queryRunner.query(`DROP TABLE "vehicles_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33627205eb18f19ef50b7b16aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b4564b7d840b6ad4b6147dcca"`);
        await queryRunner.query(`DROP TABLE "films_species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_129d973beec0dc7265ea220bcd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_566192317512e27185cd19c036"`);
        await queryRunner.query(`DROP TABLE "films_vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_588c9888678faab2635a36b361"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_444471b3def6a5fd00c6345df3"`);
        await queryRunner.query(`DROP TABLE "films_starships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0f979a772311cb09e158670e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b8a6435392aab3ea47ed974132"`);
        await queryRunner.query(`DROP TABLE "films_planets"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d309c14888ac91f3b6bb7e7447"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92ef0326390645270cf0055645"`);
        await queryRunner.query(`DROP TABLE "films_characters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08c2cc975a35550378d7e516e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38e9d1ac521f5700c816e50c0d"`);
        await queryRunner.query(`DROP TABLE "starships_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac56d5614a83a50ac67ed7c344"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e00f511e662fa5235138c3ea8"`);
        await queryRunner.query(`DROP TABLE "species_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_vehicle_name"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_vehicle_model"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_films_title"`);
        await queryRunner.query(`DROP TABLE "films"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_people_name"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_starships_name"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_starships_model"`);
        await queryRunner.query(`DROP TABLE "starships"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_spacies_name"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_planets_name"`);
        await queryRunner.query(`DROP TABLE "planets"`);
    }

}
