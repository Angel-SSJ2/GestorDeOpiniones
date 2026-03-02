'use strict';
import User from './user.model.js';

// 1. Registro de Usuario
export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        await user.save(); 

        return res.status(201).send({
            success: true, 
            message: 'Usuario creado exitosamente',
            user
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).send({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

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

        // Validación simple de contraseña 
        if (user.password !== password) {
            return res.status(401).send({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Usuario logueado exitosamente',
            user: { 
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

// Editar Perfil
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, ...data } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

        // Para editar  debe ingresar la contraseña 
        if (oldPassword && user.password !== oldPassword) {
            return res.status(400).send({
                success: false,
                message: 'La contraseña anterior no coincide'
            });
        }

        if (newPassword) data.password = newPassword;

        // Actualización de datos 
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

export const getUsers = async (req, res) => {
    try {
        // 1. Intentamos traer todo
        const users = await User.find({}); 
        
        // 2. LOG PARA DEPURAR: Mira tu terminal negra de VS Code
        console.log("Usuarios encontrados en DB:", users);

        // 3. Verificamos si es un arreglo y si tiene algo
        if (!users || users.length === 0) {
            return res.status(404).send({ 
                success: false, 
                message: 'La lista está vacía en la base de datos' 
            });
        }

        // 4. Si hay datos, los enviamos
        return res.send({ 
            success: true, 
            total: users.length, 
            users 
        });
    } catch (error) {
        console.error("Error en getUsers:", error);
        return res.status(500).send({ 
            success: false, 
            error: error.message 
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscamos y eliminamos al usuario por su ID
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({
                success: false,
                message: 'Usuario no encontrado, no se pudo eliminar'
            });
        }

        return res.send({
            success: true,
            message: `Usuario con username '${deletedUser.username}' eliminado exitosamente`
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
};