import Startup from './startup';
import { App } from './server';

(async () => {
    await Startup.container.loadAsync(Startup.configureServices());
    const app = new App(Startup.container);
})();
