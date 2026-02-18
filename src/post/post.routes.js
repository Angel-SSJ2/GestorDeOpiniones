'use strict';

import { Router } from 'express';
import { createPost, updatePost, deletePost } from './post.controller.js';

const api = Router();

api.post('/create', createPost);

api.put('/update/:id', updatePost);

api.delete('/delete/:id', deletePost);

export default api;