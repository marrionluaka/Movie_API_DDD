import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSchema1551246699545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "movie" ("MovieId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "LicensingModel" "movie_licensingmodel_enum" NOT NULL DEFAULT '1', CONSTRAINT "PK_1db1f55d50a238cd10e42a3124f" PRIMARY KEY ("MovieId"))`);
        await queryRunner.query(`CREATE TABLE "purchased_movies" ("PurchasedMovieId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Price" integer NOT NULL, "PurchaseDate" TIMESTAMP NOT NULL, "ExpirationDate" TIMESTAMP NOT NULL, "PurchasedMovies" uuid, "Movie" uuid, CONSTRAINT "PK_9ac2b1b9639b223c1c193af1213" PRIMARY KEY ("PurchasedMovieId"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("CustomerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "Email" character varying NOT NULL, "Status" integer NOT NULL, "StatusExpirationDate" TIMESTAMP NOT NULL, "MoneySpent" integer NOT NULL, CONSTRAINT "UQ_a917b1bb75400f25c5f477a4e5e" UNIQUE ("Email"), CONSTRAINT "PK_92a0fc1be801487e36486f5bae7" PRIMARY KEY ("CustomerId"))`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_56a1a3f7ffce3731dd4a7e4257d" FOREIGN KEY ("PurchasedMovies") REFERENCES "customer"("CustomerId")`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_d06f42c0538e375cda4733fe63d" FOREIGN KEY ("Movie") REFERENCES "movie"("MovieId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_d06f42c0538e375cda4733fe63d"`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_56a1a3f7ffce3731dd4a7e4257d"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "purchased_movies"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
