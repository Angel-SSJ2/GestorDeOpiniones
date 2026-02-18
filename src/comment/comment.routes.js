'use strict';

import { Router } from 'express';
import { addComment, updateComment, deleteComment } from './comment.controller.js';

const api = Router();

// Ruta para agregar comentario a una publicación 
api.post('/add', addComment);

// Ruta para editar un comentario 
api.put('/update/:id', updateComment);

// Ruta para eliminar un comentario 
api.delete('/delete/:id', deleteComment);

export default api;