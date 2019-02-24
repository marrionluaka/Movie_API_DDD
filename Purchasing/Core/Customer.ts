import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import PurchasedMovies  from './PurchasedMovie';

@Entity()
export default class Customer {
    @PrimaryGeneratedColumn()
    CustomerId: number;

    @Column()
    private get Name(): string{
        return this.name;
    };
    private set Name(name: string){
        this.name = name;
    };

    @Column()
    Email: string;

    @Column()
    Status: number;

    @Column()
    StatusExpirationDate: Date;

    @Column()
    MoneySpent: number;

    @OneToMany(type => PurchasedMovies, ps => ps._PurchasedMovieId)
    PurchasedMovies: PurchasedMovies[];

    private name: string;

    private constructor(name?: string){
        if(!!name){
            this.Name = name;
        }
    }

    public get FullName(): string {
        return this.Name;
    }

    public static Create(name: string): Customer{
        if(!name) throw "The argument 'name' is required.";

        return new Customer(name);
    }
}