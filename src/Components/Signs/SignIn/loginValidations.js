import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/
    )
    .min(5)
    .messages({
      'string.pattern.base': 'Email is not valid, must contain only one @ and a valid domain'
    })
    .lowercase()
    .required(),
  password: Joi.string()
    .min(8)
    .max(200)
    .regex(/^(?!.*\s)[A-Za-z\d!@#$%^&*]+$/)
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters and cannot contain blank spaces'
    })
    .required()
});
