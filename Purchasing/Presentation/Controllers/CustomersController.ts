import { Request, Response } from 'express';
import { inject } from 'inversify';
import { 
    interfaces, 
    controller, 
    httpGet,
    requestParam,
    response
} from "inversify-express-utils";
import { Repository } from 'typeorm';

import Movie from '@Core/Entities/MovieEntity';
import CustomerEntity from '@Core/Entities/CustomerEntity';

import { TYPE } from '../types';
import CustomerDto from '../Models/CustomerDto';
import PurchasedMovieDto from '../Models/PurchasedMovieDto';
import MovieDto from '../Models/MovieDto';

@controller("/api/customer")
export class CustomersController implements interfaces.Controller{
    private readonly _customerRepo: Repository<CustomerEntity>;
    private readonly _movieRepo: Repository<Movie>
    private readonly _errorMessage: string = "There was an error with your request.";

    public constructor(
        @inject(TYPE.CustomerRepo) customerRepo: Repository<CustomerEntity>,
        @inject(TYPE.MovieRepo) movieRepo: Repository<Movie>
    ) {
        this._customerRepo = customerRepo;
        this._movieRepo = movieRepo;
    }

    @httpGet("/:id")
    public async Get(@requestParam("id") id: number, @response() res: Response): Promise<void> {
        try{

            const customer = await this._customerRepo
                    .createQueryBuilder("customer")
                    //.leftJoinAndSelect("customer._PurchasedMovies", "PurchasedMoviesEntity")
                    .where("customer.CustomerId = :id", { id })
                    .getOne();

            console.log(customer);
            
            if(!customer) 
                return this.errorHandler(res, "Customer not found.");

            var customerDto = new CustomerDto();
            customerDto.Id = customer.CustomerId;
            customerDto.Name = customer.Name.Name;
            customerDto.Email = customer.Email.Address;
            customerDto.MoneySpent = customer.MoneySpent.Amount;
            customerDto.Status = customer.Status.Type;
            customerDto.StatusExpirationDate = customer.Status.ExpirationDate.Date;
            // customerDto.PurchasedMovies = customer.PurchasedMovies.map(x => {
            //     console.log(x);
            //     const pDto = new PurchasedMovieDto();
            //     pDto.Price = x.Price.Amount;
            //     pDto.ExpirationDate = x.ExpirationDate.Date;
            //     pDto.PurchaseDate = x.PurchaseDate;
            //     pDto.Movie = new MovieDto();
            //     pDto.Movie.Id = x.Movie.MovieId;
            //     pDto.Movie.Name = x.Movie.Name;

            //     return pDto;
            // });

            res.status(200).json({ 
                customer: customerDto
            });

        } catch (ex){
            this.errorHandler(res);
            console.log(ex);
        }
    }

    private errorHandler(res: Response, msg?: string){
        res.status(400).json({ error: msg || this._errorMessage });
    }
}