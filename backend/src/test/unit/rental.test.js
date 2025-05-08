const expect = require('chai').expect;
const sinon = require('sinon');
const{ rentalValidationData, getRentalDuration }  = require('../../utilsRentals');


describe('utilsRentals', () => {
    let clock;

    beforeAll(()=>{
        clock = sinon.useFakeTimers(new Date('2025-05-08').getTime())
    });

    afterAll(() => {
        clock.restore();
    });

    it('campo name vacio', () => {
        let undefined = rentalValidationData(null);
        expect(undefined).equal("el campo name es obligatorio");
    });

    it('calculo fecha correcto', ()=>{
        let diferencia = getRentalDuration('2025-05-01');
        expect(diferencia).equal(7);
    })
});