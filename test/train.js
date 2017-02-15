//process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Train = require('../models/train');

// Require the devDependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
// Parent block
describe('Trains', () => {
    // Before test, empty database

    beforeEach((done) => {
        Train.remove({}, (err) => {
            done();
        });
    });


    // Test the /GET route
    describe('/GET train', () => {
        it('it should GET all the trains', (done) => {
            chai.request(server)
                .get('/api/train/')
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
    describe('/POST train', () => {
        it('it should POST a train', (done) => {
            let train = {
                id: "Q47701",
                type: "Unit",
                maxSpeed: "40",
                route: [{
                        milepost: "A  640",
                        mneumonic: "WAY",
                        arrival: "0800",
                        departure: "0900",
                        status: "planned"
                    },
                    {
                        milepost: "S  626",
                        mneumonic: "JAX",
                        arrival: "1000",
                        departure: "1100",
                        status: "planned"
                    }
                ],
                consist: [{
                        initial: "GTX",
                        number: "2200",
                        sequence: "1",
                        carType: "Flat",
                        class: "HAZ",
                        axles: "4",
                        brakes: "1"
                    },
                    {
                        initial: "GTX",
                        number: "2300",
                        sequence: "2",
                        carType: "Flat",
                        class: "HAZ",
                        axles: "4",
                        brakes: "2"
                    }
                ]
            };

            chai.request(server)
                .post('/api/train/')
                .send(train)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('train');
                    done();
                });
        });

    });

});
