import { Entity, ChildEntity } from 'typeorm';

import ExpirationDate from './ValueObjects/ExpirationDate';
import Dollars from './ValueObjects/Dollars';
import { AddDays } from '@Common/Utils';
import Movie from './Entities/MovieEntity';

@Entity("movie")
export class TwoDaysMovie extends Movie {

    public GetExpirationDate(): ExpirationDate {
        return ExpirationDate.Create(AddDays(2)).Value;
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(4);
    }
}

@Entity("movie")
@ChildEntity()
export class LifeLongMovie extends Movie {
    public GetExpirationDate(): ExpirationDate {
        return ExpirationDate.Infinite();
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(8);
    }
}