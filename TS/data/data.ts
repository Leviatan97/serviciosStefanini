import { MysqlError } from 'mysql';
import mysql from 'mysql';

export class Data {
 
    public connection: any;


    constructor() {
        this.connection = this.connect();
    }


    public async connect() {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456789',
            database: 'pruebaStefanini'
        });
        return connection;
    }


    public async disconnect(): Promise<void> {
        await this.connection.end();
    }

    public async execute(query: string, params?: any[]): Promise<any> {
        const con = await this.connect();
        const result = await con.query(query, params);
        return result;
    }
}