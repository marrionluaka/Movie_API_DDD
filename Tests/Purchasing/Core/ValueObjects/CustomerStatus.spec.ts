import { expect } from "chai";

import CustomerStatus from "@Core/ValueObjects/CustomerStatus";
import { CustomerStatusType } from "@Core/Enums/CustomerStatusType";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

describe("CustomerStatus specs", () => {
   it("Regular(): creates a new regular customer status.", () => {
       const customerStatus = CustomerStatus.Regular();

       expect(customerStatus.Type).to.equal(CustomerStatusType.Regular);
       expect(customerStatus.ExpirationDate.Date.getTime())
       .to
       .equal(ExpirationDate.Infinite().Date.getTime());
   }); 

   it("IsAdvanced(): returns true when customer status is advanced.", () => {
        expect(CustomerStatus.Regular().IsAdvanced()).to.be.false;
        expect(CustomerStatus.Promote().IsAdvanced()).to.be.true;
   });

   it("GetDiscount(): retrieves a customer's discount.", () => {
        expect(CustomerStatus.Regular().GetDiscount()).to.equal(0);
        expect(CustomerStatus.Promote().GetDiscount()).to.equal(0.25);
   });

   it("Equals(): returns true when two customer status object are equal.", () => {
       const customer = CustomerStatus.Regular();
       const customer2 = CustomerStatus.Regular();

       expect(customer.Equals(customer2)).to.be.true;
   }); 
});