const Joi = require("joi");

const brandSchema = Joi.object().keys({
    name: Joi.string().required(),
    picture: Joi.string().required(),
});

module.exports = brandSchema;
