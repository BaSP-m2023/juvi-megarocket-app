import Joi from 'joi';

export const schema = Joi.object({
  confirmPassword: Joi.string().allow('')
});
