import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaCreate1550389149070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "movie" ("MovieId" SERIAL NOT NULL, "Name" character varying NOT NULL, "LicensingModel" integer NOT NULL, CONSTRAINT "PK_1db1f55d50a238cd10e42a3124f" PRIMARY KEY ("MovieId"))`);
        await queryRunner.query(`CREATE TABLE "purchased_movies" ("PurchasedMovieId" SERIAL NOT NULL, "Price" integer NOT NULL, "PurchaseDate" TIMESTAMP NOT NULL, "ExpirationDate" TIMESTAMP NOT NULL, "customerCustomerId" integer, "movieMovieId" integer, CONSTRAINT "PK_9ac2b1b9639b223c1c193af1213" PRIMARY KEY ("PurchasedMovieId"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("CustomerId" SERIAL NOT NULL, "Name" character varying NOT NULL, "Email" character varying NOT NULL, "Status" integer NOT NULL, "StatusExpirationDate" TIMESTAMP NOT NULL, "MoneySpent" integer NOT NULL, CONSTRAINT "PK_92a0fc1be801487e36486f5bae7" PRIMARY KEY ("CustomerId"))`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_f6be6b925d4830526ab7f8d2f48" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("CustomerId")`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_31e0e5f47bc9acd16826af6e386" FOREIGN KEY ("movieMovieId") REFERENCES "movie"("MovieId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_31e0e5f47bc9acd16826af6e386"`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_f6be6b925d4830526ab7f8d2f48"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "purchased_movies"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
