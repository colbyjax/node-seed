let mongoose = require('mongoose');
let Train = require('../models/train');
let seed = require('../models/seed');

/*
 * GET /train route to retrieve all the trains
 */
function getTrains(req, res) {
    let query = Train.find({});
    query.exec((err, trains) => {
        if (err) {
            res.send(err);
        } else {
            // No problems, return trains
            res.json(trains);
        }
    });
}

/*
 * POST /train to create a new train
 */
function postTrain(req, res) {
    let newTrain = new Train(req.body);
    newTrain.save((err, train) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, send it back
            res.json({
                message: "Train created!",
                train
            });
        }
    });
}

/*
 * GET /train/:id get a single train
 */
function getTrain(req, res) {
    Railcar.findById(req.params.id, (err, train) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, return the train
            res.json(train);
        }
    });
}

/*
 * DELETE /train/:id to delete a train
 */
function deleteTrain(req, res) {
    Train.remove({
        _id: req.params.id
    }, (err, result) => {
        res.json({
            message: "Train deleted!",
            result
        });
    });
}

/*
 * PUT /train/:id to update a train
 */
function updateTrain(req, res) {
    Train.findById({
        _id: req.params.id
    }, (err, train) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, update train
            Object.assign(train, req.body).save((err, train) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: "Train updated!",
                        train
                    });
                }
            });
        }
    });
}



function seedTrains(req, res) {

  // Route that will seed the database with some sample database
      //console.log(JSON.stringify(seed));
      Train.insertMany(seed, (err, trains) => {
        if (err) {
          res.json({ error: "There was a problem seeding collection"});
        } else {
           console.log("Collection Seeded!");
           res.json({
             message: "Collection Seeded",
             trains
           });
        }
      });

}


function clearTrains(req, res) {
  Train.remove({}, (err, foo) => {
      if (err) {
          res.json({
              error: "There was a problem clearing the Collection"
          });
      } else {
          console.log('Collection Cleared');
          res.json({
              message: "Collection cleared"
          });
      }
  });
}

// Export all the functions
module.exports = {
    getTrains,
    postTrain,
    getTrain,
    deleteTrain,
    updateTrain,
    seedTrains,
    clearTrains
};
