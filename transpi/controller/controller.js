"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const model_1 = require("../model/model");
class controller {
    constructor() { }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.Model('usuario');
            try {
                const result = yield model.login(req.body.documento);
                if (result.length === 0) {
                    res.status(200).json({
                        message: 'Usuario no encontrado',
                        usuario: false
                    });
                }
                else {
                    if (req.body.contra === result[0].us_contra) {
                        res.status(200).json({
                            message: 'Usuario encontrado',
                            usuario: true
                        });
                    }
                    else {
                        res.status(200).json({
                            message: 'Contraseña incorrecta',
                            usuario: false
                        });
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        });
    }
    cuentas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.Model('usuario');
            try {
                const result = yield model.cuentas(req.body.documento);
                if (result.length === 0) {
                    res.status(200).json({
                        message: 'Usuario no encontrado',
                        usuario: false
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Usuario encontrado',
                        cuentas: result
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        });
    }
    retirar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.Model('cuenta');
            try {
                const cuenta = yield model.consultar(req.body.cuenta);
                if (cuenta[0].cnt_saldo > req.body.monto) {
                    let valor = req.body.monto > 9600000 ? cuenta[0].cnt_saldo - (req.body.monto + ((req.body.monto * 4) / 1000)) : cuenta[0].cnt_saldo - req.body.monto;
                    const result = yield model.retirar(req.body.cuenta, valor);
                    if (result.length === 0) {
                        res.status(200).json({
                            message: 'Cuenta no encontrada',
                            cuenta: false
                        });
                    }
                    else {
                        res.status(200).json({
                            message: 'Retiro realizado',
                            cuenta: true
                        });
                    }
                }
                else {
                    res.status(200).json({
                        message: 'Saldo insuficiente',
                        cuenta: false
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        });
    }
    transferir(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.Model('cuenta');
            try {
                const cuentaRetiro = yield model.consultar(req.body.cuentaRetiro);
                const cuentaTransferencia = yield model.consultar(req.body.cuentaTransferencia);
                console.log(cuentaRetiro);
                console.log(cuentaTransferencia);
                if (cuentaRetiro[0].cnt_saldo > req.body.monto) {
                    console.log("entro");
                    let valor = cuentaRetiro[0].cnt_saldo - (req.body.monto + ((req.body.monto * 4) / 1000));
                    const retiro = yield model.retirar(req.body.cuentaRetiro, valor);
                    if (retiro.length === 0) {
                        res.status(200).json({
                            message: 'Cuenta del retiro no encontrada',
                            cuenta: false
                        });
                    }
                    else {
                        const result = yield model.transferir(req.body.cuentaTransferencia, (req.body.monto + cuentaTransferencia[0].cnt_saldo));
                        if (result.length === 0) {
                            res.status(200).json({
                                message: 'Cuenta que recibe el retiro no encontrada',
                                cuenta: false
                            });
                        }
                        else {
                            res.status(200).json({
                                message: 'Cuenta encontrada',
                                cuenta: true
                            });
                        }
                    }
                }
                else {
                    res.status(200).json({
                        message: 'Saldo insuficiente',
                        cuenta: false
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        });
    }
}
exports.controller = controller;
