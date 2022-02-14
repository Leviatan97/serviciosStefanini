import { Data } from '../data/data';

export class Model {
    public data: Data;
    private table: string;

    constructor(table: string) {
        const data = new Data();
        this.data = data;
        this.table = table;
    }

    public login(us_documento: string): Promise<any> {
        const data = this.data.connect()
        const query = `SELECT * FROM ${this.table} WHERE ${this.table}.us_documento = '${us_documento}'`;
       
        return new Promise(async (resolve,reject)=>{
            (await data).query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    public cuentas(us_documento: string): Promise<any> {
        const data = this.data.connect()
        const query = `SELECT bc.bc_nombre, cnt.cnt_numero, cnt.cnt_saldo FROM usuario us, banco bc, cuenta cnt WHERE us.us_id = cnt.us_id AND bc.bc_id = cnt.bc_id AND us.us_documento = ${us_documento}`;
       
        return new Promise(async (resolve,reject)=>{
            (await data).query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    public retirar(cuenta: number, monto: number): Promise<any> {
        const data = this.data.connect()
        const query = `UPDATE cuenta SET cnt_saldo = ${monto} WHERE cnt_numero = ${cuenta}`;
       
        return new Promise(async (resolve,reject)=>{
            (await data).query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    public transferir(cuenta: number, monto: number): Promise<any> {
        const data = this.data.connect()
        const query = `UPDATE cuenta SET cnt_saldo = ${monto} WHERE cnt_numero = ${cuenta}`;
       
        return new Promise(async (resolve,reject)=>{
            (await data).query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    public consultar(cuenta: number): Promise<any> {
        const data = this.data.connect()
        const query = `SELECT cnt_saldo FROM cuenta WHERE cnt_numero = ${cuenta}`;
       
        return new Promise(async (resolve,reject)=>{
            (await data).query(query,(err,result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }
}