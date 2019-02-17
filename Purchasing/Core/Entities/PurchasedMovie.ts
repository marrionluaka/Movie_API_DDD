import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import { Customer } from './Customer';
import { Movie } from './Movie';

@Entity()
export class PurchasedMovies {
    @PrimaryGeneratedColumn()
    PurchasedMovieId: number;

    @Column()
    Price: number;

    @Column()
    PurchaseDate: Date;

    @Column()
    ExpirationDate: Date;

    @ManyToOne(type => Customer, c => c.CustomerId)
    Customer: Customer;

    @ManyToOne(type => Movie, m => m.MovieId)
    Movie: Movie;
}