import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PurchasedMovies } from './PurchasedMovie';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    CustomerId: number;

    @Column()
    Name: string;

    @Column()
    Email: string;

    @Column()
    Status: number;

    @Column()
    StatusExpirationDate: Date;

    @Column()
    MoneySpent: number;

    @OneToMany(type => PurchasedMovies, ps => ps.PurchasedMovieId)
    PurchasedMovies: PurchasedMovies[];
}