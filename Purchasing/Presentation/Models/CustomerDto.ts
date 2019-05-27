import PurchasedMovieDto from "./PurchasedMovieDto";
import CustomerEntity from "@Core/Entities/CustomerEntity";
import MovieDto from "./MovieDto";

export default class CustomerDto {
    public Id: string;
    public Name: string;
    public Email: string; 
    public Status: number;
    public StatusExpirationDate: Date;
    public MoneySpent: number;;
    public PurchasedMovies: PurchasedMovieDto[];

    public constructor(customer: CustomerEntity) {
        if(!customer) throw "Invalid argument: 'customer' is required.";

        this.Id = customer.CustomerId;
        this.Name = customer.Name.Name;
        this.Email = customer.Email.Address;
        this.MoneySpent = customer.MoneySpent.Amount;
        this.Status = customer.Status.Type;
        this.StatusExpirationDate = customer.Status.ExpirationDate.Date;

        this.PurchasedMovies = customer.PurchasedMovies.map(x => {
            const pDto = new PurchasedMovieDto();
            pDto.Price = x.Price.Amount;
            pDto.ExpirationDate = x.ExpirationDate.Date;
            pDto.PurchaseDate = x.PurchasedDate;

            pDto.Movie = new MovieDto();
            pDto.Movie.Id = x.Movie.MovieId;
            pDto.Movie.Name = x.Movie.Name;
            return pDto;
        });
    }
}