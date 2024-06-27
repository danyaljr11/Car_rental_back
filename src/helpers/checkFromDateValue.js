const moment = require('moment');

const handleDateChange = (date) => {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
        return { status: true, date: date };
    } else {
        return { status: false, message: 'This date is invalid'};
    }
};

module.exports = handleDateChange