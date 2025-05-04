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

function getRentalDuration() {

}

module.exports = {
    getAge,
    getRentalDuration,
    getCategory
}