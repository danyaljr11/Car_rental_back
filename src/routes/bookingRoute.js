const express = require('express');
const router = express.Router();

// Methods
const {
    showAllBookings,
    showAllNotReadedBookings,
    showAllReadedBookings,
    showBook,
    createBook,
    markAsRead,
    acceptBooking,
    rejectBooking,
    deleteBooking
} = require('../controllers/bookingController');

const requireAuth = require('../middlewares/requireAuth');
const validatePageParameter = require('../middlewares/checkFromPageKeyMiddleware');
const validateObjectId = require('../middlewares/checkFromIdMiddleware');

// GET
router.get('/page/:page', [requireAuth, validatePageParameter], showAllBookings)

router.get('/read/page/:page', [requireAuth, validatePageParameter], showAllReadedBookings)

router.get('/not-read/page/:page', [requireAuth, validatePageParameter], showAllNotReadedBookings)

router.get('/:id', [requireAuth, validateObjectId], showBook)

// POST
router.post('/create/:id', validateObjectId,  createBook);

// PUT
router.put('/mark-as-read/:id', [requireAuth, validateObjectId], markAsRead);

router.put('/accept/:id',  [requireAuth, validateObjectId], acceptBooking);

router.put('/reject/:id',  [requireAuth, validateObjectId], rejectBooking);

// DELETE 
router.delete('/delete/:id',  [requireAuth, validateObjectId], deleteBooking);

module.exports = router;