const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { response } = require('express');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();


describe('rentals', () => {
    describe('GET/rentals', () => {
        it('should get all rentals', (done) => {
            chai.request(app)
                .get('/rentals')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('id_guitar_rental');
                    expect(response.body[0]).to.have.property('id_guitar');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('date');
                    expect(response.body[0]).to.have.property('return_date');
                    
                    expect(response.body[0].name).to.equal('Aritz Ontalvilla')
                    expect(response.body[1].name).to.equal('Ander Sevilla')

                    done();
                });
        });
    });

    describe('GET/rentals/1', () => {
        it('should get unique rental', (done) => {
            chai.request(app)
                .get('/rentals/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('id_guitar_rental');
                    expect(response.body).to.have.property('id_guitar');
                    expect(response.body).to.have.property('name', 'Aritz Ontalvilla');
                    expect(response.body).to.have.property('date');
                    expect(response.body).to.have.property('return_date');

                    done();
                });
        });
    });
});

//TODO AGREGAR CASO PARA GET DE UN ALQUILER


describe('POST/rentals', () => {
    it('should register a new rental with correct id_guitar', (done) => {
        chai.request(app)
            .post('/rentals')
            .send({
                id_guitar: 1,
                name: "rentalName",
                return_date: '2025-09-12'
            })
            .end((error, response) => {
                response.should.have.status(201);

                expect(response.body).to.have.property('id_guitar').to.equal(1);
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('name');

                done();
            }); 
    });


    it('validation sholud fail beacouse name is mandatory', (done) => {
        chai.request(app)
            .post('/rentals')
            .send({
                id_guitar: 1,
            })
            .end((error, response) => {
                response.should.have.status(400);
                expect(response.body.status).to.equal('bad-request');
                expect(response.body.message).to.equal('el campo name es obligatorio');

                done();
            });
    });
});

describe('PUT/rentals', () => {
    it('should update a rental', (done) => {
        chai.request(app)
            .put('/rentals/1')
            .send({
                id_guitar: 1,
                return_date: '2025-10-10'
            })
            .end((error, response) => {
                response.should.have.status(200);
                expect(response.body).to.have.property('id_guitar_rental');
                expect(response.body).to.have.property('id_guitar');
                expect(response.body).to.have.property('return_date').to.equal('2025-10-10');

                done();
            }); 
    });

    it('no deberia actualizar si no hay fecha de vuelta', (done) => {
        chai.request(app)
            .put('/rentals/1')
            .send({
                id_guitar: 1,
            })
            .end((error, response) => {
                response.should.have.status(400);

                done();
            }); 
    });
});

describe('DELETE/rentals', () => {
    it('should delete a rental', (done) => {
        chai.request(app)
            .delete('/rentals/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').that.includes('deleted successfully');
                done();
            }); 
    });

    it('Devolverá 404 sin el alquiler no existe', (done) => {
        chai.request(app)
            .delete('/rentals/9999')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message').that.includes('not found');
                done();
            }); 
    });
});

