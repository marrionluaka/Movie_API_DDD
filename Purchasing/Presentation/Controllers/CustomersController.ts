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

import { TYPE } from '../types';

import Movie from '@Core/Entities/MovieEntity';
import CustomerEntity from '@Core/Entities/CustomerEntity';

@controller("/api/customer")
export class CustomersController implements interfaces.Controller{
    private readonly _customerRepo: Repository<CustomerEntity>;
    private readonly _movieRepo: Repository<Movie>

    public constructor(
        @inject(TYPE.CustomerRepo) customerRepo: Repository<CustomerEntity>,
        @inject(TYPE.MovieRepo) movieRepo: Repository<Movie>
    ) {
        this._customerRepo = customerRepo;
        this._movieRepo = movieRepo;
    }

    @httpGet("/")
    public async Get(req: Request, @response() res: Response): Promise<CustomerEntity> {
        return await this._customerRepo.findOne(1);
    }
}