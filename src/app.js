const express = require('express');
const logger = require('morgan')
const cors = require('cors')
const path = require('path');

// Routes
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const carRouter = require('./routes/carRoute');
const brandRouter = require('./routes/brandRoute');
const { upload } = require('./middlewares/checkFromImageMiddleware');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5500', 'http://localhost:3000','http://localhost:3001']
};

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));
app.use('/uploads', express.static('src/uploads'));

const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'webp'];

app.post('/api/uploads', upload.array('pictures'), async (req,res) => {
    const files = req.files;

    if(!files) {
        return res.status(400).json({ state: "failed", message: "You must select a files as pictures" })        
    }

    if(files.length <= 0) {
        return res.status(400).json({ state: "failed", message: "You must insert files" });
    }

    files.forEach((file) => {
        const fileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
    
        if (!array_of_allowed_files.includes(fileExtension)) {
            return res.status(400).json({ state: "failed", message: "Invalid file type" });
        }
    
        if (!file.mimetype.startsWith('image/')) {
            return res.status(400).json({ state: "failed", message: "Invalid image file" });
        }
    });

    return res.status(200).json({ state: "success", message:'Uploaded files successfully', files});
});

app.use('/api/users',userRouter);
app.use('/api/cars',carRouter);
app.use('/api/bookings',bookingRouter);
app.use('/api/brands',brandRouter);

module.exports = app;