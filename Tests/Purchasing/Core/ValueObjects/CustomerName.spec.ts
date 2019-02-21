import CustomerName from "@Core/ValueObjects/CustomerName";
import { expect } from "chai";

describe("CustomerName specs", () => {
    context("Create():", () => {

        it("fails when the customer's name is empty", () => {
           const actual = CustomerName.Create("");

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal("Customer name cannot be empty");
            expect(actual.Value).to.be.null;
        });

        it("fails when the customer's name is longer than 100 characters", () => {
            const actual = CustomerName.Create(_generateString(101, ""));

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal("Customer name is too long");
            expect(actual.Value).to.be.null;
        });

        it("returns a customer's name", () => {
            expect(CustomerName.Create("Floyd").Value.Name).to.equal("Floyd");
        });
    });

    it("Equals(): checks the equality of two email objects.", () => {
        const actual = CustomerName.Equals(
            CustomerName.Create("Dave").Value, 
            CustomerName.Create("Dave").Value);
        expect(actual).to.be.true;
    });
});

function _generateString(idx: number, str: string): string{
    Array(idx).fill(null).map((_: any, i: any) => {
        str +="a";
    });
    return str;
}