// Define Required Modules
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  bunyan = require('bunyan'),
  fs = require('fs'),
  seed = require('../models/seed.json');


// Configure the app to use body parser
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
var log = bunyan.createLogger({
  name: 'bc-routes'
});

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
  res.json({
    message: "Skynet Self-Aware, dispatching T-800"
  });
});

// Route that will seed the database with some sample database
router.get('/seed', function(req, res) {
  //console.log(JSON.stringify(seed));
  seed.forEach(function(book) {
    mongoose.model('Book').create({
      title: book.title,
      author: book.author,
      year: book.year,
      summary: book.summary
    }, function(err, foo) {
      if (err) {
        console.log("Problem adding book: " + book.title);
      } else {
        console.log("Added Book: " + book.title);
      }
    });
  });
  res.json('Seed Completed');
});

router.get('/clear', function(req, res) {
  mongoose.model('Book').remove({}, function(err, foo) {
    if (err) {
      res.json({
        error: "There was a problem clearing the Collection"
      });
    } else {
      log.info('Collection Cleared');
      res.json({
        message: "Collection cleared"
      });
    }
  });
});

/* ALL THE CRUD OPERATIONS */

// CREATE - Post a new db entry
router.post('/', function(req, res) {
  var title = req.body.title;
  var author = req.body.author;
  var year = req.body.year;
  var summary = req.body.summary;

  mongoose.model('Book').create({
    title: title,
    author: author,
    year: year,
    summary: summary
  }, function(err, book) {
    if (err) {
      res.json({
        error: "There was a problem adding the information to the database"
      });
    } else {
      log.info('POST - Creating a new Book: ' + title);
      res.json(book);
    }
  });

});

// READ - Get all db entries
router.get('/', function(req, res) {
  mongoose.model('Book').find({}, function(err, books) {
    if (err) {
      log.error('Problem retrieving the data from the database');
      res.json({
        error: "There was a problem retrieving the data from the database"
      });
    } else {
      log.info('GET - Retrieving all Books...');
      res.json(books);
    }
  });
});

// READ - Get a particular db entry
router.get('/:id', function(req, res) {
  var mongo_id = req.params.id;
  mongoose.model('Book').findById(mongo_id, function(err, seed) {
    if (err) {
      log.error('Problem retrieving the data from the database');
      res.json({
        error: "There was a problem retrieving the data from the database"
      });
    } else {
      log.info('GET - Retrieving ID: ' + mongo_id);
      res.json(book);
    }
  });
});

// UPDATE - Put a particular db entry
router.put('/:id', function(req, res) {
  var mongo_id = req.params.id;

  // Assign the new values
  var title = req.body.title;
  var author = req.body.author;
  var year = req.body.year;
  var summary = req.body.summary;

  // Find the Document by Id
  mongoose.model('Book').findById(mongo_id, function(err, book) {
    // Update the Resource
    book.update({
      title: title,
      author: author,
      year: year,
      summary: summary
    }, function(err, bookID) {
      if (err) {
        log.error('There was a problem updating the information in the database: ' + err);
        res.json({
          error: "There was a problem while updating."
        });
      } else {
        log.info('PUT - Updated Id: ' + mongo_id);
        res.json(book);
      }
    });
  });
});

// DELETE - Delete a particular db entry
router.delete('/:id', function(req, res) {
  // Find the Document By id
  var mongo_id = req.params.id;
  mongoose.model('Book').findById(mongo_id, function(err, book) {
    if (err) {
      log.error('There was a problem finding the record to delete in the database: ' + err);
      res.json({
        error: "There was a problem while deleting."
      });
    } else {
      book.remove(function(err, book) {
        if (err) {
          log.error('There was a problem removing the record in the database: ' + err);
          res.json({
            error: "There was a problem while deleting."
          });
        } else {
          log.info('Deleted id: ' + mongo_id);
          res.json({
            message: 'Deleted',
            item: book
          });
        }
      });
    }
  });
});

module.exports = router;