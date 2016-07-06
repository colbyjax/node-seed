// Define Required Modules
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    bunyan = require('bunyan');

// Configure the app to use body parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var log = bunyan.createLogger({name: 'bc-routes'});

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    log.info(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// Our first route, a nice little test
// Browse to http://localhost:4000/api/test
router.get('/test', function(req, res) {
    res.json({ message: "Your bidding sire?" });
});


/* ALL THE CRUD OPERATIONS */

// CREATE - Post a new db entry
router.post('/', function(req, res) { 
    var id = req.body.id;
    var name = req.body.name;
    var harvest = req.body.harvest;
    
    mongoose.model('Seed').create({
        id : id,
        name : name,
        harvest:harvest
    }, function (err, seed) {
        if(err) {
            res.json({ error: "There was a problem adding the information to the database" });
        } else {
            log.info('POST - Creating a new Resource (id): ' + id);
            res.json(seed);
        }
    })

});

router.get('/', function(req,res) {
     // Retrieve all Seeds from Mongo
    mongoose.model('Seed').find({}, function (err, seeds) {
        if (err) {
            log.error('Problem retrieving the data from the database');
            res.json({ error: "There was a problem retrieving the data from the database" });
        } else {
            log.info('GET - Retrieving all Seeds...');
            res.json(seeds);
        }
    });
});

// READ - Get a particular db entry
router.get('/:id', function(req, res) {  
    var mongo_id = req.params.id;
    mongoose.model('Seed').findById(mongo_id, function(err, seed) {
        if(err) {
            log.error('Problem retrieving the data from the database');
            res.json({ error: "There was a problem retrieving the data from the database" });
        } else {
            log.info('GET - Retrieving ID: ' + mongo_id);
            res.json(seed);
        }
    })
});

// UPDATE - Put a particular db entry
router.put('/:id', function(req, res) { 
     var mongo_id = req.params.id;

    // Assign the new values
    var id = req.body.id;
    var name = req.body.name;
    var harvest = req.body.harvest;

    // Find the Document by Id
    mongoose.model('Seed').findById(mongo_id, function(err, seed) {
        // Update the Resource
        resource.update({
            id : id,
            name : name,
            harvest: harvest
        }, function (err, harvestID) {
            if(err) {
                log.error('There was a problem updating the information in the database: ' + err);
                res.json({ error: "There was a problem while updating." });
            } else {
                log.info('PUT - Updated Id: ' + mongo_id);
                res.json(seed);
            }
        })
    })
});

// DELETE - Delete a particular db entry
router.delete('/:id', function(req, res) { 
    // Find the Document By id
    var mongo_id = req.params.id;
    mongoose.model('Seed').findById(mongo_id, function(err, seed) {
        if(err) {
            log.error('There was a problem finding the record to delete in the database: ' + err);
            res.json({ error: "There was a problem while deleting." });
        } else {
            seed.remove(function(err, seed) {
                if(err) {
                    log.error('There was a problem removing the record in the database: ' + err);
                    res.json({ error: "There was a problem while deleting." });
                } else {
                    log.info('Deleted id: ' + mongo_id);
                    res.json({ message : 'Deleted', item : seed });
                }
            })
        }
    })
});

module.exports = router;
                                       
                                       