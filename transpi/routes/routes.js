"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller/controller");
//creame una clase llamada Router
class routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new controller_1.controller();
        this.routes();
    }
    routes() {
        this.router.post('/login', this.controller.login);
        this.router.post('/cuentas', this.controller.cuentas);
        this.router.post('/retirar', this.controller.retirar);
        this.router.post('/transferir', this.controller.transferir);
    }
    getRouter() {
        return this.router;
    }
}
const routesServer = new routes();
exports.default = routesServer.getRouter();
