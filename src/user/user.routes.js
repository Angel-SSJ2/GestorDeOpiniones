'use strict';

import { application, Router } from 'express';
import { check } from 'express-validator'; 
import { createUser, login, updateUser, getUsers, deleteUser } from './user.controller.js';
import { validateErrors } from '../../middlewares/validate-errors.js';

const api = Router();

api.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validateErrors 
    ],
    createUser
); 

// Ruta para el inicio de sesión 
api.post(
    '/login', 
    [
        check('username', 'El username es necesario').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateErrors
    ],
    login
);

// Editar usuario
api.put('/edit/:id', updateUser);

// Ruta para obtener usuarios
api.get('/all', getUsers);


api.delete('/delete/:id', deleteUser);
export default api;