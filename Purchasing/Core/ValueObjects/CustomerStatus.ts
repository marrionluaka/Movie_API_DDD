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

    public static get Regular(): CustomerStatus {
        return new CustomerStatus(CustomerStatusType.Regular, ExpirationDate.Infinite);
    }

    public get GetDiscount(): number {
        return this.IsAdvanced ? 0.25 : 0;
    }

    public get IsAdvanced(): boolean {
        return this.Type === CustomerStatusType.Advanced && !this.ExpirationDate.IsExpired;
    }

    public Promote(): CustomerStatus {
        const date = new Date();
        MoveDateForward(1, date);

        return new CustomerStatus(
            CustomerStatusType.Advanced, 
            ExpirationDate.Create(date).Value
        );
    }

    public Equals(other: CustomerStatus): boolean {
        return this.Type === other.Type && this.ExpirationDate.Equals(other.ExpirationDate);
    }
}