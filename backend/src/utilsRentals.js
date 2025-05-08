
function getRentalDuration(startDate) {

    const start = new Date(startDate);
    const today = new Date()
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

function rentalValidationData(name) {
    if (!name) return 'el campo name es obligatorio';
    return true;
}


module.exports = {
    getRentalDuration,
    rentalValidationData
}