import CustomerStatus, { CustomerStatusType } from "@Core/ValueObjects/CustomerStatus";
import { expect } from "chai";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

describe("CustomerStatus specs", () => {
   it("Regular(): creates a new regular customer status.", () => {
       const customerStatus = CustomerStatus.Regular;

       expect(customerStatus.Type).to.equal(CustomerStatusType.Regular);
       expect(customerStatus.ExpirationDate.Date.getTime())
       .to
       .equal(ExpirationDate.Infinite.Date.getTime());
   }); 

   it("IsAdvanced(): returns true when customer status is advanced.", () => {
        expect(CustomerStatus.Regular.IsAdvanced).to.be.false;
        expect(CustomerStatus.Regular.Promote().IsAdvanced).to.be.true;
   });

   it("GetDiscount(): retrieves a customer's discount.", () => {
        expect(CustomerStatus.Regular.GetDiscount).to.equal(0);
        expect(CustomerStatus.Regular.Promote().GetDiscount).to.equal(0.25);
   });

   it("Equals(): returns true when two customer status object are equal.", () => {
       const customer = CustomerStatus.Regular;
       const customer2 = CustomerStatus.Regular;

       expect(customer.Equals(customer2)).to.be.true;
   }); 
});