import Joi from 'joi';
const classesSchema = Joi.object({
  day: Joi.string().valid('Monday', 'Wednesday', 'Friday').required(),
  hour: Joi.required(),
  trainer: Joi.string().required(),
  activity: Joi.string().required(),
  slots: Joi.number().required()
});
export default classesSchema;
