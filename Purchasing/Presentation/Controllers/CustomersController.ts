import { Request, Response } from 'express';
import { inject } from 'inversify';
import { 
    interfaces, 
    controller, 
    httpGet,
    httpPost,
    requestParam,
    response
} from "inversify-express-utils";
import { Repository } from 'typeorm';

import Movie from '@Core/Entities/MovieEntity';
import CustomerEntity from '@Core/Entities/CustomerEntity';

import { TYPE } from '../types';
import CustomerDto from '../Models/CustomerDto';
import CustomerName from '@Core/ValueObjects/CustomerName';
import Email from '@Core/ValueObjects/Email';

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

    @httpGet('/')
    public async GetList(_: Request, res: Response): Promise<void> {
        try {
            const customers = await this._customerRepo.find();

            if(!customers.length) 
                return this.errorHandler(res, "No customers were found.");

            res.status(200).json({
                customers:customers.map(c => {
                    return {
                        id: c.CustomerId,
                        name: c.Name.Name,
                        email: c.Email.Address,
                        moneySpent: c.MoneySpent.Amount,
                        status: c.Status.Type,
                        statusExpirationDate: c.Status.ExpirationDate.Date
                    };
                })
            });

        } catch(e) {
            this.errorHandler(res);
            console.log(e);
        }
    } 

    @httpGet("/:id")
    public async Get(@requestParam("id") id: string, @response() res: Response): Promise<void> {
        try {
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

        } catch (ex) {
            this.errorHandler(res);
            console.log(ex);
        }
    }

    @httpPost("/")
    public async Create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        const customerNameOrError = CustomerName.Create(name);
        const emailOrError = Email.Create(email);

        if([customerNameOrError, emailOrError].some(r => r.IsFailure))
            return res.status(400).json({
                error: 'Bad Request: Invalid email or name provided'
            })

        const emaiExists = await this._customerRepo.query("SELECT email FROM customer WHERE customer.email = $1", [email]);

        if(emaiExists.length)
            return res.status(400).json({
                error: `Bad Request: The email ${email} already exists`
            })

        await this._customerRepo.insert(CustomerEntity.Create(
            customerNameOrError.Value,
            emailOrError.Value
        ));

        res.status(200).json({
            success: 'Customer successfully added!'
        });
    }

    private errorHandler(res: Response, msg?: string){
        res.status(400).json({ error: msg || this._errorMessage });
    }
}