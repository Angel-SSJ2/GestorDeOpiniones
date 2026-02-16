'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        //------------------------------
        //        Monitoreo
        //------------------------------

        mongoose.connection.on('error', () => {
            console.log('MongoDB | no se puede conectar a MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar a MongoDB');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectado a MongoDB');
        });

        mongoose.connection.on('open', () => {
            // Actualizado para reflejar el nombre del nuevo proyecto
            console.log('MongoDB | conexión a la base de datos: Gestor de Opiniones');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectado a MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | desconectado de MongoDB');
        });

        // Conexión a la base de datos usando la variable de entorno
        await mongoose.connect(process.env.URL_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

    } catch (error) {
        console.log(`Error al conectar la db: ${error}`);
        process.exit(1);
    }
};

//-------------------------------
//      Cierre Controlado
//-------------------------------
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing database connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed successfully.');
        process.exit(0); // salida exitosa
    } catch (error) {
        console.error('MongoDB | Error during graceful shutdown:', error.message);
        process.exit(1); // salida con error
    }
};

// Manejadores de señales para cierre controlado
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'));