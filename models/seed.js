var mongoose = require('mongoose');
var seedSchema = new mongoose.Schema({
    id: String,
    name: String,
    harvest: Number,
    
});

mongoose.model('Seed', seedSchema);