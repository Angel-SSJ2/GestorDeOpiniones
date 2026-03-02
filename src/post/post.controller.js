'use strict';
import Post from './post.model.js';
import Comment from '../comment/comment.model.js';

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
    if (!post) return res.status(404).send({ message: 'Post no encontrado' });
        if (post.author.toString() !== authorId) { 
            return res.status(403).send({ message: 'No puedes eliminar publicaciones de otros' }); 
        }

        await Post.findByIdAndDelete(id);
        return res.send({ message: 'Publicación eliminada' });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        // Obtenemos todos los posts
        const posts = await Post.find().populate('author', 'username email');

        // Por cada post, buscamos sus comentarios correspondientes
        const postsWithComments = await Promise.all(posts.map(async (post) => {
            const comments = await Comment.find({ post: post._id }).populate('author', 'username');
                 
            //Convertimos el documento de Mongoose a objeto plano
            return {
                ...post.toObject(),
                comments: comments.length > 0 ? comments : "Aún no hay comentarios para esta publicación"
            };
        }));

        return res.send({ 
            success: true, 
            total: postsWithComments.length, 
            posts: postsWithComments 
        });

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'username email');
        if (!post) return res.status(404).send({ message: 'Post no encontrado' });
        
        const comments = await Comment.find({ post: id }).populate('author', 'username');

        return res.send({ 
            success: true, 
            post, 
            comments: comments.length > 0 ? comments : "Aún no hay comentarios para esta publicación"
        });

    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }   
};