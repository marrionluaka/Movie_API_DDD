import { expect } from "chai";

import Customer from "@Core/Entities/CustomerEntity";
import CustomerName from "@Core/ValueObjects/CustomerName";
import Email from "@Core/ValueObjects/Email";
import CustomerStatus from "@Core/ValueObjects/CustomerStatus";
import { TwoDaysMovie, LifeLongMovie } from "@Core/Movie";

describe("Customer specs", () => {
    let customer: Customer, 
        twoDayMovie: TwoDaysMovie,
        lifeLongMovie: LifeLongMovie;

    beforeEach(() => {
        customer = Customer.Create(
            CustomerName.Create("Cristiano Ronaldo").Value, 
            Email.Create("nobody@nowhere.com").Value
        );

        twoDayMovie = new TwoDaysMovie();
        lifeLongMovie = new LifeLongMovie();
    });

    context("Create():", () => {
        it("throws an error when the customerName is invalid.", () => {
            expect(() => Customer.Create(null,null))
                .to.throw("Invalid argument: 'customerName'.");
        });

        it("throws an error when the email is invalid.", () => {
            expect(() => Customer.Create(CustomerName.Create("Cristiano Ronaldo").Value, null))
                .to.throw("Invalid argument: 'email'.");
        });

        it("successfully creates a customer object.", () => {
            expect(customer.Name.Name).to.equal("Cristiano Ronaldo");
            expect(customer.Email.Address).to.equal("nobody@nowhere.com");
            expect(customer.MoneySpent.Amount).to.equal(0);
            expect(customer.Status).to.eql(CustomerStatus.Regular());
        });
    });

    context("HasPurchasedMovie(): ", () => {
        it("returns false when the customer hasn't purchased a movie yet.", () => {
            expect(customer.HasPurchasedMovie(lifeLongMovie)).to.be.false;
        });

        it("returns true when the customer has purchased a movie.", () => {
            customer.PurchaseMovie(twoDayMovie);

            expect(customer.HasPurchasedMovie(twoDayMovie)).to.be.true;
        });
    });

    context("PurchaseMovie(): ", () => {
        it("throws when the customer has already purchased the given movie.", () => {
            customer.PurchaseMovie(twoDayMovie);
            
            expect(() => customer.PurchaseMovie(twoDayMovie)).to.throw("You have already purchased this movie.");
        });

        it("purchases a movie.", () => {
            customer.PurchaseMovie(twoDayMovie);

            expect(customer.PurchasedMovies).to.not.be.empty;
            expect(customer.PurchasedMovies[0].Price.Amount).to.equal(4);
            expect(customer.MoneySpent.Amount).to.equal(4);
        });
    });

    context("CanPromote(): ", () => {
        it("fails when the customer's status is already advanced.", () => {
            _spendOneHundredDollarsOnMovies(customer);
            customer.Promote();

            const res = customer.CanPromote();

            expect(res.IsFailure).to.be.true;
            expect(res.Error).to.equal("The customer already has the Advanced status");
        });

        it("fails when the customer doesn't have 2 active movies during the last 30 days.", () => {
            customer.PurchaseMovie(twoDayMovie);

            const res = customer.CanPromote();

            expect(res.IsFailure).to.be.true;
            expect(res.Error).to.equal("The customer has to have at least 2 active movies during the last 30 days");
        });

        it("fails when the customer fails to have spent at least 100 dollars in the past year.", () => {
            customer.PurchaseMovie(twoDayMovie);
            customer.PurchaseMovie(lifeLongMovie);

            const res = customer.CanPromote();
            
            expect(res.IsFailure).to.be.true;
            expect(res.Error).to.equal("The customer has to have at least 100 dollars spent during the last year");
        });

        it("returns ok.", () => {
            _spendOneHundredDollarsOnMovies(customer);

            const res = customer.CanPromote();

            expect(res.IsFailure).to.be.false;
            expect(res.Error).to.be.empty;
        });
    });

    context("Promote(): ", () => {
        it("throws when a customer cannot be promoted.", () => {
            expect(() => customer.Promote()).to.throw("Unable to promote user");
        });

        it("promotes a customer to an advanced status.", () => {
            _spendOneHundredDollarsOnMovies(customer);

            customer.Promote();

            expect(customer.Status.IsAdvanced()).to.be.true;
        });
    });
});

function _spendOneHundredDollarsOnMovies(customer: Customer): void{
    Array(17).fill(null).map((_: any, i: any) => {
        const movie = new LifeLongMovie();
        customer.PurchaseMovie(movie);
    });
}