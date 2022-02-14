//importame las funciones de request, response, nextFunction y application de express
import {Request,Response,NextFunction,Application} from 'express';
import {Model} from '../model/model';

export class controller {

    constructor() {}

    public async login(req:Request, res:Response, next:NextFunction): Promise<any> {
        const model = new Model('usuario');
        try {
            const result = await model.login(req.body.documento);
            if (result.length === 0) {
                res.status(200).json({
                    message: 'Usuario no encontrado',
                    usuario: false
                });
            } else {
                if (req.body.contra === result[0].us_contra) {
                    res.status(200).json({
                        message: 'Usuario encontrado',
                        usuario: true
                    });
                } else {
                    res.status(200).json({
                        message: 'Contraseña incorrecta',
                        usuario: false
                    });
                }
            }

        } catch (error) {

            res.status(500).json({
                error : error
            })

        }
        
    }

    public async cuentas(req:Request, res:Response, next:NextFunction): Promise<any> {
        const model = new Model('usuario');
        try {
            const result = await model.cuentas(req.body.documento);
            if (result.length === 0) {
                res.status(200).json({
                    message: 'Usuario no encontrado',
                    usuario: false
                });
            } else {
                res.status(200).json({
                    message: 'Usuario encontrado',
                    cuentas: result
                });
            }

        } catch (error) {

            res.status(500).json({
                error : error
            })

        }
        
    }

    public async retirar(req:Request, res:Response, next:NextFunction): Promise<any> {
        const model = new Model('cuenta');
        try {
            const cuenta = await model.consultar(req.body.cuenta);
            if (cuenta[0].cnt_saldo > req.body.monto) {
                let valor: number = req.body.monto > 9600000 ? cuenta[0].cnt_saldo - (req.body.monto + ((req.body.monto * 4) / 1000)) : cuenta[0].cnt_saldo - req.body.monto;
                const result = await model.retirar(
                    req.body.cuenta,
                    valor
                );
                if (result.length === 0) {
                    res.status(200).json({
                        message: 'Cuenta no encontrada',
                        cuenta: false
                    });
                } else {
                    res.status(200).json({
                        message: 'Retiro realizado',
                        cuenta: true
                    });
                }
            } else {
                res.status(200).json({
                    message: 'Saldo insuficiente',
                    cuenta: false
                });
            }

        } catch (error) {

            res.status(500).json({
                error : error
            })

        }
        
    }

    public async transferir(req:Request, res:Response, next:NextFunction): Promise<any> {
        const model = new Model('cuenta');     
        try {
            const cuentaRetiro = await model.consultar(req.body.cuentaRetiro);
            const cuentaTransferencia = await model.consultar(req.body.cuentaTransferencia);
            console.log(cuentaRetiro);
            console.log(cuentaTransferencia);
            
            if (cuentaRetiro[0].cnt_saldo > req.body.monto) {
                console.log("entro");
                
                let valor: number = cuentaRetiro[0].cnt_saldo - (req.body.monto + ((req.body.monto * 4) / 1000));
                const retiro = await model.retirar(
                    req.body.cuentaRetiro,
                    valor
                );                
                if (retiro.length === 0) {
                    res.status(200).json({
                        message: 'Cuenta del retiro no encontrada',
                        cuenta: false
                    });
                } else {
                    const result = await model.transferir(req.body.cuentaTransferencia,(req.body.monto + cuentaTransferencia[0].cnt_saldo));
                    if (result.length === 0) {
                        res.status(200).json({
                            message: 'Cuenta que recibe el retiro no encontrada',
                            cuenta: false
                        });
                    } else {
                        res.status(200).json({
                            message: 'Cuenta encontrada',
                            cuenta: true
                        });
                    }
                }
            } else {
                res.status(200).json({
                    message: 'Saldo insuficiente',
                    cuenta: false
                });
            }

        } catch (error) {

            res.status(500).json({
                error : error
            })

        }
        
    }
}