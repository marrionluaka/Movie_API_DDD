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
    public async Get(@requestParam("id") id: string, @response() res: Response): Promise<void> {
        try{
            let customer = await this._customerRepo.findOne({ 
                where: { CustomerId: id }, 
                relations: ['PurchasedMovies', 'PurchasedMovies.Movie'] 
            });
            
            if(!customer) 
                return this.errorHandler(res, "Customer not found.");

            const customerDto = new CustomerDto(customer);

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