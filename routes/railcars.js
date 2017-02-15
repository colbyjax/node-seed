let mongoose = require('mongoose');
let Railcar = require('../models/railcar');

/*
 * GET /railcar route to retrieve all the railcars
 */
function getRailcars(req, res) {
    let query = Railcar.find({});
    query.exec((err, railcars) => {
        if (err) {
            res.send(err);
        } else {
            // No problems, return cars
            res.json(railcars);
        }
    });
}

/*
 * POST /railcar to create a new railcar
 */
function postRailcar(req, res) {
    let newRailcar = new Railcar(req.body);
    newRailcar.save((err, railcar) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, send it back
            res.json({
                message: "Railcar created!",
                railcar
            });
        }
    });
}

/*
 * GET /railcar/:id get a single railcar
 */
function getRailcar(req, res) {
    Railcar.findById(req.params.id, (err, railcar) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, return the car
            res.json(railcar);
        }
    });
}

/*
 * DELETE /railcar/:id to delete a railcar
 */
function deleteRailcar(req, res) {
    Railcar.remove({
        _id: req.params.id
    }, (err, result) => {
        res.json({
            message: "Railcar deleted!",
            result
        });
    });
}

/*
 * PUT /railcar/:id to update a railcar
 */
function updateRailcar(req, res) {
    Railcar.findById({
        _id: req.params.id
    }, (err, railcar) => {
        if (err) {
            res.send(err);
        } else {
            // No problem, update railcar
            Object.assign(railcar, req.body).save((err, railcar) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        message: "Railcar updated!",
                        railcar
                    });
                }
            });
        }
    });
}

function seedRailcars(req, res) {
  //TODO

//   // Route that will seed the database with some sample database
//   router.get('/seed', (req, res) => {
//       //console.log(JSON.stringify(seed));
//       seed.forEach(function(book) {
//           mongoose.model('Book').create({
//               title: book.title,
//               author: book.author,
//               year: book.year,
//               summary: book.summary
//           }, function(err, foo) {
//               if (err) {
//                   console.log("Problem adding book: " + book.title);
//               } else {
//                   console.log("Added Book: " + book.title);
//               }
//           });
//       });
//       res.json('Seed Completed');
//   });
//
//   router.get('/clear', function(req, res) {
//       mongoose.model('Book').remove({}, function(err, foo) {
//           if (err) {
//               res.json({
//                   error: "There was a problem clearing the Collection"
//               });
//           } else {
//               log.info('Collection Cleared');
//               res.json({
//                   message: "Collection cleared"
//               });
//           }
//       });
//   });
 }

function clearRailcars(req, res) {
  //TODO
}

// Export all the functions
module.exports = {
    getRailcars,
    postRailcar,
    getRailcar,
    deleteRailcar,
    updateRailcar,
    seedRailcars,
    clearRailcars
};
