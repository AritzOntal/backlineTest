const expect = require('chai').expect;

const { suma } = require('../../mathUtils');

describe('mathUtils', () => {
    it ('suma', () => {
        const resultado = suma(2,6);
        expect(resultado).equal(8);
    });
});

