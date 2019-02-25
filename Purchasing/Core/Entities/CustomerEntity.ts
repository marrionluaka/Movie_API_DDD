import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany 
} from "typeorm";
import { 
    CustomerNameTransformer, 
    EmailTransformer, 
    DollarTransformer, 
    CustomerStatusTransformer,
    ExpirationDateTransformer
} from "@Core/Configurations/CustomerConfiguration";
import CustomerName from "@Core/ValueObjects/CustomerName";
import Email from "@Core/ValueObjects/Email";
import CustomerStatus from "@Core/ValueObjects/CustomerStatus";
import Dollars from "@Core/ValueObjects/Dollars";
import PurchasedMoviesEntity from "./PurchasedMoviesEntity";
import PurchasedMovies from "@Core/PurchasedMovie";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

@Entity("customer")
export default abstract class CustomerEntity {
    protected _email: Email;
    protected _status: CustomerStatus;
    protected _statusExpirationDate: ExpirationDate;
    protected _moneySpent: Dollars;
    protected _purchasedMovies: PurchasedMovies[];

    @PrimaryGeneratedColumn("uuid")
    CustomerId: string;

    @Column({ 
        type: String, 
        transformer: new CustomerNameTransformer() 
    })
    Name: CustomerName;

    @Column({
        type: String,
        unique: true,
        name: "Email",
        transformer: new EmailTransformer()
    })
    protected get _Email(): Email{
        return this._email;
    };
    protected set _Email(email: Email){
        this._email = email;
    };

    @Column({ 
        type: Number, 
        name: "Status",
        transformer: new CustomerStatusTransformer() 
    })
    protected get _Status(): CustomerStatus{
        return this._status;
    };
    protected set _Status(status: CustomerStatus){
        this._status = status;
    };

    @Column({ 
        type: Date, 
        name: "StatusExpirationDate",
        transformer: new ExpirationDateTransformer() 
    })
    protected get _StatusExpirationDate(): ExpirationDate{
        return this._statusExpirationDate;
    };
    protected set _StatusExpirationDate(statusExpirationDate: ExpirationDate){
        this._statusExpirationDate = statusExpirationDate;
    };

    @Column({ 
        type: Number, 
        name: "MoneySpent",
        transformer: new DollarTransformer() 
    })
    protected get _MoneySpent(): Dollars{
        return this._moneySpent;
    };
    protected set _MoneySpent(moneySpent: Dollars){
        this._moneySpent = moneySpent;
    };

    @OneToMany(type => PurchasedMoviesEntity, ps => ps._PurchasedMovieId)
    protected get _PurchasedMovies(): PurchasedMovies[]{
        return this._purchasedMovies;
    };
    protected set _PurchasedMovies(moneySpent: PurchasedMovies[]){
        this._purchasedMovies = moneySpent;
    };
}