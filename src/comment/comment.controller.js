'use strict';

import Comment from './comment.model.js';

// Agregar un comentario
export const addComment = async (req, res) => {
    try {
        const data = req.body;
        const comment = new Comment(data);
        await comment.save();

        return res.status(201).send({
            success: true,
            message: 'Comentario publicado exitosamente',
            comment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error al publicar el comentario',
            error: error.message
        });
    }
};

// Editar un comentario solo el autor
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        // authorId se usa para validar propiedad
        const { authorId, text } = req.body; 
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).send({ message: 'Comentario no encontrado' });

        if (comment.author.toString() !== authorId) {
            return res.status(403).send({
                success: false,
                message: 'No tienes permiso para editar este comentario'
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id, 
            { text }, 
            { new: true }
        );

        return res.send({
            success: true,
            message: 'Comentario actualizado',
            updatedComment
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// Eliminar un comentario 
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).send({ message: 'Comentario no encontrado' });

        // Validación: Solo el autor puede eliminar
        if (comment.author.toString() !== authorId) {
            return res.status(403).send({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });
        }

        await Comment.findByIdAndDelete(id);
        return res.send({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar',
            error: error.message
        });
    }
};