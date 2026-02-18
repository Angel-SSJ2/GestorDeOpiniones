import App from './configs/app.js';

import { config } from 'dotenv';
config();

const server = new App();
server.listen();