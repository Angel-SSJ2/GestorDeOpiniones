'use strict';
import { Schema, model } from 'mongoose';

const postSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'], 
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'], 
        trim: true
    },
    content: {
        type: String,
        required: [true, 'El texto principal es obligatorio'], 
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default model('Post', postSchema);