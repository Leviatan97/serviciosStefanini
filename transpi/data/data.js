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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const mysql_1 = __importDefault(require("mysql"));
// creame una clase llamada data
class Data {
    // creamos un constructor
    constructor() {
        // conectamos a la base de datos
        this.connection = this.connect();
    }
    // creamos un metodo llamado connect
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            // creamos una variable llamada connection
            const connection = yield mysql_1.default.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456789',
                database: 'pruebaStefanini'
            });
            // guardamos la conexion en la propiedad connection
            return connection;
        });
    }
    // creamos un metodo llamado disconnect
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            // cerramos la conexion
            yield this.connection.end();
        });
    }
    // creamos un metodo llamado execute
    execute(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield this.connect();
            // creamos una variable llamada result
            const result = yield con.query(query, params);
            // retornamos el resultado
            return result;
        });
    }
}
exports.Data = Data;
