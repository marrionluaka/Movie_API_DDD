import { Container } from 'inversify';
import { TYPES } from './types';


class IoC {
    public container: Container;

    constructor(){
        this.container = new Container();
        this.register();
    }
    
    register(){
        // Not implemented yet...
    }
}

export const container = new IoC().container;