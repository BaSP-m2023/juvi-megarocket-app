import Joi from 'joi';

const classesSchema = Joi.object({
  day: Joi.string()
    .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
    .required(),
  hour: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  trainer: Joi.string()
    .messages({
      invalid: 'The Trainer id must be a valid ObjectId'
    })
    .required(),
  activity: Joi.string()
    .messages({
      invalid: 'The Activity id must be a valid ObjectId'
    })
    .required(),
  slots: Joi.number().min(0).max(30).integer().required()
});
export default classesSchema;
