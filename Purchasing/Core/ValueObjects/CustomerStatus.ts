import ExpirationDate from './ExpirationDate';
import { CustomerStatusType } from '@Core/Enums/CustomerStatusType';
import { MoveDateForward } from '@Common/Utils';

export default class CustomerStatus {
    public readonly ExpirationDate: ExpirationDate;
    public readonly Type: CustomerStatusType;

    private constructor(customerStatus: CustomerStatusType, expirationDate: ExpirationDate){
        this.Type = customerStatus;
        this.ExpirationDate = expirationDate;
    }

    public static Regular(): CustomerStatus {
        return new CustomerStatus(CustomerStatusType.Regular, ExpirationDate.Infinite());
    }

    public GetDiscount(): number {
        return this.IsAdvanced ? 0.25 : 0;
    }

    public IsAdvanced(): boolean {
        return this.Type === CustomerStatusType.Advanced && !this.ExpirationDate.IsExpired();
    }

    public static Promote(): CustomerStatus {
        return new CustomerStatus(
            CustomerStatusType.Advanced, 
            ExpirationDate.Create(MoveDateForward(1)).Value
        );
    }

    public Equals(other: CustomerStatus): boolean {
        return this.Type === other.Type && this.ExpirationDate.Equals(other.ExpirationDate);
    }
}