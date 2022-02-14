import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import {Application} from 'express';
import routes from './routes/routes';

class main {
    private app:Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config():void {
        
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port',this.app.get('port'));
        });
    }

    public routes():void {
        this.app.use(routes);
    }
}

const mainServer: main = new main();