import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import Customer from './Customer';
import Movie from './Movie';
import Dollars from './ValueObjects/Dollars';
import ExpirationDate from './ValueObjects/ExpirationDate';

@Entity()
export default class PurchasedMovies {
    @PrimaryGeneratedColumn()
    readonly _PurchasedMovieId: number;

    @Column()
    private get _Price(): number{
        return this._price;
    };
    private set _Price(price: number){
        this._price = price;
    };

    @Column()
    private get _PurchaseDate(): Date{
        return this._purchasedDate;
    };
    private set _PurchaseDate(purchasedDate: Date){
        this._purchasedDate = purchasedDate;
    };

    @Column()
    private get _ExpirationDate(): Date{
        return this._expirationDate;
    };
    private set _ExpirationDate(expirationDate: Date){
        this._expirationDate = expirationDate;
    };

    @ManyToOne(type => Customer, c => c.CustomerId)
    private get _Customer(): Customer{
        return this._customer;
    };
    private set _Customer(customer: Customer){
        this._customer = customer;
    };

    @ManyToOne(type => Movie, m => m.MovieId)
    private get _Movie(): Movie{
        return this._movie;
    };
    private set _Movie(movie: Movie){
        this._movie = movie;
    };

    private _price: number;
    private _purchasedDate: Date;
    private _expirationDate: Date;
    private _customer: Customer;
    private _movie: Movie;

    private constructor(
        price?: Dollars,
        expirationDate?: ExpirationDate,
        movie?: Movie,
        customer?: Customer
    ){
        if(!!movie){
            this._Movie = movie;
            this._Customer = customer;
            this._Price = price.Amount;
            this._ExpirationDate = expirationDate.Date;
            this._PurchaseDate = new Date();
        }
    }

    public get Price(): number{
        return this._Price;
    }

    public get PurchaseDate(): Date{
        return this._PurchaseDate;
    }

    public get ExpirationDate(): Date{
        return this._ExpirationDate;
    }

    public get Customer(): Customer{
        return this._Customer;
    }

    public get Movie(): Movie{
        return this._Movie;
    }

    public static Create(
        price: Dollars,
        expirationDate: ExpirationDate,
        movie: Movie,
        customer: Customer,
    ): PurchasedMovies {
        if (!price || price.IsZero)
            throw `Invalid argument: price.`;
        if (!expirationDate || expirationDate.IsExpired)
            throw `Invalid argument: expirationDate.`;
        if (!movie)
            throw `Invalid argument: movie.`;
        if (!customer)
            throw `Invalid argument: customer.`;

        return new PurchasedMovies(price, expirationDate, movie, customer);
    }
}