'use strict';

import { Router } from 'express';
import { addComment, updateComment, deleteComment, getCommentsByPost } from './comment.controller.js';
import { get } from 'mongoose';

const api = Router();

// Ruta para agregar comentario a una publicación 
api.post('/add', addComment);

// Ruta para editar un comentario 
api.put('/update/:id', updateComment);

// Ruta para eliminar un comentario 
api.delete('/delete/:id', deleteComment);

//buscar
api.get('/post/:postId', getCommentsByPost);

export default api;