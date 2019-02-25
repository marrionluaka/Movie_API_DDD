import Result from '@Common/Result';

export default class Dollars {
    private static readonly MaxDollarAmount: number = 1000000;
    public readonly Amount: number;

    private constructor(value: number) {
        this.Amount = value;
    }

    public IsZero(): boolean {
        return this.Amount == 0;
    }

    public static Create(dollarAmount: number): Result<Dollars> {
        if (dollarAmount < 0)
            return Result.Fail("Dollar amount cannot be negative");

        if (dollarAmount > Dollars.MaxDollarAmount)
            return Result.Fail(`Dollar amount cannot be greater than ${Dollars.MaxDollarAmount}`);

        return Result.Ok(new Dollars(dollarAmount));
    }

    public static Of(dollarAmount: number): Dollars {
        return Dollars.Create(dollarAmount).Value;
    }

    public static Multiply(dollars: Dollars, multiplier: number): Dollars {
        return new Dollars(dollars.Amount * multiplier);
    }

    public static Add(dollars1: Dollars, dollars2: Dollars): Dollars {
        return new Dollars(dollars1.Amount + dollars2.Amount);
    }

    public static Equals(dollar: Dollars, other: Dollars): boolean {
        return dollar.Amount == other.Amount;
    }
}