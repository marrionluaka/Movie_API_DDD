import PurchasedMovies  from './PurchasedMovie';
import Dollars from './ValueObjects/Dollars';
import CustomerName from './ValueObjects/CustomerName';
import CustomerStatus from './ValueObjects/CustomerStatus';
import Email from './ValueObjects/Email';
import Movie from './Movie';
import Result from '@Common/Result';
import ExpirationDate from './ValueObjects/ExpirationDate';
import CustomerEntity from './Entities/CustomerEntity';
import { RemoveDays, MoveDateBackward } from '@Common/Utils';

export default class Customer extends CustomerEntity {
    
    public get Status(): CustomerStatus {
        return this._Status;
    }

    public get MoneySpent(): Dollars {
        return this._MoneySpent;
    }

    public get Email(): Email {
        return this._Email;
    }

    public get PurchasedMovies(): ReadonlyArray<PurchasedMovies> {
        return this._PurchasedMovies;
    };

    private constructor(customerName?: CustomerName, email?: Email) {
        super();

        if(!!customerName){
            this.Name = customerName;
            this._Email = email;
            this._MoneySpent = Dollars.Of(0);
            this._Status = CustomerStatus.Regular;
            this._PurchasedMovies = [];
        }
    }

    public static Create(customerName: CustomerName, email: Email): Customer {
        if(!customerName) throw "Invalid argument: 'customerName'.";
        if(!email) throw "Invalid argument: 'email'."; 
        return new Customer(customerName, email);
    }

    public HasPurchasedMovie(movie: Movie): boolean {
        return !!this.PurchasedMovies.some(x => x.Movie == movie && !x.ExpirationDate.IsExpired);
    }

    public PurchaseMovie(movie: Movie): void {
        if (this.HasPurchasedMovie(movie)) throw "You have already purchased this movie.";

        const price = movie.CalculatePrice(this.Status);

        const purchasedMovie = PurchasedMovies.Create(
            price, 
            movie.GetExpirationDate(),
            movie, 
            this
        );

        this._purchasedMovies.push(purchasedMovie);
        this._MoneySpent = Dollars.Add(this.MoneySpent, price);
    }

    public CanPromote(): Result<Customer> {
        if (this.Status.IsAdvanced)
            return Result.Fail("The customer already has the Advanced status");

        if (this.PurchasedMovies.filter((x: PurchasedMovies) => 
                x.ExpirationDate.Equals(ExpirationDate.Infinite) || 
                x.ExpirationDate.Date.getTime() >= RemoveDays(30).getTime() 
            ).length < 2)
            return Result.Fail("The customer has to have at least 2 active movies during the last 30 days");

        if (this.PurchasedMovies.filter((x: PurchasedMovies) => 
                    x.PurchaseDate.getFullYear() > MoveDateBackward(1).getFullYear())
                .reduce((acc: number, x: PurchasedMovies) => acc += x.Price.Amount, 0) < 100
            )
            return Result.Fail("The customer has to have at least 100 dollars spent during the last year");

        return Result.Ok();
    }

    public Promote(): void {
        if (this.CanPromote().IsFailure) throw "Unable to promote user.";

        this._Status = this._Status.Promote();
    }
}