import MovieDto from "./MovieDto";

export default class PurchasedMovieDto {
    public Movie: MovieDto;
    public Price: number;
    public PurchaseDate: Date;
    public ExpirationDate: Date;
}