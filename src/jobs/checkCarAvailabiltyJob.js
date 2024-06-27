// utils/returnCarToAvailability.js
const Car = require('../database/models/Car');

const NOW = new Date();

const byEndDate = async () => {
    const cars = await Car.find({ available: false, availabilityEndDate: { $gt: NOW.getTime() } });
    
    cars.forEach(async (car) => {
        car.available = true;
        car.availabilitySartDate = null;
        car.availabilityEndDate = null;

        await car.save();
    });
};

const byStartDate = async () => {
    const cars = await Car.find({ available: true, availabilityStartDate: { $lt: NOW.getTime() } });
    
    cars.forEach(async (car) => {
        car.available = false;

        await car.save();
    });
};

module.exports = {
    byStartDate,
    byEndDate
}