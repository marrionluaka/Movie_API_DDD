import { expect } from "chai";

import PurchasedMovie from "@Core/Entities/PurchasedMoviesEntity";
import Dollars from "@Core/ValueObjects/Dollars";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";
import { MoveDateBackward, MoveDateForward } from "@Common/Utils";
import { TwoDaysMovie } from "@Core/Movie";
import Customer from "@Core/Entities/CustomerEntity";
import CustomerName from "@Core/ValueObjects/CustomerName";
import Email from "@Core/ValueObjects/Email";

describe("PurchasedMovie specs", () => {
    let tenDollars: Dollars,
        validDate: ExpirationDate;

    beforeEach(() => {
        tenDollars = Dollars.Of(10);
        validDate = ExpirationDate.Create(MoveDateForward(1)).Value;
    });

    context("Create():", () => {

        it("throws an error when the given price is invalid.", () => {
            expect(() => PurchasedMovie.Create(null,null,null,null))
                .to.throw("Invalid argument: price.");

            expect(() => PurchasedMovie.Create(Dollars.Of(0),null,null,null))
                .to.throw("Invalid argument: price.");
        });

        it("throws an error when the given expirationDate is invalid.", () => {
            expect(() => PurchasedMovie.Create(tenDollars,null,null,null))
                .to.throw("Invalid argument: expirationDate.");

            expect(() => PurchasedMovie.Create(tenDollars, ExpirationDate.Create(MoveDateBackward(1)).Value, null, null))
                .to.throw("Invalid argument: expirationDate.");
        });

        it("throws an error when the given movie is invalid.", () => {
            expect(() => PurchasedMovie.Create(tenDollars, validDate, null, null))
                .to.throw("Invalid argument: movie.");
        });

        it("throws an error when the given customer is invalid.", () => {
            expect(() => PurchasedMovie.Create(tenDollars, validDate, new TwoDaysMovie(), null))
                .to.throw("Invalid argument: customer.");
        });

        it("successfully creates a customer object.", () => {
           const purchasedMovie = PurchasedMovie.Create(
               tenDollars,
               validDate,
               new TwoDaysMovie(),
               Customer.Create(
                   CustomerName.Create("Dale").Value,
                   Email.Create("nobody@nowhere.com").Value
                )
           );

           expect(purchasedMovie.Price.Amount).to.equal(tenDollars.Amount);
        });
    });
});