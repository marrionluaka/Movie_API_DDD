import ExpirationDate from './ExpirationDate';

export enum CustomerStatusType
{
    Regular = 1,
    Advanced = 2
} 

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
        const aYearFromNow = new Date();
        aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);

        return new CustomerStatus(
            CustomerStatusType.Advanced, 
            ExpirationDate.Create(aYearFromNow).Value
        );
    }

    public Equals(other: CustomerStatus): boolean {
        return this.Type === other.Type && this.ExpirationDate.Equals(other.ExpirationDate);
    }
}