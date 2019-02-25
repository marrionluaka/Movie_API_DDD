import Result from "@Common/Result";

export default class Email {
    public readonly Address: string;

    private constructor(email: string){
        this.Address = email;
    }

    public static Create(email: string): Result<Email> {
        if(!email || !email.length)
            return Result.Fail("The provided email cannot be empty");

        if(!email.match(/\S+@\S+\.\S+/))
            return Result.Fail("The provided email is invalid");

        return Result.Ok<Email>(new Email(email));
    }

    public static Equals(email: Email, otherEmail: Email): boolean {
        return email.Address === otherEmail.Address;
    }
}