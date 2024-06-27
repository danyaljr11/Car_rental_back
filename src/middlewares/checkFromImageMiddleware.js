// const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const multer = require('multer');
const randomInts = require('../helpers/generateRandomNumbersToUsernames');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/cars');
    },
    filename: (req, file, cb) => {
        cb(null, randomInts(1, 100000)[0] + Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

module.exports = { upload };