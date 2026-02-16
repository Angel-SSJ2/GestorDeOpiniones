'use strict';
import Post from './post.model.js';

export const createPost = async (req, res) => {
    try {
        const data = req.body;
        const post = new Post(data);
        await post.save();
        return res.status(201).send({ success: true, message: 'Publicación creada', post });
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Error al crear', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId, ...data } = req.body; 

        const post = await Post.findById(id);
        if (!post) return res.status(404).send({ message: 'Post no encontrado' });

        if (post.author.toString() !== authorId) { 
            return res.status(403).send({ message: 'No puedes editar publicaciones de otros' }); 
        }

        const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
        return res.send({ success: true, updatedPost });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId } = req.body;

        const post = await Post.findById(id);
        if (post.author.toString() !== authorId) { 
            return res.status(403).send({ message: 'No puedes eliminar publicaciones de otros' }); 
        }

        await Post.findByIdAndDelete(id);
        return res.send({ message: 'Publicación eliminada' });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};