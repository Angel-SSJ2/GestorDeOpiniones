'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    maxLength: [50, 'Ingrese su nombre, no puede ser mayor a 50 caracteres']
  },

  surname:{
    type: String,
    required: true,
    trim: true,
    maxLength: [50, 'Ingrese su apellido, no puede ser mayor a 50 caracteres']
  },

  username:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: [20, 'Ingrese su nombre de usuario, no puede ser mayor a 20 caracteres']
  },

  email:{
    type: String,
    required: [ true, 'Ingrese su correo electrónico' ],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Ingrese un correo electrónico válido']
  },

  phone:{
    type: String,
    required: true,
    trim: true,
    maxLength: [9, 'Ingrese su número de teléfono (0000-0000)']
  },

  password:{
    type: String,
    required: true,
    trim: true,
    minLength: [6, 'Ingrese una contraseña, debe tener al menos 6 caracteres']
  },

  status:{
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true

});
export default mongoose.model('User', userSchema);