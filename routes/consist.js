let mongoose = require('mongoose');
let Train = require('../models/train');

/**
 * GET /train/cars route to retrieve all the cars in the train
 */
function getConsist(req, res) {
    console.log("Getting consist for train");
    Train.findOne({ "id": req.params.trainId }, (err, train) => {
        if (err) {
            res.send(err);
        } else {
            // No problems, return trains
            res.json(train.consist);
        }
    });
}

/**
 * POST /train/cars to create a new consist with the array of cars passed
 * This will overwrite any existing cars in the consist with the new data
 * @param {String} trainId
 * @param {{initial: String, number: String, sequence: Number, carType: String, class: String, axles: Number, brakes: Number}[]}
 */
function postConsist(req, res) {
  console.log("Posting Consist...");
  Train.findOne({ "id": req.params.trainId }, (err, train) => {
      if (err) {
          res.send(err);
      } else {
          // Found the train, empty the consist first
          train.consist = [];

          // Now add the cars
          let carList = req.body.cars;
          for(let i = 0; i < carList.length; i++) {
            let newCar = carList[i];
            train.consist.push(newCar);
          }

          // Save to database
          train.save((err, newTrain) => {
              if (err) {
                  res.send(err);
              } else {
                  // No problem, send it back
                  res.json({
                      message: "Cars Added to Train!",
                      newTrain
                  });
              }
          });
      }
    });
}


/**
 * DELETE /train/cars to delete cars from the consist that are in the array of cars passed
 * @param [{ initial: String, number: String }, {...}]
 */
function deleteCars(req, res) {
  console.log("Deleting Consist...");
  Train.findOne({ "id": req.params.trainId }, (err, train) => {
      if (err) {
          res.send(err);
      } else {
        // Found the train, now cycle through cars and delete from list
        // For prod implemention, this should be refactored to do a more efficent search or mongo query
        let removeCarList = req.body.cars;
        let currentCarList = train.consist;
        let newConsist = [];
        for(let i=0; i < removeCarList.length; i++) {
          console.log("Checking for car " + removeCarList[i].initial + removeCarList[i].number);
          for(let j=currentCarList.length-1; j >= 0; j--) {
            console.log("Processing car " + currentCarList[j].initial + currentCarList[j].number);
            if((currentCarList[j].initial === removeCarList[i].initial) &&
               (currentCarList[j].number === removeCarList[i].number)) {
                // Found a match, remove
                console.log("Removing: " + currentCarList[j].initial + currentCarList[j].number);
                currentCarList.splice(j,1);
              }
          }
        }
        // Save to database
        train.save((err, newTrain) => {
            if (err) {
                res.send(err);
            } else {
                // No problem, send it back
                res.json({
                    message: "Deleted Cars from train!",
                    newTrain
                });
            }
        });
      }
    });
}

/**
 * PUT /train/cars to add cars to the consist with the array of cars passed
 * @param {String} trainId
 * @param {{initial: String, number: String, sequence: Number, carType: String, class: String, axles: Number, brakes: Number}[]} cars
 */

function addCars(req,res) {
  console.log("Adding Cars...");
  Train.findOne({ "id": req.params.trainId }, (err, train) => {
      if (err) {
          res.send(err);
      } else {
          // Found the train, add the cars
          let carList = req.body.cars;
          console.log("Found train, adding cars: " + carList);
          for(var i = 0; i < carList.length; i++) {
            let newCar = carList[i];
            train.consist.push(newCar);
          }

          // Save to database
          train.save((err, newTrain) => {
              if (err) {
                  res.send(err);
              } else {
                  // No problem, send it back
                  res.json({
                      message: "Cars Added to Train!",
                      newTrain
                  });
              }
          });
      }
    });
}

// Export all the functions
module.exports = {
    getConsist,
    postConsist,
    deleteCars,
    addCars
};
