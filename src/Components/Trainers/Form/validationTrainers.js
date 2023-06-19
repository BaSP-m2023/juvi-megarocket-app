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
  email: Joi.string()
    .min(10)
    .max(25)
    .regex(
      /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/
    )
    .messages({
      'string.pattern.base': 'Email is not valid, must contain only one @ and a valid domain'
    })
    .lowercase()
    .required(),
  city: Joi.string()
    .min(5)
    .max(15)
    .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
    .messages({
      'string.pattern.base':
        'City name must be only made of letters(it can be a compound city name)'
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(15)
    .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters and cannot contain blank spaces'
    })
    .required(),
  salary: Joi.number().min(6).max(15).required()
});
export default trainersSchema;
