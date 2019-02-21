import Email from "@Core/ValueObjects/Email";
import { expect } from "chai";

describe("Email specs", () => {
    context("Create():", () => {

        it("fails when the customer's name is empty", () => {
           const actual = Email.Create("");

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal("The provided email cannot be empty");
            expect(actual.Value).to.be.null;
        });

        it("fails when the customer's name is longer than 100 characters", () => {
            const actual = Email.Create("aijfisdi.com");

            expect(actual.IsFailure).to.be.true;
            expect(actual.Error).to.equal("The provided email is invalid");
            expect(actual.Value).to.be.null;
        });

        it("returns a customer's name", () => {
            expect(Email.Create("somebody@somewhere.com").Value.Address)
            .to
            .equal("somebody@somewhere.com");
        });
    });

    it("Equals(): checks the equality of two email objects.", () => {
        const actual = Email.Equals(
            Email.Create("somebody@somewhere.com").Value, 
            Email.Create("somebody@somewhere.com").Value);
        expect(actual).to.be.true;
    });
});