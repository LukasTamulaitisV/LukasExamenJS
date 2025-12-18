document.addEventListener("DOMContentLoaded", main);
let coches = [data.cars];
let cochesGuardados = JSON.parse(localStorage.getItem('coches'));
let cochesOrdenados = [...coches];
let cochesOriginales = [...coches];

function main() {

    function cargarDatos() {
        localStorage.setItem('coches', JSON.stringify(coches))
        mostrarDatos(coches);
    }

    function mostrarDatos(datosCoches) {
        const contenedor = document.getElementById("listado");

        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        datosCoches.forEach(coche =>{

            const divPrincipal = document.createElement('div');
            divPrincipal.classList.add('card');
            divPrincipal.classList.add('mb-4');
            contenedor.appendChild(divPrincipal);

            const divSecundari = document.createElement('div');
            divSecundari.classList.add('card-body');
            divPrincipal.appendChild(divSecundari);

            //Nombre
            const h2 = document.createElement('h2');
            h2.classList.add('card-title');
            h2.appendChild(document.createTextNode(coche.marca));
            divSecundari.appendChild(h2);

            //Precio
            const divPrecio1 = document.createElement('div');
            divPrecio1.classList.add('row');
            divPrecio1.classList.add('justify-content-end');
            divSecundari.appendChild(divPrecio1);

            const divPrecio2 = document.createElement('div');
            divPrecio2.classList.add('p-2');
            divPrecio2.classList.add('mb-1');
            divPrecio2.classList.add('col-md-3');
            divPrecio2.classList.add('offset-md-3');
            divPrecio2.classList.add('bg-warning');
            divPrecio2.classList.add('rounded');
            divPrecio2.classList.add('text-center');
            divPrecio1.appendChild(divPrecio2);

            const h2Precio = document.createElement('h2');
            h2Precio.classList.add('font-weight-bold');
            h2.appendChild(document.createTextNode(coche.precio));
            divPrecio2.appendChild(h2Precio);

            //Atributos
            const divRow = document.createElement('div');
            divRow.classList.add('row');
            divSecundari.appendChild(divRow);

            const divAño = document.createElement('div');
            divAño.classList.add('col');
            divAño.classList.add('p-3');
            divAño.classList.add('text-center');
            divAño.classList.add('border-bottom');
            divAño.classList.add('border-dark');
            divAño.appendChild(document.createTextNode('Año'));
            divRow.appendChild(divAño);

            const divKilometros = document.createElement('div');
            divKilometros.classList.add('col');
            divKilometros.classList.add('p-3');
            divKilometros.classList.add('text-center');
            divKilometros.classList.add('border-bottom');
            divKilometros.classList.add('border-dark');
            divKilometros.appendChild(document.createTextNode('Kilometros'));
            divRow.appendChild(divKilometros);

            const divCambio = document.createElement('div');
            divCambio.classList.add('col');
            divCambio.classList.add('p-3');
            divCambio.classList.add('text-center');
            divCambio.classList.add('border-bottom');
            divCambio.classList.add('border-dark');
            divCambio.appendChild(document.createTextNode('Cambio'));
            divRow.appendChild(divCambio);

            const divCombustible = document.createElement('div');
            divCombustible.classList.add('col');
            divCombustible.classList.add('p-3');
            divCombustible.classList.add('text-center');
            divCombustible.classList.add('border-bottom');
            divCombustible.classList.add('border-dark');
            divCombustible.appendChild(document.createTextNode('Combustible'));
            divRow.appendChild(divCombustible);

            const divPotencia = document.createElement('div');
            divPotencia.classList.add('w-100');
            divRow.appendChild(divPotencia);

            const divAño2 = document.createElement('div');
            divAño2.classList.add('col');
            divAño2.classList.add('p-3');
            divAño2.classList.add('text-center');
            divRow.appendChild(divAño2);
            const strongAño = document.createElement('strong');
            strongAño.appendChild(document.createTextNode(coche.anyo));
            divAño2.appendChild(strongAño);


            const divKilometros2 = document.createElement('div');
            divKilometros2.classList.add('col');
            divKilometros2.classList.add('p-3');
            divKilometros2.classList.add('text-center');
            divRow.appendChild(divKilometros2);
            const strongKilometros = document.createElement('strong');
            strongAño.appendChild(document.createTextNode(coche.km));
            divKilometros2.appendChild(strongKilometros);

            const divCambio2 = document.createElement('div');
            divCambio2.classList.add('col');
            divCambio2.classList.add('p-3');
            divCambio2.classList.add('text-center');
            divRow.appendChild(divCambio2);
            const strongCambio = document.createElement('strong');
            strongCambio.appendChild(document.createTextNode(coche.cambio));
            divCambio2.appendChild(strongCambio);

            const divCombustible2 = document.createElement('div');
            divCombustible2.classList.add('col');
            divCombustible2.classList.add('p-3');
            divCombustible2.classList.add('text-center');
            divRow.appendChild(divCombustible2);
            const strongCombustible = document.createElement('strong');
            strongCombustible.appendChild(document.createTextNode(coche.combustible));
            divCambio2.appendChild(strongCombustible);

            const aBton = document.createElement('a');
            aBton.classList.add('btn');
            aBton.classList.add('btn-primary');
            aBton.classList.add('m-3');
            aBton.appendChild(document.createTextNode('Reservar'));
        });
    }

    function ordenarPorPrecio(orden) {
        const contenedor = document.getElementById("listado");

        // Limpiar la tabla antes de volver a cargar los datos ordenados
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }

        const cochesOrdenados = coches.sort((a, b) => {
            return orden === 'ascendente' ? b.precio - a.precio : a.precio - b.precio;
        });

        mostrarDatos(cochesOrdenados);
    }

    function restaurarListado() {
        mostrarDatos(cochesOriginales);
    }

    function prepararEvents() {
        document.querySelector('#precioAlto').addEventListener('click', () => ordenarPorPrecio('ascendente'));
        document.querySelector('#precioBajo').addEventListener('click', () => ordenarPorPrecio('descendente'));
        document.querySelector('#relevancia').addEventListener('click', restaurarListado);

    }
    cargarDatos();
    prepararEvents();

}