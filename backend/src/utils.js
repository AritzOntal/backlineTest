//CALCULA LOS AÑOS DE VIDA DE LA GUITARRA
function getAge(guitarYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - guitarYear;
}

function getCategory(age) {
    if (age >= 40) return 'vintage';
    if (age >= 15) return 'classic';
    return 'modern';
}


function guitarValidationData(model, year, condition) {
    if (!model) return 'el campo modelo es obligatorio';
    if (!condition) return 'el campo condition es obligatorio';
    if (!year || typeof year !== 'number') return 'el campo year es obligatorio o incorrecto';
    return true;
}

function isNewGuitar(condition) {
    if (typeof condition === 'string' && condition.toLowerCase() === 'new') return 'la guitarra no puede ser nueva';
    
    return false;
    
}


module.exports = {
    getAge,
    getCategory,
    isNewGuitar,
    guitarValidationData
}