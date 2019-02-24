import { Container, AsyncContainerModule } from 'inversify';
import { TYPE } from './types';
import { Repository } from 'typeorm';
import Customer from '@Core/Customer';
import { getDbConnection } from './dbConn';

class Startup {
    public container: Container;

    constructor(){
        this.container = new Container();
    }
    
    public configureServices(): AsyncContainerModule{
        return new AsyncContainerModule(async (bind) => {
            const conn = await getDbConnection();
            
            bind<Repository<Customer>>(TYPE.CustomerRepo)
                .toDynamicValue(() => conn.getRepository(Customer))
                .inRequestScope();
        });
    }
}

export default new Startup();

