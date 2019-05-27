import { 
    Entity, 
    Column, 
    ManyToOne, 
    JoinColumn,
    PrimaryColumn
} from "typeorm";

import CustomerEntity from "@Core/Entities/CustomerEntity";

import { 
    DollarTransformer, 
    ExpirationDateTransformer 
} from "@Core/Configurations/CustomerConfiguration";
import Dollars from "@Core/ValueObjects/Dollars";
import ExpirationDate from "@Core/ValueObjects/ExpirationDate";
import Movie from "./MovieEntity";
import { ValidateKey } from '@Core/Decorators/ValidateKey';
import { GenerateGuid } from "@Common/Utils";

@Entity("purchased_movies")
export default class PurchasedMoviesEntity {
    private _purchasedDate: Date;
    private _customer: CustomerEntity;
    private _movie: Movie;

    @PrimaryColumn({ 
        type: String,
        name: "purchased_movie_id"
    })
    public readonly PurchasedMovieId: string

    @Column({ 
        type: Number, 
        name: "price",
        transformer: new DollarTransformer() 
    })
    public Price: Dollars

    @ValidateKey('_purchasedDate')
    @Column({ name: "purchase_date" })
    public get PurchasedDate(): Date {
        return this._purchasedDate;
    }

    @Column({ 
        type: Date, 
        name: "expirationDate",
        transformer: new ExpirationDateTransformer() 
    })
    public ExpirationDate: ExpirationDate

    @ValidateKey('_customer')
    @ManyToOne(type => CustomerEntity, c => c.PurchasedMovies)
    @JoinColumn({ name: "customer_id" })
    public get Customer(): CustomerEntity {
        return this._customer;
    }

    @ValidateKey('_movie')
    @ManyToOne(type => Movie, m => m.PurchasedMovies)
    @JoinColumn({ name: "movie_id" })
    public get Movie(): Movie {
        return this._movie;
    }


    private constructor(
        price?: Dollars,
        expirationDate?: ExpirationDate,
        movie?: Movie,
        customer?: CustomerEntity
    ){   
        if(!!movie){
            this.PurchasedMovieId = GenerateGuid();
            this.Price = price;
            this.ExpirationDate = expirationDate;
            this._movie = movie;
            this._customer = customer;
            this._purchasedDate = new Date();
        }
    }

    public static Create(
        price: Dollars,
        expirationDate: ExpirationDate,
        movie: Movie,
        customer: CustomerEntity,
    ): PurchasedMoviesEntity {
        if (!price || price.IsZero())
            throw `Invalid argument: price.`;
        if (!expirationDate || expirationDate.IsExpired())
            throw `Invalid argument: expirationDate.`;
        if (!movie)
            throw `Invalid argument: movie.`;
        if (!customer)
            throw `Invalid argument: customer.`;

        return new PurchasedMoviesEntity(price, expirationDate, movie, customer);
    }
}