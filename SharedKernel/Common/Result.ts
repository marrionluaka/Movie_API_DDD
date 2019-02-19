export default class Result<T> {
    public readonly Value: T;
    public readonly IsFailure: boolean;
    public readonly Error: string;

    public constructor(value: T, failure: boolean, error: string){
        this.Value = value;
        this.IsFailure = failure;
        this.Error = error;
    }

    public Fail(msg: string): Result<T>{
        return new Result(this.Value, true, msg);
    }

    public get Ok(): Result<T>{
        return new Result(this.Value, false, "");
    }
}