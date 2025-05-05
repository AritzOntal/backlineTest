const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { response } = require('express');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();


describe('guitars', () => {
    describe('GET/guitars', () => {
        it('should get all guitarras', (done) => {
            chai.request(app)
                .get('/guitars')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('model');
                    expect(response.body[0]).to.have.property('year');
                    expect(response.body[0]).to.have.property('condition');
                    expect(response.body[0].model).to.equal('Gibson Les Paul')
                    expect(response.body[1].model).to.equal('Fender Stratocaster')
                    done();
                });
        });
    });
});


describe('POST/guitars', () => {
    it('should register a new guitar', (done) => {
        chai.request(app)
            .post('/guitars')
            .send({
                model: "guitarModel",
                condition: "guitarCondition",
                year: 2020
            })
            .end((error, response) => {
                response.should.have.status(201);
                // expect(response.body).to.have.property('id_guitar');
                expect(response.body).to.have.property('model');
                expect(response.body).to.have.property('year');
                expect(response.body).to.have.property('age').to.equal(5);
                expect(response.body).to.have.property('category');

                done();
            }); 
    });

    it('validation sholud fail beacouse name is mandatory', (done) => {
        chai.request(app)
            .post('/guitars')
            .send({
                condition: "guitarCondition",
                year: 2020
            })
            .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('el campo modelo es obligatorio');

                done();
            });
    });

    it('validation sholud fail because the guitar cannot be new', (done) => {
        chai.request(app)
            .post('/guitars')
            .send({
                model: 'guitarModel',
                condition: "new" || "New",
                year: 2020
            })
            .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('la guitarra no puede ser nueva');

                done();
            });
    });
});

