import { Container, AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';

import { TYPE } from './types';
import { getDbConnection } from './dbConn';

import Movie from '@Core/Entities/MovieEntity';
import CustomerEntity from '@Core/Entities/CustomerEntity';

class Startup {
    public container: Container;

    constructor(){
        this.container = new Container();
    }
    
    public configureServices(): AsyncContainerModule{
        return new AsyncContainerModule(async (bind) => {
            const conn = await getDbConnection();
            
            bind<Repository<CustomerEntity>>(TYPE.CustomerRepo)
                .toDynamicValue(() => conn.getRepository(CustomerEntity))
                .inRequestScope();

            bind<Repository<Movie>>(TYPE.MovieRepo)
                .toDynamicValue(() => conn.getRepository(Movie))
                .inRequestScope();
        });
    }
}

export default new Startup();

