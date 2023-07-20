import Joi from 'joi';

export const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'First name must be only made of letters(it can be a compound Name)'
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'Last name must be only made of letters(it can be a compound Name)'
    })
    .required(),
  dni: Joi.number().min(1000000).max(99999999).integer().required().messages({
    'number.base': 'DNI must be a number',
    'number.integer': 'DNI must be an integer',
    'number.min': 'DNI must be 8 characters long',
    'number.max': 'DNI must be 8 characters long',
    'any.required': 'DNI is required'
  }),
  phone: Joi.number().min(1000000000).max(9999999999).integer().required().messages({
    'number.base': 'Phone must be a number',
    'number.integer': 'Phone must be an integer',
    'number.min': 'Phone must be 10 characters long',
    'number.max': 'Phone must be 10 characters long',
    'any.required': 'Phone is required'
  }),
  email: Joi.string()
    .regex(
      /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/
    )
    .min(5)
    .messages({
      'string.pattern.base': 'Email is not valid, must contain only one @ and a valid domain'
    })
    .lowercase(),
  city: Joi.string()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
    .messages({
      'string.pattern.base':
        'City name must be only made of letters(it can be a compound city name)'
    }),
  password: Joi.string()
    .min(8)
    .max(209)
    .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters and cannot contain blank spaces'
    })
    .allow(''),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .messages({
      'string.pattern.base': 'Passwords must equal!',
      'any.only': 'Passwords do not match. Must be equal!'
    })
    .allow('')
});
