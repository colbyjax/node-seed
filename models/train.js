let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Railcar schema definition
let TrainSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    maxSpeed: {
        type: Number,
        required: false
    },
    route: [{
        milepost: String,
        mneumonic: String,
        arrival: String,
        departure: String,
        status: String,
    }],
    consist: [{
        initial: String,
        number: String,
        sequence: Number,
        carType: String,
        class: String,
        axles: Number,
        brakes: Number
    }]
});

module.exports = mongoose.model('train', TrainSchema);
