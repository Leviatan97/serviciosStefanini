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
exports.Model = void 0;
const data_1 = require("../data/data");
class Model {
    constructor(table) {
        const data = new data_1.Data();
        this.data = data;
        this.table = table;
    }
    login(us_documento) {
        const data = this.data.connect();
        const query = `SELECT * FROM ${this.table} WHERE ${this.table}.us_documento = '${us_documento}'`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (yield data).query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }));
    }
    cuentas(us_documento) {
        const data = this.data.connect();
        const query = `SELECT bc.bc_nombre, cnt.cnt_numero, cnt.cnt_saldo FROM usuario us, banco bc, cuenta cnt WHERE us.us_id = cnt.us_id AND bc.bc_id = cnt.bc_id AND us.us_documento = ${us_documento}`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (yield data).query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }));
    }
    retirar(cuenta, monto) {
        const data = this.data.connect();
        const query = `UPDATE cuenta SET cnt_saldo = ${monto} WHERE cnt_numero = ${cuenta}`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (yield data).query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }));
    }
    transferir(cuenta, monto) {
        const data = this.data.connect();
        const query = `UPDATE cuenta SET cnt_saldo = ${monto} WHERE cnt_numero = ${cuenta}`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (yield data).query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }));
    }
    consultar(cuenta) {
        const data = this.data.connect();
        const query = `SELECT cnt_saldo FROM cuenta WHERE cnt_numero = ${cuenta}`;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            (yield data).query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }));
    }
}
exports.Model = Model;
