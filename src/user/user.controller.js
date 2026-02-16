'use strict';
import User from './user.model.js';

// 1. Registro de Usuario
export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save(); 

        return res.status(201).send({
            success: true, // Corregido: era 'succes'
            message: 'Usuario creado exitosamente',
            user
        });
    } catch (error) {
        console.error(error); // Corregido: era 'err'
        return res.status(500).send({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

// 2. Inicio de Sesión (Login)
export const login = async (req, res) => {
    try {
        const { credential, password } = req.body;
        
        // El login debe ser por correo o nombre de usuario 
        const user = await User.findOne({
            $or: [
                { email: credential },
                { username: credential }
            ]
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Validación simple de contraseña (siguiendo tu lógica sin seguridad compleja)
        if (user.password !== password) {
            return res.status(401).send({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Usuario logueado exitosamente',
            user: { // Corregido: Sintaxis de objeto
                id: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

// 3. Editar Perfil
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, ...data } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

        // Para editar perfil, debe ingresar la anterior contraseña 
        if (oldPassword && user.password !== oldPassword) {
            return res.status(400).send({
                success: false,
                message: 'La contraseña anterior no coincide'
            });
        }

        if (newPassword) data.password = newPassword;

        // Actualización de datos (nombre de usuario, perfil, etc.) 
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).send({
            success: true,
            message: 'Perfil actualizado exitosamente',
            updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
};