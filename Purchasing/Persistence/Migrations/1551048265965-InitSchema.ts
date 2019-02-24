import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSchema1551048265965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer" ("CustomerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "_Email" character varying NOT NULL, "_Status" "customer__status_enum" NOT NULL DEFAULT '[object Object]', "StatusExpirationDate" TIMESTAMP NOT NULL, "_MoneySpent" integer NOT NULL, CONSTRAINT "UQ_4b9fff332e05038b57d89a15d0e" UNIQUE ("_Email"), CONSTRAINT "PK_92a0fc1be801487e36486f5bae7" PRIMARY KEY ("CustomerId"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("MovieId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "LicensingModel" "movie_licensingmodel_enum" NOT NULL DEFAULT '1', CONSTRAINT "PK_1db1f55d50a238cd10e42a3124f" PRIMARY KEY ("MovieId"))`);
        await queryRunner.query(`CREATE TABLE "purchased_movies" ("_PurchasedMovieId" uuid NOT NULL DEFAULT uuid_generate_v4(), "_Price" integer NOT NULL, "_PurchaseDate" TIMESTAMP NOT NULL, "_ExpirationDate" TIMESTAMP NOT NULL, "CustomerCustomerId" uuid, "MovieMovieId" uuid, CONSTRAINT "PK_239743d12aeb2910bf63f52ae46" PRIMARY KEY ("_PurchasedMovieId"))`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_eed5862c0afee446b9547ee58d7" FOREIGN KEY ("CustomerCustomerId") REFERENCES "customer"("CustomerId")`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" ADD CONSTRAINT "FK_c65a66a8f1767a0dbd502cc32a6" FOREIGN KEY ("MovieMovieId") REFERENCES "movie"("MovieId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_c65a66a8f1767a0dbd502cc32a6"`);
        await queryRunner.query(`ALTER TABLE "purchased_movies" DROP CONSTRAINT "FK_eed5862c0afee446b9547ee58d7"`);
        await queryRunner.query(`DROP TABLE "purchased_movies"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
