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
class Data {
    constructor() {
        this.connection = this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield mysql_1.default.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456789',
                database: 'pruebaStefanini'
            });
            return connection;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.end();
        });
    }
    execute(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield this.connect();
            const result = yield con.query(query, params);
            return result;
        });
    }
}
exports.Data = Data;
