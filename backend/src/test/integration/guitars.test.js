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
                    expect(response.body[0]).to.have.property('age');
                    expect(response.body[0]).to.have.property('category');

                    expect(response.body[0].model).to.equal('Gibson Les Paul')
                    expect(response.body[1].model).to.equal('Fender Stratocaster')
                    done();
                });
        });
    });
    describe('GET/guitars/1', () => {
        it('should get unique guitar', (done) => {
            chai.request(app)
                .get('/guitars/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('model', 'Gibson Les Paul');
                    expect(response.body).to.have.property('year');
                    expect(response.body).to.have.property('condition');
                    expect(response.body).to.have.property('age');
                    expect(response.body).to.have.property('category');

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
                expect(response.body).to.have.property('id_guitar');
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



describe('PUT/guitars', () => {
    it('should update a guitar', (done) => {
        chai.request(app)
            .put('/guitars/1')
            .send({
                model: "guitarModelUpdate",
                condition: "guitarConditionUpdate",
                year: 2020
            })
            .end((error, response) => {
                response.should.have.status(200);
                expect(response.body).to.have.property('model');
                expect(response.body).to.have.property('year').to.equal(2020);
                expect(response.body).to.have.property('condition');

                done();
            });
    });


    it('No deberia actualizar si no especifica año', (done) => {
        chai.request(app)
            .put('/guitars/1')
            .send({
                model: "guitarModelUpdate",
                condition: "guitarConditionUpdate"
            })
            .end((error, response) => {
                response.should.have.status(400);

                done();
            });
    });
});




describe('DELETE/guitars/1', () => {
    it('No elimina la guitarra porque tiene alquileres activos', (done) => {
        chai.request(app)
            .delete('/guitars/1')
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });

    it('La guitarra se eliminó correctamente', (done) => {
        chai.request(app)
            .delete('/guitars/4')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});

