const Joi = require("joi");

const carSchema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    pictures: Joi.array().items(Joi.string()).required(),
    color: Joi.string().required(),
    price_dayly: Joi.string().required(),
    price_weekly: Joi.string().required(),
    price_monthly: Joi.string().required(),
    description_AR: Joi.string().required(),
    description_EN: Joi.string().required(),
    horse: Joi.string().required(),
    model: Joi.string().required(),
    seat_number: Joi.number().required(),
    top_speed: Joi.string().required(),
    gear: Joi.string().required(),
});

module.exports = carSchema;
