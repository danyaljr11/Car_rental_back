
const express = require('express');
const router = express.Router();

// Methods
const requireAuth = require('../middlewares/requireAuth');
const { showBrand, showBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brandController');
const validateObjectId = require('../middlewares/checkFromIdMiddleware');
const { upload, uploadImage, uploadImageWhenUpdate } = require('../middlewares/checkFromImageMiddleware');

// GET
router.get('/', showBrands);

router.get('/:id', validateObjectId, showBrand);


// POST
router.post('/create',  [requireAuth], createBrand);

// PUT
router.put('/update/:id', [requireAuth, validateObjectId] ,updateBrand);

// DELETE   
router.delete('/delete/:id', [requireAuth, validateObjectId] ,deleteBrand);

module.exports = router;