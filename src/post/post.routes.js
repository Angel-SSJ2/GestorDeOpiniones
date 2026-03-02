'use strict';

import { Router } from 'express';
import { createPost, updatePost, deletePost, getPosts, getPostById } from './post.controller.js';
import { check } from 'express-validator';
import { validateErrors } from '../../middlewares/validate-errors.js';

const api = Router();

api.post(
    '/create',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('content', 'El contenido es obligatorio').not().isEmpty(),
        check('category', 'La categoría es obligatoria').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        validateErrors
    ],
    createPost
);
api.put('/update/:id', updatePost);

api.delete('/delete/:id', deletePost);

api.get('/all', getPosts);

api.get('/:id', getPostById);

export default api;