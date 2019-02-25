import { ValueTransformer } from "typeorm";
import CustomerName from "@Core/ValueObjects/CustomerName";
import Dollars from "@Core/ValueObjects/Dollars";
import Email from "@Core/ValueObjects/Email";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";
import CustomerStatus from "@Core/ValueObjects/CustomerStatus";

export class CustomerNameTransformer implements ValueTransformer {
    to (custName: CustomerName): string {
        return custName.Name;
    }

    from (value: string): CustomerName {
        return CustomerName.Create(value).Value;
    }
}

export class DollarTransformer implements ValueTransformer {
    to (dollar: Dollars): number {
        return dollar.Amount;
    }

    from (value: number): Dollars {
        return Dollars.Of(value);
    }   
}

export class EmailTransformer implements ValueTransformer {
    to (email: Email): string {
        return email.Address;
    }

    from (value: string): Email {
        return Email.Create(value).Value;
    }
}

export class ExpirationDateTransformer implements ValueTransformer {
    to (expirationDate: ExpirationDate): Date {
        return expirationDate.Date;
    }

    from (value: Date): ExpirationDate {
        return ExpirationDate.Create(value).Value;
    }
}

export class CustomerStatusTransformer implements ValueTransformer {
    to (customerStatus: CustomerStatus): number {
        return customerStatus.Type;
    }

    from (value: number): CustomerStatus {
        return value === 2 ? CustomerStatus.Promote() : CustomerStatus.Regular();
    }
}
