'use strict';
import {Router} from 'express';
import { createUser, login, updateUser } from './user.controller.js';

const api = Router();

// Ruta para el registro de usuario
api.post('/register', createUser);

// Ruta para el inicio de sesión (login)
api.post('/login', login);

// editar usuario
api.put('/edit/:id', updateUser);

export default api;
