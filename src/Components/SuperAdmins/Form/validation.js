import Joi from 'joi';

const superAdminsSchema = Joi.object({
  email: Joi.string()
    .regex(
      /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/
    )
    .min(5)
    .messages({
      'string.pattern.base':
        'Email is not valid, muy contain only one @ and a valid domain. You cannot use an email that is already in use'
    })
    .lowercase()
    .required(),
  password: Joi.string()
    .allow('')
    .min(8)
    .max(20)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/)
    .messages({
      'string.pattern.base':
        'Password must contain: at least one number, one letter, and at least 8 characters and cannot contain blank spaces'
    })
    .required()
});

export default superAdminsSchema;
