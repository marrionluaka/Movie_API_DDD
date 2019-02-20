export default class Result<T> {
    public readonly Value: T;
    public readonly IsFailure: boolean;
    public readonly Error: string;

    private constructor(value: T, failure: boolean, error: string){
        this.Value = value;
        this.IsFailure = failure;
        this.Error = error;
    }

    public static Fail<T>(msg: string): Result<T>{
        return new Result(null, true, msg);
    }

    public static Ok<T>(value: T): Result<T>{
        return new Result(value, false, "");
    }
}