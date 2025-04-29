import axios from "axios";

window.showRentals = function () {
    axios.get('http://localhost:8080/rentals')
        .then(response => {
            const allRentals = response.data;
            const rentalTable = document.getElementById('tablebody');
            console.log(allRentals);

            //LIMPIA LA LISTA ANTES DE RENDERIZAR LA LISTA DE ALQUILERES
            rentalTable.innerHTML = '';

            allRentals.forEach(rental => {
                //CREA UN ELEMENTO DE "FILA" Y LO GUARDA EN UNA VARIABLE
                const row = document.createElement('tr');
                //METE CODIGO HTML CON innerHTML
                row.innerHTML = '<td>' + rental.id_guitar + '</td>' +
                    '<td>' + rental.date + '</td>' +
                    '<td>' + rental.return_date + '</td>' +
                    '<td>' + rental.name + '</td>' +
                    '<a class="btn btn-primary" href="modifyRentals.html?id=' + rental.id_guitar_rental + '">Edit</a> <a class="btn btn-dark" href="javascript:delRentals(' + rental.id_guitar_rental + ')">Delete</a>';
                //CREA UN HIJO EN LA CLASE QUE HEMOS CREADO EN DE LA FILA "ROW" GUARDADA
                rentalTable.appendChild(row);
            });
        })
}


window.delRentals = function (id_guitar_rental) {
    if (confirm('¿Seguro que quieres eliminar este alquiler?')) {
        axios.delete('http://localhost:8080/rentals/' + id_guitar_rental)
            .then(response => {
                console.log('alquiler eliminado', response.data)
                alert('alquiler eliminado correctamente')
                showRentals();
            })
            .catch(error => {
                console.error("Error al eliminar alquiler:", error);
                alert("Hubo un error al eliminar el alquiler");
            });
    }
}

//PINTA EL ID DE LA GUITARRA SELECCIONADA
const queryParams = new URLSearchParams(window.location.search);
const guitarId = queryParams.get('id');

document.getElementById("id_guitar").value = guitarId;

document.getElementById('rental-form').addEventListener('submit', function (event) {

    //EVITA QUE EL FORMULARIO ENVIE Y RECARGUE LA PAGINA (ANTES DE QUE SE VALIDE EL RESTO DE CODIGO)
    event.preventDefault();


    // Obtener los valores del formulario
    const id_guitar = document.getElementById('id_guitar').value;
    const date = document.getElementById('date').value;
    const return_date = document.getElementById('return_date').value;
    const name = document.getElementById('name').value;


    // OBLIGAR A ESCRIBIR ALGO ANTES DE ENVIAR
    if (!id_guitar || !date || !return_date || !name) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    addRental(id_guitar, date, return_date, name);
});

function addRental(id_guitar, date, return_date, name) {

    axios.post('http://localhost:8080/rentals', { id_guitar, date, return_date, name })
        .then(response => {
            console.log('alquiler añadido', response.data)
            alert('alquiler añadido correctamente')
            //limpiamos el formulario
            document.getElementById('rental-form').reset();
            //volvemmos a mostrar la lista actualizada
            showRentals();
        })
        .catch(error => {
            console.error("Error al añadir alquiler:", error);
            alert("Hubo un error al añadir el alquiler");
        });

}

document.addEventListener('DOMContentLoaded', showRentals);
