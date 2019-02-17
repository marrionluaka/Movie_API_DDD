import { Request, Response } from 'express';
import { inject } from 'inversify';
import { 
    interfaces, 
    controller, 
    httpGet,
    requestParam,
    response
} from "inversify-express-utils";

import { TYPES } from '../types';

@controller("api/customer")
export class CustomersController implements interfaces.Controller{

    public constructor(){
    }

    @httpGet("/:id")
    public async Get(req: Request, @response() res: Response): Promise<void> {
        throw new Error("Not Implemented exception");
    }
}