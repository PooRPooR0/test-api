const Joi = require('joi');

const schema = Joi.object({
	data: Joi.object({
		type: Joi.string().required(),
		attributes: Joi.object({
			name: Joi.string().required(),
			age: Joi.number().integer().min(0).max(100).required(),
		})
	})
})

module.exports = schema
