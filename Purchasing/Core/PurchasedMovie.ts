import Customer from './Customer';
import Dollars from './ValueObjects/Dollars';
import ExpirationDate from './ValueObjects/ExpirationDate';
import PurchasedMoviesEntity from './Entities/PurchasedMoviesEntity';
import Movie from './Entities/MovieEntity';

export default class PurchasedMovies extends PurchasedMoviesEntity {
    
    private constructor(
        price?: Dollars,
        expirationDate?: ExpirationDate,
        movie?: Movie,
        customer?: Customer
    ){
        super();
        
        if(!!movie){
            this._Movie = movie;
            this._Customer = customer;
            this._Price = price;
            this._ExpirationDate = expirationDate;
            this._PurchaseDate = new Date();
        }
    }

    public static Create(
        price: Dollars,
        expirationDate: ExpirationDate,
        movie: Movie,
        customer: Customer,
    ): PurchasedMovies {
        if (!price || price.IsZero())
            throw `Invalid argument: price.`;
        if (!expirationDate || expirationDate.IsExpired())
            throw `Invalid argument: expirationDate.`;
        if (!movie)
            throw `Invalid argument: movie.`;
        if (!customer)
            throw `Invalid argument: customer.`;

        return new PurchasedMovies(price, expirationDate, movie, customer);
    }
}