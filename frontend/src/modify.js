import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado.");
    loadGuitar();
});

window.loadGuitar = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const guitarId = queryParams.get('id');
    axios.get('http://localhost:8080/guitars/' + guitarId)
        .then(response => {
            const guitarData = response.data;
            console.log("Datos de guitarra:", guitarData);
            document.getElementById("model").value = guitarData.model;
            document.getElementById("year").value = guitarData.year;
            document.getElementById("condition").value = guitarData.condition;
        })
        .catch(error => {
            console.error("Error al obtener la guitarra:", error);
        });
}

window.editGuitar = function () {

    const queryParams = new URLSearchParams(window.location.search);
    const guitarId = queryParams.get('id');

    const NewModel = document.getElementById('model').value;
    const NewYear = document.getElementById('year').value;
    const NewCondition = document.getElementById('condition').value;

    if (!NewModel || !NewYear || !NewCondition) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    axios.put('http://localhost:8080/guitars/' + guitarId, {
        model: NewModel,
        year: NewYear,
        condition: NewCondition
    })
        .then(response => {
            alert("Guitarra actualizada correctamente.");
            console.log(response.data);
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error al actualizar la guitarra.");
            console.error(error);
        });
};
