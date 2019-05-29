import { 
    Entity, 
    Column, 
    OneToMany,
    PrimaryColumn
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
import PurchasedMoviesEntity from "@Core/Entities/PurchasedMoviesEntity";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";
import Movie from "./MovieEntity";
import { ValidateKey } from '@Core/Decorators/ValidateKey';
import Result from "@Common/Result";
import { RemoveDays, MoveDateBackward, GenerateGuid } from "@Common/Utils";

@Entity("customer")
export default class CustomerEntity {
    private _statusExpirationDate: ExpirationDate;

    @PrimaryColumn({ 
        type: String,
        name: "customer_id"
    })
    public readonly CustomerId: string 

    @Column({ 
        type: String, 
        name: "name",
        transformer: new CustomerNameTransformer() 
    })
    public Name: CustomerName

    @Column({
        type: String,
        unique: true,
        name: "email",
        transformer: new EmailTransformer()
    })
    public Email: Email

    @Column({ 
        type: Number, 
        name: "status",
        transformer: new CustomerStatusTransformer() 
    })
    public Status: CustomerStatus

    @ValidateKey(
        '_statusExpirationDate',
        (statusExpirationDate: ExpirationDate) => statusExpirationDate.IsExpired()
    )
    @Column({ 
        type: Date, 
        name: "status_expiration_date",
        transformer: new ExpirationDateTransformer() 
    })
    public get StatusExpirationDate(): ExpirationDate {
        return this._statusExpirationDate;
    }

    @Column({
        type: Number, 
        name: "money_spent",
        transformer: new DollarTransformer() 
    })
    public MoneySpent: Dollars

    @OneToMany(type => PurchasedMoviesEntity, ps => ps.Customer, { cascade: true })
    public PurchasedMovies: PurchasedMoviesEntity[]
    
    private constructor(customerName?: CustomerName, email?: Email) {
        if(!!customerName){
            this.CustomerId = GenerateGuid();
            this.Name = customerName;
            this.Email = email;
            this.MoneySpent = Dollars.Of(0);
            this.Status = CustomerStatus.Regular();
            this.PurchasedMovies = [];
            this._statusExpirationDate = this.Status.ExpirationDate;
        }
    }

    public static Create(customerName: CustomerName, email: Email): CustomerEntity {
        if(!customerName) throw "Invalid argument: 'customerName'.";
        if(!email) throw "Invalid argument: 'email'."; 
        return new CustomerEntity(customerName, email);
    }

    public HasPurchasedMovie(movie: Movie): boolean {
        return !!this.PurchasedMovies.some(x => x.Movie.MovieId === movie.MovieId && !x.ExpirationDate.IsExpired());
    }

    public PurchaseMovie(movie: Movie): void {
        if (this.HasPurchasedMovie(movie)) throw "You have already purchased this movie.";

        const price = movie.CalculatePrice(this.Status);
        
        const purchasedMovie = PurchasedMoviesEntity.Create(
            price, 
            movie.GetExpirationDate(),
            movie, 
            this
        );

        this.PurchasedMovies.push(purchasedMovie);
        this.MoneySpent = Dollars.Add(this.MoneySpent, price);
    }

    public CanPromote(): Result<CustomerEntity> {
        
        if (this.Status.IsAdvanced())
            return Result.Fail("The customer already has the Advanced status");

        if (this.PurchasedMovies.filter((x: PurchasedMoviesEntity) => 
                x.ExpirationDate.Equals(ExpirationDate.Infinite()) || 
                x.ExpirationDate.Date.getTime() >= RemoveDays(30).getTime() 
            ).length < 2)
            return Result.Fail("The customer has to have at least 2 active movies during the last 30 days");

        if (this.PurchasedMovies.filter((x: PurchasedMoviesEntity) => 
                    x.PurchasedDate.getFullYear() > MoveDateBackward(1).getFullYear())
                .reduce((acc: number, x: PurchasedMoviesEntity) => acc += x.Price.Amount, 0) < 100
            )
            return Result.Fail("The customer has to have at least 100 dollars spent during the last year");

        return Result.Ok();
    }

    public Promote(): void {
        if (this.CanPromote().IsFailure) throw "Unable to promote user.";
        this.Status = CustomerStatus.Promote();
    }
}