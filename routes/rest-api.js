// Define Required Modules
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let fs = require('fs');
let seed = require('../models/seed.json');
let train = require('./trains');
let consist = require('./consist');

// TODO:
// Add Tests for Services
// Add Timestamps

// Configure the app to use body parser
router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

// route middleware that will happen on every request
router.use((req, res, next) => {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next();
});

// Our first route, a nice little test
// Browse to http://localhost:4000/api/test
router.get('/test', (req, res) => res.json({
    message: "Skynet Self-Aware, dispatching T-800"
}));


// CONSIST ROUTES
router.route("/train/:trainId/consist")
    .get(consist.getConsist)
    .post(consist.postConsist)
    .put(consist.addCars)
    .delete(consist.deleteCars);

// TRAIN ROUTES
router.route("/train/clear")
    .get(train.clearTrains);
router.route("/train/seed")
    .get(train.seedTrains);
router.route("/train/:id")
    .get(train.getTrain)
    .delete(train.deleteTrain)
    .put(train.updateTrain);
router.route("/train")
    .get(train.getTrains)
    .post(train.postTrain);


module.exports = router;
