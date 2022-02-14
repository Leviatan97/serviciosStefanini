import {Router} from 'express';
import {controller} from '../controller/controller';

//creame una clase llamada Router
class routes {
    private router: Router;
    private controller: controller;
    constructor() {
        this.router = Router();
        this.controller = new controller();
        this.routes();
    }

    public routes(): void {
        this.router.post('/login', this.controller.login);
        this.router.post('/cuentas', this.controller.cuentas);
        this.router.post('/retirar', this.controller.retirar);
        this.router.post('/transferir', this.controller.transferir);
    }

    public getRouter(): Router {
        return this.router;
    }
}

const routesServer: routes = new routes();
export default routesServer.getRouter();