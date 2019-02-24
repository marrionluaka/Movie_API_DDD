import { ValueTransformer } from "typeorm";
import CustomerName from "@Core/ValueObjects/CustomerName";
import Dollars from "@Core/ValueObjects/Dollars";
import Email from "@Core/ValueObjects/Email";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

export class CustomerNameTransformer implements ValueTransformer {

    to (value: string): CustomerName {
        return CustomerName.Create(value).Value;
    }

    from (custName: CustomerName): string {
        return custName.Name;
    }
}


export class DollarTransformer implements ValueTransformer {

    to (value: number): Dollars {
        return Dollars.Of(value);
    }

    from (dollar: Dollars): number {
        return dollar.Amount;
    }
}

export class EmailTransformer implements ValueTransformer {
    to (value: string): Email {
        return Email.Create(value).Value;
    }

    from (email: Email): string {
        return email.Address;
    }
}

export class ExpirationDateTransformer implements ValueTransformer {

    to (value: Date): ExpirationDate {
        return ExpirationDate.Create(value).Value;
    }

    from (expirationDate: ExpirationDate): Date {
        return expirationDate.Date;
    }
}
