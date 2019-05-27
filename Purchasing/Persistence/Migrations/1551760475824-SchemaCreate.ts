import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaCreate1551760475824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TYPE "movie_licensing_model_enum" AS ENUM('1', '2')`
        );

        await queryRunner.query(
            `CREATE TABLE "movie" (
                "movie_id" character varying NOT NULL, 
                "name" character varying NOT NULL, 
                "licensing_model" "movie_licensing_model_enum" NOT NULL DEFAULT '1', 
                CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744" PRIMARY KEY ("movie_id")
            )`
        );

        await queryRunner.query(
            `CREATE TABLE "purchased_movies" (
                "purchased_movie_id" character varying NOT NULL, 
                "price" integer NOT NULL, 
                "purchase_date" TIMESTAMP NOT NULL, 
                "expirationDate" TIMESTAMP NOT NULL, 
                "customer_id" character varying, 
                "movie_id" character varying, 
                CONSTRAINT "PK_5b7d7927b69e51af9ad33edadf3" PRIMARY KEY ("purchased_movie_id")
            )`
        );
        
        await queryRunner.query(
            `CREATE TABLE "customer" (
                "customer_id" character varying NOT NULL, 
                "name" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "status" integer NOT NULL, 
                "status_expiration_date" TIMESTAMP NOT NULL, 
                "money_spent" integer NOT NULL, 
                CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), 
                CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id")
            )`
        );
        
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_8920a1b22a9d73bf54ccb7b9ab2" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id")`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_359aa4968a90dea2bf159a5f88d" FOREIGN KEY ("movie_id") REFERENCES "movie"("movie_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_359aa4968a90dea2bf159a5f88d"`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_8920a1b22a9d73bf54ccb7b9ab2"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "purchased_movies"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TYPE "movie_licensing_model_enum"`);
    }

}
