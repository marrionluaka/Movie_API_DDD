import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import PurchasedMoviesEntity from './Entities/PurchasedMoviesEntity';
import ExpirationDate from './ValueObjects/ExpirationDate';
import Dollars from './ValueObjects/Dollars';
import CustomerStatus from './ValueObjects/CustomerStatus';
import { AddDays } from '@Common/Utils';
import { LicensingModel } from './Enums/LicensingModel';

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
        const modifier: number = 1 - status.GetDiscount;
        return Dollars.Multiply(this.GetBasePrice(), modifier);
    }

    protected abstract GetBasePrice(): Dollars;
    public abstract GetExpirationDate(): ExpirationDate;
}

export class TwoDaysMovie extends Movie {
    public GetExpirationDate(): ExpirationDate {
        return ExpirationDate.Create(AddDays(2)).Value;
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(4);
    }
}

export class LifeLongMovie extends Movie {
    public GetExpirationDate(): ExpirationDate {
        return ExpirationDate.Infinite;
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(8);
    }
}