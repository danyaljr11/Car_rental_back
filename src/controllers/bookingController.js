const Book = require("../database/models/Book");
const Car = require("../database/models/Car");
const messageSchema = require("../validation/messageValidation");

const handleDateChange = require("../helpers/checkFromDateValue");

const limit = 50;

const createBook = async (req, res) => {
    const { id } = req.params;

    const car = await Car.findById(id);

    if(!car) {
        return res.status(400).send({ state: 'failed', message: 'This car doesnot exist' });
    }

    const { start, end, name, phone } = req.body;

    const data = { start, end, name, phone };

    const { error } = messageSchema.validate(data);

    if(error) {
        return res.status(400).send({ state: 'failed', message: error.details[0].message, error });
    }

    if(!handleDateChange(start).status) {
        return res.status(400).send({ state: 'failed', message: 'Start date must have a date value', error: handleDateChange(start).message });
    }

    if(!handleDateChange(end).status) {
        return res.status(400).send({ state: 'failed', message: 'End date must have a date value', error: handleDateChange(end).message });
    }

    try {
        await Book.create({ start: handleDateChange(start).date, end: handleDateChange(end).date, name, phone, car_id: id });

        return res.status(200).send({ state: 'success', message: 'Created Book successfully'});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Book.findById(id);

        if(!message) {
            return res.status(400).send({ state: 'failed', message: 'This book does not exist'});
        }

        message.read = true;
        await message.save();

        return res.status(200).send({ state: 'success', message: 'Mark book as read successfully'});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllBookings = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Book.countDocuments({});

        const messages = await Book.find({}).skip((page - 1) * limit).limit(limit).lean();

        console.log(messages)

        const response = await Promise.all(messages.map(async (message) => {
            const car = await Car.findById(message.car_id);
            return {...message, car: car };
        }))

        return res.status(200).send({ state: 'success', message: 'Get all bookings successfully', messages: response, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllReadedBookings = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Book.countDocuments({ read: true });

        const messages = await Book.find({ read: true }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get all readed bookings successfully', messages, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showAllNotReadedBookings = async (req, res) => {
    const { page } = req.params;

    try {
        const total = await Book.countDocuments({ read: false });

        const messages = await Book.find({ read: false }).skip((page - 1) * limit).limit(limit);

        return res.status(200).send({ state: 'success', message: 'Get all not readed bookinngs successfully', messages, total});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const showBook = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Book.findById(id);

        if(!message) {
            return res.status(400).send({ state: 'failed', message: 'This book does not exist'});
        }

        return res.status(200).send({ state: 'success', message: 'Get the book successfully', message});
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});
    }
}

const acceptBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await Book.findById(id);

    if(!booking) {
        return res.status(400).send({ state: 'failed', message: 'This booking deos not exist'});
    }

    if (booking.status === 'pending') {
        booking.status = 'accepted';
        await booking.save();

        try {
            await Car.findByIdAndUpdate(booking.car_id, { availabilityStartDate: booking.start, availabilityEndDate: booking.end });
            
            return res.status(200).send({ state: 'success', message: 'Accepted this booking successfully'});            
        } catch (error) {
            return res.status(400).send({ state: 'failed', message: error.message});            
        }
    } else {
        return res.status(400).send({ state: 'failed', message: 'Booking already accepted or rejected'});            
    }
};

const rejectBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await Book.findById(id);

    if(!booking) {
        return res.status(400).send({ state: 'failed', message: 'This booking deos not exist'});
    }

    if (booking.status === 'pending') {
        booking.status = 'rejected';
        await booking.save();

        return res.status(200).send({ state: 'success', message: 'Rejected this booking successfully'});            
    } else {
        return res.status(400).send({ state: 'failed', message: 'Booking already accepted or rejected'});            
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await Book.findById(id);

    if(!booking) {
        return res.status(400).send({ state: 'failed', message: 'This booking deos not exist'});
    }

    try {
        await Book.findByIdAndDelete(id);
        
        return res.status(200).send({ state: 'success', message: 'Deleted this booking successfully'});            
    } catch (error) {
        return res.status(400).send({ state: 'failed', message: error.message});            
    }
}

module.exports = {
    showAllBookings,
    showAllNotReadedBookings,
    showAllReadedBookings,
    showBook,
    createBook,
    markAsRead,
    acceptBooking,
    rejectBooking,
    deleteBooking
}