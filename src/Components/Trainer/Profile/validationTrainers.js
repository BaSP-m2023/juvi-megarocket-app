import Joi from 'joi';

const trainersSchema = Joi.object({
  firstName: Joi.string()
    .min(4)
    .max(10)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'First name must be only made of letters(it can be a compound Name)'
    })
    .required(),
  lastName: Joi.string()
    .min(5)
    .max(15)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'Last name must be only made of letters(it can be a compound Name)'
    })
    .required(),
  dni: Joi.number().min(1000000).max(99999999).integer().required(),
  phone: Joi.number().min(1000000000).max(9999999999).integer().required(),
  city: Joi.string()
    .min(5)
    .max(15)
    .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
    .messages({
      'string.pattern.base':
        'City name must be only made of letters(it can be a compound city name)'
    })
    .required(),
  salary: Joi.number().min(100000).max(9999999).required()
});
export default trainersSchema;
