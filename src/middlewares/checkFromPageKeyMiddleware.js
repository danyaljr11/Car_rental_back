const validatePageParameter = (req, res, next) => {
    let { page } = req.params || 1;

    page = Number.parseInt(page, 10);

    if(typeof page !== 'number') {
        return res.status(400).send({ state: 'failed', message: 'Page must be a number' });        
    }

    if (isNaN(page) || page <= 0) {
        return res.status(400).send({ state: 'failed', message: 'Page must be a positive number' });        
    }

    next();
};

module.exports = validatePageParameter;