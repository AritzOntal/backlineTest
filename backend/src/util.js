function getDays (date) {
    const now = new Date().getTime());
    const days = now - date;

    return days;
}

function getDays (fromDate, todAte) {
    const days = toDate - fromDate;

    return days;
}

module.exports = {
    getDays
}