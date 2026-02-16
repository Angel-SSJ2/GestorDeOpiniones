'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';  
import userRoutes from '../src/user/user.routes.js';

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.middlewares();
        this.connectDb();
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares() {
        
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json()); 
        this.app.use(cors()); 
        this.app.use(helmet()); 
        this.app.use(morgan('dev')); 
    }

    routes() {
        
        this.app.use('/user', userRoutes);
                
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default App;