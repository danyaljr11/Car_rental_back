const Joi = require("joi");

const messageSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
});

module.exports = messageSchema;
