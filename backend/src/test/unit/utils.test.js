//TODO HACER TEST DE LOS UTILS
const expect = require('chai').expect;
const{ getAge }  = require('../../utils');

describe('utils', () => {
    it('getAge', () => {
        let age = getAge(2020);
        expect(age).equal(5);
    });
});



