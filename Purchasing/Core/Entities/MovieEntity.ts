import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany 
} from 'typeorm';
import PurchasedMoviesEntity from './PurchasedMoviesEntity';
import CustomerStatus from '../ValueObjects/CustomerStatus';
import { LicensingModel } from '../Enums/LicensingModel';
import ExpirationDate from '../ValueObjects/ExpirationDate';
import Dollars from '../ValueObjects/Dollars';

@Entity()
export default abstract class Movie {
    @PrimaryGeneratedColumn("uuid")
    MovieId: string;

    @Column()
    Name: string;

    @Column({
        type: "enum",
        enum: LicensingModel,
        default: LicensingModel.TwoDays
    })
    LicensingModel: LicensingModel;

    @OneToMany(type => PurchasedMoviesEntity, ps => ps._PurchasedMovieId)
    PurchasedMovies: PurchasedMoviesEntity[];

    public CalculatePrice(status: CustomerStatus): Dollars {
        const modifier: number = 1 - status.GetDiscount();
        return Dollars.Multiply(this.GetBasePrice(), modifier);
    }

    protected abstract GetBasePrice(): Dollars;
    public abstract GetExpirationDate(): ExpirationDate;
}