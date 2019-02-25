import { expect } from "chai";

import { TwoDaysMovie, LifeLongMovie } from "@Core/Movie";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

describe("Movie specs", () => {

    context("TwoDaysMovie specs", () => {

        it("GetBasePrice(): returns 4 dollars.", () => {
            expect(new TwoDaysMovie().GetBasePrice().Amount).to.equal(4);
        });
    });

    context("LifeLongMovie specs", () => {
        it("GetExpirationDate(): returns a never expiring date.", () => {
            expect(new LifeLongMovie().GetExpirationDate()).to.eql(ExpirationDate.Infinite());
        });

        it("GetBasePrice(): returns 8 dollars.", () => {
            expect(new LifeLongMovie().GetBasePrice().Amount).to.equal(8);
        });
    });
});