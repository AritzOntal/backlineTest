function guitarValidationData(model, year, condition) {
    if (!model) return 'el campo modelo es obligatorio';
    if (!condition) return 'el campo condition es obligatorio';
    if (!year || typeof year !== 'number') return 'el campo year es obligatorio o incorrecto';
    return true;
}

function noNewGuitar(condition) {
    return typeof condition === 'string' && condition.toLowerCase() === 'new';
    
}

module.exports = {
    guitarValidationData,
    noNewGuitar
}