import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn
} from "typeorm";

import CustomerEntity from "./CustomerEntity";

import { 
    DollarTransformer, 
    ExpirationDateTransformer 
} from "@Core/Configurations/CustomerConfiguration";
import Dollars from "@Core/ValueObjects/Dollars";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";
import Movie from "./MovieEntity";
import Customer from "@Core/Customer";

@Entity("purchased_movies")
export default abstract class PurchasedMoviesEntity {
    protected _price: Dollars;
    protected _purchasedDate: Date;
    protected _expirationDate: ExpirationDate;
    protected _customer: CustomerEntity;
    protected _movie: Movie;

    @PrimaryGeneratedColumn("uuid")
    readonly PurchasedMovieId: string;

    @Column({ 
        type: Number, 
        name: "Price",
        transformer: new DollarTransformer() 
    })
    protected get _Price(): Dollars{
        return this._price;
    };
    protected set _Price(price: Dollars){
        this._price = price;
    };

    @Column({ name: "PurchaseDate" })
    protected get _PurchaseDate(): Date{
        return this._purchasedDate;
    };
    protected set _PurchaseDate(purchasedDate: Date){
        this._purchasedDate = purchasedDate;
    };

    @Column({ 
        type: Date, 
        name: "ExpirationDate",
        transformer: new ExpirationDateTransformer() 
    })
    protected get _ExpirationDate(): ExpirationDate{
        return this._expirationDate;
    };
    protected set _ExpirationDate(expirationDate: ExpirationDate){
        this._expirationDate = expirationDate;
    };

    @ManyToOne(type => CustomerEntity, c => c.PurchasedMovies)
    @JoinColumn()
    protected get _Customer(): CustomerEntity{
        return this._customer;
    };
    protected set _Customer(customer: CustomerEntity){
        this._customer = customer;
    };

    @ManyToOne(type => Movie, m => m.PurchasedMovies)
    @JoinColumn()
    protected get _Movie(): Movie{
        return this._movie;
    };
    protected set _Movie(movie: Movie){
        this._movie = movie;
    };
    
    
    public get Price(): Dollars{
        return this._Price;
    }

    public get PurchaseDate(): Date{
        return this._PurchaseDate;
    }

    public get ExpirationDate(): ExpirationDate{
        return this._ExpirationDate;
    }

    public get Customer(): CustomerEntity{
        return this.Customer;
    }

    public get Movie(): Movie{
        return this._Movie;
    }
}