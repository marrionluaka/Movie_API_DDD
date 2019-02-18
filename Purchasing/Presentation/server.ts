import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { Container } from "inversify";
import { InversifyExpressServer } from 'inversify-express-utils';

import './Controllers';

export class App{
    constructor(container: Container){
        this.init(container);
    }

    private init(container: Container): void{
        const server = new InversifyExpressServer(container);

        server
            .setConfig(app => {
                app
                .use(this.useCors)
                .use(bodyParser.urlencoded({ extended: true }))
                .use(bodyParser.json());
            })
            .build()
            .listen(
                4000, 
                () => console.log(`The magic happens on port: ${4000}`)
            );
    }

    private useCors(req: any, res: any, next: any): void{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
}