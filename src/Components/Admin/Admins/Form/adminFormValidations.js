import Joi from 'joi';

export const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'First name must be only made of letters (it can be a compound Name)',
      'any.required': 'First name is required'
    })
    .label('First Name')
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/)
    .messages({
      'string.pattern.base': 'Last name must be only made of letters (it can be a compound Name)',
      'any.required': 'Last name is required'
    })
    .label('Last Name')
    .required(),
  dni: Joi.number()
    .min(1000000)
    .max(99999999)
    .integer()
    .messages({
      'number.base': 'DNI must be a number',
      'number.min': 'DNI must be at least 7 digits',
      'number.max': 'DNI can have a maximum of 8 digits',
      'number.integer': 'DNI must be an integer',
      'any.required': 'DNI is required'
    })
    .label('DNI')
    .required(),
  phone: Joi.number()
    .min(1000000000)
    .max(9999999999)
    .integer()
    .messages({
      'number.base': 'Phone must be a number',
      'number.min': 'Phone must be at least 10 digits',
      'number.max': 'Phone can have a maximum of 10 digits',
      'number.integer': 'Phone must be an integer',
      'any.required': 'Phone is required'
    })
    .label('Phone')
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.min': 'Email must be at least 5 characters',
      'any.required': 'Email is required'
    })
    .label('Email')
    .required(),
  city: Joi.string()
    .min(2)
    .max(20)
    .regex(/^[a-zA-Z]+(?:[\s-][A-Za-z]+)*$/)
    .messages({
      'string.pattern.base':
        'City name must be only made of letters (it can be a compound city name)',
      'any.required': 'City is required'
    })
    .label('City')
    .required(),
  birthDate: Joi.date()
    .messages({
      'date.base': 'Birth date must be a valid date',
      'any.required': 'Birth date is required'
    })
    .label('Birth Date')
    .required(),
  postalCode: Joi.number()
    .max(9999)
    .messages({
      'number.base': 'Postal code must be a number',
      'number.max': 'Postal code can have a maximum of 4 digits',
      'any.required': 'Postal code is required'
    })
    .label('Postal Code')
    .required(),
  memberships: Joi.string()
    .valid('Black', 'Classic', 'Only Classes')
    .default('Classic')
    .messages({
      'any.only': 'Membership must be one of: Black, Classic, Only Classes',
      'any.required': 'Membership is required'
    })
    .label('Memberships')
    .required(),
  password: Joi.string()
    .min(8)
    .max(209)
    .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters and cannot contain blank spaces',
      'any.required': 'Password is required'
    })
    .label('Password')
    .required()
});
