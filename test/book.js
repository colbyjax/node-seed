//process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('../models/book');

// Require the devDependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
// Parent block
describe('Books', () => {
    // Before test, empty database

    beforeEach((done) => {
        Book.remove({}, (err) => {
            done();
        });
    });


    // Test the /GET route
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/api/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST book', () => {
        it('it should POST a book', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: "1954",
                summary: "About a Hobbit and a ring"
            };
            chai.request(server)
                .post('/api/')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('summary');
                    res.body.should.have.property('year');
                    done();
                });
        });

    });

});
