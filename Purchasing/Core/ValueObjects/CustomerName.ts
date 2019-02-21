import Result from "@Common/Result";

export default class CustomerName {
    public readonly Name: string;

    private constructor(value: string){
        this.Name = value;
    }

    public static Create(customerName: string): Result<CustomerName> {
        if(!customerName || !customerName.trim().length)
            return Result.Fail("Customer name cannot be empty");

        if(customerName.length > 100)
            return Result.Fail("Customer name is too long");

        return Result.Ok<CustomerName>(new CustomerName(customerName));
    }

    public static Equals(customer: CustomerName, otherCustomer: CustomerName): boolean {
        return customer.Name == otherCustomer.Name;
    }
}