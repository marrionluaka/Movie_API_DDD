import ExpirationDate from './ValueObjects/ExpirationDate';
import Dollars from './ValueObjects/Dollars';
import { AddDays } from '@Common/Utils';
import Movie from './Entities/MovieEntity';

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
        return ExpirationDate.Infinite();
    }

    public GetBasePrice(): Dollars {
        return Dollars.Of(8);
    }
}