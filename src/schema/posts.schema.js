/* import Joi from 'joi';

export const postSolicitudUsuario = Joi.object({
    nombre: Joi.string().required(),
    primer_apellido: Joi.string().required(),
    segundo_apellido: Joi.string().optional(),
    celular: Joi.string().required(),
    correo_electronico: Joi.string().email(),
    canal: Joi.number().required(),
    usuario: Joi.string().required(),
    clave: Joi.string().required(),
    convenio: Joi.string().required(),
    origen_solicitud: Joi.string().required(),
    modulos: Joi.string().required(),
    // numero_instrumento: Joi.string().required().regex(new RegExp("^[\\d]*$")).messages({
    //     'string.pattern.base':'Solo acepta numeros'
    // })
}); */