const express = require('express');
const router = express.Router();

// Methods
const { createCar, updateCar, deleteCar, showCar, showCars, showCarsByName, showCarsByCategory, showCarsBySpeed, showCarsByHorse, showCarsByModel, showCarsByPrice, showCarsBySeatNumber, showBrands, showCategories, showCarsByGeneralFilter, showCarsByColor, showCarsByGear, showCarsByBrand, showNotAvailableCars, showAvailableCars, makeCarAvailable, makeCarNotAvailable } = require('../controllers/carController');

// Middlewares
const requireAuth = require('../middlewares/requireAuth');
const validateObjectId = require('../middlewares/checkFromIdMiddleware');
const validatePageParameter = require('../middlewares/checkFromPageKeyMiddleware');
const { upload, uploadImage, uploadImageWhenUpdate } = require('../middlewares/checkFromImageMiddleware');

// Routes

// GET
router.get('/page/:page', validatePageParameter, showCars);

router.get('/brands/:language',showBrands);

router.get('/available/page/:page', validatePageParameter, showAvailableCars);

router.get('/not-available/page/:page', [requireAuth ,validatePageParameter], showNotAvailableCars);

router.get('/categories/:language',showCategories);

router.get('/:id', validateObjectId ,showCar);

router.get('/general-filter/:text/page/:page', validatePageParameter ,showCarsByGeneralFilter);

router.get('/by-name/:name/page/:page', validatePageParameter ,showCarsByName);

router.get('/by-brand/:brand/page/:page', validatePageParameter ,showCarsByBrand);

router.get('/by-category/:category/page/:page', validatePageParameter ,showCarsByCategory);

router.get('/by-speed/:speed/page/:page', validatePageParameter ,showCarsBySpeed);

router.get('/by-horse/:horse/page/:page', validatePageParameter ,showCarsByHorse);

router.get('/by-model/:model/page/:page', validatePageParameter ,showCarsByModel);

router.get('/by-price/:price/page/:page', validatePageParameter ,showCarsByPrice);

router.get('/by-seat/:seatNumber/page/:page', validatePageParameter ,showCarsBySeatNumber);

router.get('/by-gear/:gear/page/:page', validatePageParameter ,showCarsByGear);

router.get('/by-color/:color/page/:page', validatePageParameter ,showCarsByColor);

// POST
router.post('/create', [requireAuth] ,createCar);

// PUT
router.put('/update/:id', [validateObjectId ,requireAuth] ,updateCar);

router.put('/make-available/:id', [validateObjectId ,requireAuth] ,makeCarAvailable);

router.put('/make-not-available/:id', [validateObjectId ,requireAuth] ,makeCarNotAvailable);

// DELETE
router.delete('/delete/:id', [validateObjectId ,requireAuth] ,deleteCar);

module.exports = router;