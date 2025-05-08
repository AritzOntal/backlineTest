const expect = require('chai').expect;
const{ isNewGuitar, guitarValidationData }  = require('../../utils');

describe('utils', () => {
    it('la guitarra no es nueva', () => {
        let noNew = isNewGuitar('new');
        expect(noNew).equal('la guitarra no puede ser nueva');
    });

    it('los campos no son correctos', () => {
        let valid = guitarValidationData('Gibson', 'texto', "good");
        expect(valid).to.equal('el campo year es obligatorio o incorrecto');
    });

    it('los campos de la guitarra son validos', () => {
        let valid = guitarValidationData('Fender', 1995, 'good');
        expect(valid).to.equal(true);
    });
});




