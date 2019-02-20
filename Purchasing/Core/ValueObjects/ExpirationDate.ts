import Result from '@Common/Result';

export default class ExpirationDate {
    public readonly Date: Date;

    private constructor(date: Date){
        this.Date = date;
    }

    public get Infinite() : ExpirationDate {
        return new ExpirationDate(null)
    }

    public get IsExpired(): boolean {
        return this !== this.Infinite && this.Date.getDate < Date.now;
    }

    public static Create(date: Date): Result<ExpirationDate> {
        return Result.Ok(new ExpirationDate(date));
    }

    protected Equals(other: ExpirationDate): boolean {
        return this.Date == other.Date;
    }
}