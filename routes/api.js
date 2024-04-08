const express = require('express');
const router = express.Router();
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
const JSONAPIError = require('jsonapi-serializer').Error;
const CatSchema = require('../schemas/Cat');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument));

router.post('/cat', (req, res) => {
	try {
		const { error } =CatSchema.validate(req.body, {convert: false})

		if (error) {
			const details = error.details[0]

			res.json(new JSONAPIError({
				status: 422,
				title: 'Validation Error',
				detail: details.message,
				source: {
					pointer: `/${details.path.join('/')}`
				}
			})).status(422)
			return
		}

		const deserializer = new JSONAPIDeserializer();

		deserializer.deserialize(req.body, (err, cat) => {
			res.json({
				success: true,
			})
		})
	} catch (error) {
		res.json(new JSONAPIError({
			title: error.name,
			status: 500,
			detail: error.message
		})).status(500)
	}
})

module.exports = router;
