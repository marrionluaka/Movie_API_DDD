import Result from '@Common/Result';

export default class Dollars {
    private static readonly MaxDollarAmount: number = 1000000;
    public readonly Value: number;

    private constructor(value: number) {
        this.Value = value;
    }

    public get IsZero(): boolean {
        return this.Value == 0;
    }

    public static Create(dollarAmount: number): Result<Dollars> {
        const result = new Result(new Dollars(dollarAmount), false, "");
        
        if (dollarAmount < 0)
            return result.Fail("Dollar amount cannot be negative");

        if (dollarAmount > Dollars.MaxDollarAmount)
            return result.Fail(`Dollar amount cannot be greater than ${Dollars.MaxDollarAmount}`);

        return result.Ok;
    }

    public static Of(dollarAmount: number): Dollars {
        return Dollars.Create(dollarAmount).Value;
    }

    public static Multiply(dollars: Dollars, multiplier: number): Dollars {
        return new Dollars(dollars.Value * multiplier);
    }

    public static Add(dollars1: Dollars, dollars2: Dollars): Dollars {
        return new Dollars(dollars1.Value + dollars2.Value);
    }

    public static Equals(dollar: Dollars, other: Dollars): boolean {
        return dollar.Value == other.Value;
    }
}