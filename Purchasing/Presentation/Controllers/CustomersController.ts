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

import { Customer } from '../../Core/Customer';

@controller("/api/customer")
export class CustomersController implements interfaces.Controller{
    private readonly _customerRepo: Repository<Customer>;

    public constructor( @inject(TYPE.CustomerRepo) customerRepo: Repository<Customer>) {
        this._customerRepo = customerRepo;
    }

    @httpGet("/")
    public async Get(req: Request, @response() res: Response): Promise<Customer> {
        return await this._customerRepo.findOne(1);
    }
}