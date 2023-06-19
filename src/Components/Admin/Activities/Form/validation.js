import Joi from 'joi';

const activitiesSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(10).max(120).required()
});
export default activitiesSchema;
