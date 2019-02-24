import { expect } from "chai";

import Dollars from "@Core/ValueObjects/Dollars";

describe("Dollar specs", () => {

    context("Create():", () => {

        it("fails when the dollar amount is less than zero.", () => {
            const actual = Dollars.Create(-1);

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal("Dollar amount cannot be negative");
            expect(actual.Value).to.be.null;
        });

        it("fails when the dollar amount is greater than the max dollar amount allowed.", () => {
            const actual = Dollars.Create(1000001);

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal(`Dollar amount cannot be greater than 1000000`);
            expect(actual.Value).to.be.null;
        });

        it("returns a new dollar amount.", () => {
            const actual = Dollars.Create(10);
            
            expect(actual.IsFailure).to.be.false;
            expect(actual.Error).to.be.empty;
            expect(actual.Value.Amount).to.be.equal(10);
        });
    });

    it("Of(): returns a new dollars instance.", () => {
        expect(Dollars.Of(8).Amount).to.equal(8);
    });

    it("Multiply(): multiplies dollar objects.", () => {
        const actual = Dollars.Multiply(Dollars.Of(2), 5);
        expect(actual.Amount).to.equal(10);
    });

    it("Add(): adds dollars objects.", () => {
        const actual = Dollars.Add(Dollars.Of(2), Dollars.Of(5));
        expect(actual.Amount).to.equal(7);
    });

    it("Equals(): checks the equality of two dollar objects.", () => {
        const actual = Dollars.Equals(Dollars.Of(5), Dollars.Of(5));
        expect(actual).to.be.true;
    });
});