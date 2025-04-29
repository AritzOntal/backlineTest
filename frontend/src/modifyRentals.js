import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado.");
    loadRental();
});

window.loadRental = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const rentalId = queryParams.get('id');
    axios.get('http://localhost:8080/rentals/' + rentalId)
        .then(response => {
            const rentalData = response.data;
            console.log("Datos del alquiler:", rentalData);
            document.getElementById("guitar-id").value = rentalData.id_guitar;
            document.getElementById("date").value = rentalData.date;
            document.getElementById("return-date").value = rentalData.return_date;
            document.getElementById("name").value = rentalData.name;
        })
        .catch(error => {
            console.error("Error al obtener la guitarra:", error);
        });
}

window.editRental = function () {

    const queryParams = new URLSearchParams(window.location.search);
    const rentalId = queryParams.get('id');

    const NewIdGuitar = document.getElementById('guitar-id').value;
    const NewDate = document.getElementById('date').value;
    const NewReturnDate = document.getElementById('return-date').value;
    const NewName = document.getElementById('name').value;


    if (!NewIdGuitar || !NewDate || !NewReturnDate || !NewName) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    axios.put('http://localhost:8080/rentals/' + rentalId, {
        id_guitar: NewIdGuitar,
        date: NewDate,
        return_date: NewReturnDate,
        name: NewName
    })
        .then(response => {
            alert("Alquiler actualizado correctamente.");
            console.log(response.data);
        })
        .catch(error => {
            alert("Error al actualizar el alquiler.");
            console.error(error);
        });
};