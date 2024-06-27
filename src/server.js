require('dotenv').config();

const app = require('./app');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
const MONGO_URI = process.env.MONGO_URI;

const HOUR = 3600000;

// Jobs
const { byStartDate, byEndDate } = require('./jobs/checkCarAvailabiltyJob');

setInterval(byStartDate, HOUR); // 1 day
setInterval(byEndDate, HOUR); // 1 day

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
