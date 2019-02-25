import Result from '@Common/Result';

export default class ExpirationDate {
    public readonly Date: Date;
    private static readonly INFINITY_TIMESTAMP = 8640000000000000;

    private constructor(date: Date){
        this.Date = date;
    }

    public static Infinite() : ExpirationDate {
        return new ExpirationDate(new Date(ExpirationDate.INFINITY_TIMESTAMP));
    }

    public IsExpired(): boolean {
        return this !== ExpirationDate.Infinite() && this.Date.getTime() < Date.now();
    }

    public static Create(date: Date): Result<ExpirationDate> {
        return Result.Ok(new ExpirationDate(date));
    }

    public Equals(other: ExpirationDate): boolean {
        return this.Date.getTime() === other.Date.getTime();
    }
}