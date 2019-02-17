import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PurchasedMovies } from './PurchasedMovie';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    MovieId: number;

    @Column()
    Name: string;

    @Column()
    LicensingModel: number;

    @OneToMany(type => PurchasedMovies, ps => ps.PurchasedMovieId)
    PurchasedMovies: PurchasedMovies[];
}