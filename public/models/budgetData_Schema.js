const mongoose = require('mongoose');

const hexValidator = (color) => {
    // if the value starts with # and has 6 subsequent vals, it is hex
    if (color.indexOf('#') == 0 && color.length == 7) {
        return true;
    }
    // otherwise not hex
    return false;
};

const budgetDataSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: hexValidator,
            message: 'Not a valid hex code!',
        },
    }
}, { collection: 'budgetData' });

module.exports = mongoose.model('budgetData', budgetDataSchema);