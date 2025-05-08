const expect = require('chai').expect;
const{ noNewGuitar, guitarValidationData }  = require('../../guitarValidator');

describe('guitarValidator', () => {
    it('la guitarra no es nueva', () => {
        let noNew = noNewGuitar('new');
        expect(noNew).equal(true);
    });

    it('los campos no son correctos', () => {
        let valid = guitarValidationData(1, '1678', "good");
        expect(valid).to.equal('el campo year es obligatorio o incorrecto');
    });

    it('los campos de la guitarra son validos', () => {
        let valid = guitarValidationData('Fender', 1995, 'good');
        expect(valid).to.equal(true);
    });
});


