const Joi = require('joi');

const createSchema = Joi.object({
    titulo: Joi.string().required().messages({
        'any.required': 'El titulo de la publicacion es obligatorio',
        'string.empty': 'El titulo de la publicacion no puede estar vacío',
    }),
    descripcion: Joi.string().required().messages({
        'any.required': 'La descripcion de la publicacion es obligatoria',
        'string.empty': 'La descripcion de la publicacion no puede estar vacía',
    }),
    producto_id: Joi.number().required().messages({
        'any.required': 'El ID del producto es obligatorio'
    }),
});

module.exports = { createSchema };