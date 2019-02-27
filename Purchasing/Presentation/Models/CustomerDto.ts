import PurchasedMovieDto from "./PurchasedMovieDto";

export default class CustomerDto {
    public Id: string;
    public Name: string;
    public Email: string; 
    public Status: number;
    public StatusExpirationDate: Date;
    public MoneySpent: number;;
    public PurchasedMovies: PurchasedMovieDto[];
}