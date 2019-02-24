import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne 
} from "typeorm";

import CustomerEntity from "./CustomerEntity";
import Movie from "@Core/Movie";
import { 
    DollarTransformer, 
    ExpirationDateTransformer 
} from "@Core/Configurations/CustomerConfiguration";
import Dollars from "@Core/ValueObjects/Dollars";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";

@Entity("purchased_movies")
export default abstract class PurchasedMoviesEntity {
    protected _price: Dollars;
    protected _purchasedDate: Date;
    protected _expirationDate: ExpirationDate;
    protected _customer: CustomerEntity;
    protected _movie: Movie;

    @PrimaryGeneratedColumn("uuid")
    readonly _PurchasedMovieId: string;

    @Column({ 
        type: Number, 
        transformer: new DollarTransformer() 
    })
    protected get _Price(): Dollars{
        return this._price;
    };
    protected set _Price(price: Dollars){
        this._price = price;
    };

    @Column()
    protected get _PurchaseDate(): Date{
        return this._purchasedDate;
    };
    protected set _PurchaseDate(purchasedDate: Date){
        this._purchasedDate = purchasedDate;
    };

    @Column({ 
        type: Date, 
        transformer: new ExpirationDateTransformer() 
    })
    protected get _ExpirationDate(): ExpirationDate{
        return this._expirationDate;
    };
    protected set _ExpirationDate(expirationDate: ExpirationDate){
        this._expirationDate = expirationDate;
    };

    @ManyToOne(type => CustomerEntity, c => c.CustomerId)
    protected get _Customer(): CustomerEntity{
        return this._customer;
    };
    protected set _Customer(customer: CustomerEntity){
        this._customer = customer;
    };

    @ManyToOne(type => Movie, m => m.MovieId)
    protected get _Movie(): Movie{
        return this._movie;
    };
    protected set _Movie(movie: Movie){
        this._movie = movie;
    };
}