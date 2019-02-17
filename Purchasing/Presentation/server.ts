import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from './IoC';
import './Controllers';

export class App{
    constructor(){
        this.init();
    }

    private init(): void{
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

const app = new App();