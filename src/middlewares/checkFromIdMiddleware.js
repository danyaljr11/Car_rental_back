const { mongoose } = require("mongoose");

const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).send({ state: 'failed', message: 'Id must be exist' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ state: 'failed', message: 'Invalid Id' });
    }
    next();
};

module.exports = validateObjectId;