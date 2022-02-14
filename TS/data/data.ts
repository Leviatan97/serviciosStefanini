import { MysqlError } from 'mysql';
import mysql from 'mysql';

// creame una clase llamada data
export class Data {
    // creamos una propiedad llamada connection
    public connection: any;

    // creamos un constructor
    constructor() {
        // conectamos a la base de datos
        this.connection = this.connect();
    }

    // creamos un metodo llamado connect
    public async connect() {
        // creamos una variable llamada connection
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456789',
            database: 'pruebaStefanini'
        });
        // guardamos la conexion en la propiedad connection
        return connection;
    }

    // creamos un metodo llamado disconnect
    public async disconnect(): Promise<void> {
        // cerramos la conexion
        await this.connection.end();
    }

    // creamos un metodo llamado execute
    public async execute(query: string, params?: any[]): Promise<any> {
        const con = await this.connect();
        // creamos una variable llamada result
        const result = await con.query(query, params);
        // retornamos el resultado
        return result;
    }
}