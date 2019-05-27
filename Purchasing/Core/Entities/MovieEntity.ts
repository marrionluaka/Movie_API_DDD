import { 
    Entity, 
    Column, 
    OneToMany,
    PrimaryColumn
} from 'typeorm';
import PurchasedMoviesEntity from './PurchasedMoviesEntity';
import CustomerStatus from '../ValueObjects/CustomerStatus';
import { LicensingModel } from '../Enums/LicensingModel';
import ExpirationDate from '../ValueObjects/ExpirationDate';
import Dollars from '../ValueObjects/Dollars';
import { AddDays, GenerateGuid } from '@Common/Utils';

@Entity("movie")
export default class Movie {

    @PrimaryColumn({ 
        type: String,
        name: "movie_id",
        readonly: true
    })
    public readonly MovieId: string;

    @Column({ 
        type: String,
        name: "name",
        readonly: true
    })
    readonly Name: string;

    @Column({
        type: "enum",
        name: "licensing_model",
        enum: LicensingModel,
        default: LicensingModel.TwoDays,
        readonly: true
    })
    readonly LicensingModel: LicensingModel;

    @OneToMany(type => PurchasedMoviesEntity, ps => ps.Movie, { cascade: true })
    PurchasedMovies: PurchasedMoviesEntity[];


    constructor(name?: string, licensingModel?: LicensingModel){
        this.MovieId = GenerateGuid();

        if(!!name){
            this.Name = name;
            this.LicensingModel = licensingModel;
        }
    }

    public CalculatePrice(status: CustomerStatus): Dollars {
        return Dollars.Multiply(this.GetBasePrice(), (1 - status.GetDiscount()));
    }

    public GetExpirationDate(): ExpirationDate {
        return ExpirationDate.Create(AddDays(2)).Value;
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(4);
    }
}