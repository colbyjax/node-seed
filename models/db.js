var mongoose = require('mongoose');

// Change to whatever IP is serving database
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/library');

// For Docker
mongoose.connect('mongodb://0.0.0.0:27017/library');
