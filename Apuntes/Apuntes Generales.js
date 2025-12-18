/*****************************************************
 * INICI OBLIGATORI DE L'EXAMEN
 *****************************************************/
document.addEventListener("DOMContentLoaded", main);
/*****************************************************
 * VARIABLES GLOBALS
 *****************************************************/
// Estes variables han d'estar fora de les funcions
// perquè jo les necessite en filtres, ordenacions, etc.
let coches = []; //Array Original NO SE TOCA, SOLO ES PARA CARGAR LOS JSON

let cochesGuardados = JSON.parse(localStorage.getItem('coches')); //Aray que tiene la info de JSON pero que puede ser manipulada y se guarda en LocalStorage
let cochesOriginales = [...cochesGuardados]; //Copia del array original
let cochesOrdenados = [...cochesGuardados] //Copia del array original para la funcion de ordenar cochces


function main() {
    /*****************************************************
     * CARREGAR I TRACTAR EL JSON
     *****************************************************/
    function cargarDatos() {
        fetch('coches.json') // Cambia la ruta si es necesario
            .then(respuesta => respuesta.json())
            .then(data => {
                coches = data;
                localStorage.setItem('coches', JSON.stringify(coches));
                mostrarDatos(data);
                generarAutocomplete(data);
            });
    }
    /*****************************************************
     * PINTAR DADES EN EL DOM (FORMA CORRECTA D'EXAMEN)
     *****************************************************/
    //Si tenemos que implementar los datos en una tabla lo haremos de esta manera
    function mostrarDatos(coches) {
        // He de canviar 'llistat' pel ID real del contenidor
        const tbody = document.querySelector("#contenedorCoches tbody"); // Ajustado el id al de la tabla

        // Abans de pintar, jo elimine TOT el contingut anterior
        // Ho faig així perquè NO puc usar innerHTML = ""
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Ara jo recórrec totes les dades
        coches.forEach(coche => {
            // Jo cree el contenidor principal de cada item
            const row = document.createElement("tr");
            //div.classList.add('item'); <- adaptar classe si cal

            // Jo cree una taula per a l'info
            const marcaCell = document.createElement("td");
            marcaCell.appendChild(document.createTextNode(coche.marca));
            row.appendChild(marcaCell);

            const modeloCell = document.createElement("td");
            modeloCell.appendChild(document.createTextNode(coche.modelo));
            row.appendChild(modeloCell);

            const añoCell = document.createElement("td");
            añoCell.appendChild(document.createTextNode(coche.año));
            row.appendChild(añoCell);

            const kmCell = document.createElement("td");
            kmCell.appendChild(document.createTextNode(coche.km));
            // Jo afegisc tots els elements al td
            row.appendChild(kmCell);

            const precioCell = document.createElement("td");
            precioCell.appendChild(document.createTextNode(coche.precio));
            row.appendChild(precioCell);

            // Añadir la celda de acción (por ejemplo, un botón de reserva)
            const accionCell = document.createElement("td");
            const botonReserva = document.createElement("button");
            const textoBoton = document.createTextNode("Reservar");
            botonReserva.appendChild(textoBoton);
            botonReserva.addEventListener("click", () => rellenarFormulario(coche));
            accionCell.appendChild(botonReserva);
            row.appendChild(accionCell);

            tbody.appendChild(row);
        });
    }

    //Medida desesperada lo haremos asi como ultima opcion si nos quedamos atascados
    /*function mostrarDatos(coches) {
        const contenedor = document.querySelector("#llistat");
        // Limpiar el contenedor antes de añadir nuevos coches
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }

        coches.forEach(coche => {
            // Crear un contenedor div para cada coche
            const cocheDiv = document.createElement("div");
            cocheDiv.classList.add("coche"); // Opcional: agregar una clase para estilos

            // Crear el texto con la información del coche
            const cocheInfo = document.createElement("p");
            const textoInfo = document.createTextNode(`${coche.marca} ${coche.modelo} (${coche.año}) - ${coche.km} km - ${coche.precio} €`);
            cocheInfo.appendChild(textoInfo);
            cocheDiv.appendChild(cocheInfo);

            // Crear un botón de reserva
            const botonReserva = document.createElement("button");
            const textoBoton = document.createTextNode("Reservar");
            botonReserva.appendChild(textoBoton);

            // Añadir el evento al botón de reserva
            botonReserva.addEventListener("click", () => rellenarFormulario(coche));

            // Añadir el botón al div
            cocheDiv.appendChild(botonReserva);

            // Añadir el div con la información y el botón al contenedor
            contenedor.appendChild(cocheDiv);
        });
    }*/

    /**function mostrarDatos(coches) {
    const contenedorCoches = document.querySelector("#contenedorCoches"); // Aquí cambia el selector para un div en lugar de tbody
    // Limpiar el contenedor sin usar innerHTML
    while (contenedorCoches.firstChild) {
        contenedorCoches.removeChild(contenedorCoches.firstChild);
    }

    coches.forEach(coche => {
        // Crear un div para cada coche
        const cocheDiv = document.createElement("div");
        cocheDiv.classList.add("coche"); // Puedes agregar clases para estilos (opcional)

        // Crear el texto con la información del coche usando createTextNode
        const cocheInfo = document.createElement("p");
        const textoInfo = document.createTextNode(`${coche.marca} ${coche.modelo} (${coche.año}) - ${coche.km} km - ${coche.precio} €`);
        cocheInfo.appendChild(textoInfo);
        cocheDiv.appendChild(cocheInfo);

        // Crear un botón de reserva
        const botonReserva = document.createElement("button");
        const textoBoton = document.createTextNode("Reservar");
        botonReserva.appendChild(textoBoton);

        // Añadir el evento al botón de reserva
        botonReserva.addEventListener("click", () => rellenarFormulario(coche));

        // Añadir el botón al div
        cocheDiv.appendChild(botonReserva);

        // Añadir el div con la información y el botón al contenedor
        contenedorCoches.appendChild(cocheDiv);
    });
}
 */

    /*****************************************************
     * ORDENACIÓ (ASCENDENT, DESCENDENT I RELEVÀNCIA)
     *****************************************************/
    function ordenarPorPrecio(orden) {
        const tbody = document.querySelector("#contenedorCoches tbody");

        // Limpiar la tabla antes de volver a cargar los datos ordenados
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        const cochesOrdenados = cochesGuardados.sort((a, b) => {
            return orden === 'ascendente' ? b.precio - a.precio : a.precio - b.precio;
        });


        /**
         * const copia = [...coches]; // Crear copia
            copia.sort((a, b) => {
             return orden === 'ascendente' ? a.precio - b.precio : b.precio - a.precio;
            });
            mostrarDatos(copia)
        */

        mostrarDatos(cochesOrdenados);
    }

    function restaurarListado() {
        mostrarDatos(cochesOriginales);
    }

    /*****************************************************
     * FILTRES Y RELLENOS (ANY, QUILÒMETRES, ETC.)
     *****************************************************/

    //Plantilla en caso de que los años sean SELECTS y tengamos que rellenar con OPTIONS
    function rellenarAños() {
        const añoDesde = document.getElementById('añoDesde');
        const añoHasta = document.getElementById('añoHasta');
        const añoActual = new Date().getFullYear();

        for (let i = 2010; i <= añoActual; i++) {
            const optionDesde = document.createElement('option');
            optionDesde.value = i;
            optionDesde.appendChild(document.createTextNode(i));  // Usamos createTextNode
            añoDesde.appendChild(optionDesde);


        }

        for (let i = añoActual; i >= 2010; i--) {
            const optionHasta = document.createElement('option');
            optionHasta.value = i;
            optionHasta.appendChild(document.createTextNode(i));  // Usamos createTextNode
            añoHasta.appendChild(optionHasta);
        }

    }

    function rellenarKilómetros() {
        const kmSelect = document.getElementById('kmFiltro');
        //const kmOptions = [0, 5000, 10000, 15000, 20000, 25000, 30000];
        const kmOptions = [30000, 25000, 20000, 15000, 10000, 5000, 0];

        while (kmSelect.firstChild) {
            kmSelect.removeChild(kmSelect.firstChild);
        }
        // Crear las opciones de kilómetros
        kmOptions.forEach(km => {
            const option = document.createElement('option');
            option.value = km;
            option.appendChild(document.createTextNode(`${km} km`)); // Mostrar "20000 km", etc.
            kmSelect.appendChild(option);
        });
    }

    function filtrarCoches() {
        const añoDesde = parseInt(document.getElementById('añoDesde').value);
        const añoHasta = parseInt(document.getElementById('añoHasta').value);
        const kmFiltro = parseInt(document.getElementById('kmFiltro').value);

        // Filtrar los coches en base a los años y kilómetros seleccionados
        const cochesFiltrados = coches.filter(coche => {
            // Filtrar por años
            const cumpleAños = coche.año >= añoDesde && coche.año <= añoHasta;
            // Filtrar por kilómetros
            const cumpleKm = coche.km <= kmFiltro;
            return cumpleAños && cumpleKm;
        });

        mostrarDatos(cochesFiltrados);
    }

    //Plantilla para en caso de que los años y km sean inputs de tipo numero pero ya con id e inputs creados y haya que establecer años manualmente
    /*function rellenarAños() {
        const añoActual = new Date().getFullYear();

        // Crear input para "Año desde"
        const inputDesde = document.getElementById("añoDesde");
        inputDesde.min = 2010;  // Establecer el mínimo en 2010
        inputDesde.max = añoActual;  // Establecer el máximo en 2025


        // Crear input para "Año hasta"
        const inputHasta = document.getElementById("añoHasta");
        inputHasta.min = 2010;  // Establecer el mínimo en 2010
        inputHasta.max = añoActual;  // Establecer el máximo en 2025
    }*/

    //Plantilla para crear inputs con sus valores
    /* function rellenarAños() {
         const añoDesde = document.getElementById('añoDesde');
         const añoHasta = document.getElementById('añoHasta');
         const añoActual = new Date().getFullYear();
 
         // Crear input para "Año desde"
         const inputDesde = document.createElement("input");
         inputDesde.type = "number";
         inputDesde.id = "añoDesde";
         inputDesde.placeholder = "Año desde";
         inputDesde.min = 2010;  // Establecer el mínimo en 2010
         inputDesde.max = 2025;  // Establecer el máximo en 2025
         añoDesde.appendChild(inputDesde);
 
         // Crear input para "Año hasta"
         const inputHasta = document.createElement("input");
         inputHasta.type = "number";
         inputHasta.id = "añoHasta";
         inputHasta.placeholder = "Año hasta";
         inputHasta.min = 2010;  // Establecer el mínimo en 2010
         inputHasta.max = 2025;  // Establecer el máximo en 2025
         añoHasta.appendChild(inputHasta);
     }*/


    function eliminarFiltros() {
        // Eliminar los filtros de los campos
        document.getElementById('buscador').value = '';  // Limpiar el campo de búsqueda
        document.getElementById('añoDesde').value = '';  // Limpiar el filtro de año "desde"
        document.getElementById('añoHasta').value = '';  // Limpiar el filtro de año "hasta"
        document.getElementById('kmFiltro').value = '';  // Limpiar el filtro de kilómetros

        // Restaurar los datos con los filtros eliminados y con el orden actual (si había ordenación)
        if (cochesOrdenados.length > 0) {
            mostrarDatos(cochesOrdenados);  // Mostrar los coches ordenados si se hizo alguna ordenación previamente
        } else {
            mostrarDatos(cochesOriginales);  // Mostrar los datos originales si no hubo ordenación previa
        }

    }

    /*****************************************************
     * jQuery UI AUTOCOMPLETE
     *****************************************************/
    function generarAutocomplete(coches) {
        const marcasYModelos = coches.map(coche => {
            return {
                label: `${coche.marca} ${coche.modelo}`, // Mostrar marca y modelo en las sugerencias
                value: coche.marca // Usar la marca como valor
            };
        });

        $("#buscador").autocomplete({
            source: marcasYModelos, // Usamos el array generado
            minLength: 1, // Comienza a sugerir después de 2 caracteres
            select: function (event, ui) {  // Aquí se agregan ambos argumentos, evento y ui
                // Al seleccionar una opción, se puede hacer algo con el valor seleccionado
                const seleccion = ui.item.value; // Obtiene la marca seleccionada
                console.log("Marca seleccionada:", seleccion);

                // Aquí puedes añadir cualquier acción adicional con la marca seleccionada
                // Por ejemplo, podrías filtrar los coches según la marca seleccionada:
                const cochesFiltrados = coches.filter(coche => coche.marca.includes(seleccion) || coche.modelo.includes(seleccion));
                mostrarDatos(cochesFiltrados); // Llamar a la función para mostrar los coches filtrados
            }
        });
    }

    /*****************************************************
     * VALIDACIÓ DE FORMULARIS (HTML5 + JS)
     *****************************************************/
    function validarAños() {
        const añoDesde = document.getElementById('añoDesde');
        const añoHasta = document.getElementById('añoHasta');
        const kmfiltro = document.getElementById('kmFiltro');

        const valorDesde = parseInt(añoDesde.value); // Convertir el valor a número
        const valorHasta = parseInt(añoHasta.value); // Convertir el valor a número
        const valorkm = parseInt(kmfiltro.value);

        if (isNaN(valorkm)) {
            alert('Los km no pueden estar vacíos');
            return false;
        }

        // Validación de que los años no estén vacíos
        if (isNaN(valorDesde) || isNaN(valorHasta)) {
            alert('Los años no pueden estar vacíos');
            return false;
        }

        // Validación de que el año "desde" no sea mayor que el año "hasta"
        if (valorDesde > valorHasta) {
            alert('El año "desde" no puede ser mayor al año "hasta"');
            return false;
        }

        // Validación de que el año "hasta" no sea menor que el año "desde"
        if (valorHasta < valorDesde) {
            alert('El año "hasta" no puede ser menor al año "desde"');
            return false;
        }

        // Si los años son válidos, pero no cumplen con la validez del input
        if (!añoDesde.checkValidity() || !añoHasta.checkValidity()) {
            alert('Por favor, complete todos los filtros correctamente.');
            return false;
        }

        // Si todas las validaciones pasan
        return true;
    }

    function validarFormulario() {
        // Crear un array para guardar los errores
        let errors = [];

        // Validar el campo de nombre
        /*const nombreCliente = document.getElementById('nombreCliente').value;
        const regexNombre = /^[A-Za-z\s]{3,}$/; // Al menos 3 letras (puede incluir espacios)
        if (!regexNombre.test(nombreCliente)) {
            errors.push("El nom del client no és correcte. Ha de tenir almenys 3 lletres.");
        }*/
        const nombreCliente = document.getElementById('nombreCliente');
        nombreCliente.setAttribute('pattern', '[A-Za-z\\s]{3,}');
        if (!nombreCliente.checkValidity()) {
            errors.push("El nom del client no és correcte. Ha de tenir almenys 3 lletres.");
        }

        // Validar el campo de correo electrónico
        /*const emailCliente = document.getElementById('emailCliente').value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para email
        if (!regexEmail.test(emailCliente)) {
            errors.push("L'email no és correcte. Ha de tenir el format correcte (ejemplo@domini.com).");
        }*/

        // Validar el campo de correo electrónico con checkValidity y regex (personalizado)
        const emailCliente = document.getElementById('emailCliente');
        nombreCliente.setAttribute('pattern', '/^[^\s@]+@[^\s@]+\.[^\s@]+$/');
        if (!emailCliente.checkValidity()) {
            errors.push("L'email no és correcte. Ha de tenir el format correcte.");
        }

        // Validar la fecha de reserva (debe ser una fecha válida)
        /**const fechaReserva = document.getElementById('fechaReserva').value;
        if (!fechaReserva) {
            errors.push("La data de reserva és obligatòria.");
        }*/

        const fechaReserva = document.getElementById('fechaReserva');
        if (!fechaReserva.checkValidity()) {
            errors.push("La data de reserva és obligatòria.");
        }

        // Mostrar todos los errores
        mostrarErrors(errors);

        // Si no hay errores, retornar true para indicar que el formulario es válido
        return errors.length === 0;
    }

    function mostrarErrors(errors) {
        // Obtén el contenedor de los errores
        const contenedor = document.getElementById('mensajesError');

        // Limpiar cualquier error previo
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }

        // Si hay errores, mostrar cada uno
        if (errors.length > 0) {
            errors.forEach(function (mensaje) {
                const p = document.createElement('p');
                p.appendChild(document.createTextNode(mensaje));
                contenedor.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.appendChild(document.createTextNode('El formulari és vàlid!'));
            contenedor.appendChild(p);
        }
    }

    /*****************************************************
    * LOCALSTORAGE I RESERVES
    *****************************************************/
    function rellenarFormulario(coche) {
        document.getElementById('reservaNombre').value = coche.marca + " " + coche.modelo;
    }

    function reservar() {
        if (validarFormulario()) {
            // Obtener los valores de los campos
            const reserva = {
                vehiculo: document.getElementById('reservaNombre').value,
                nombreCliente: document.getElementById('nombreCliente').value,
                email: document.getElementById('emailCliente').value,
                fecha: document.getElementById('fechaReserva').value
            };

            // Guardar la reserva en el localStorage
            guardarReserva(reserva);
            alert("Reserva guardada:", reserva);
            window.location.href = "index.html";
        } else {
            alert("Formulario inválido.");
        }
    }

    function guardarReserva(reserva) {
        // Convertir el objeto reserva a formato JSON
        const reservaJSON = JSON.stringify(reserva);

        // Guardar la reserva en el localStorage
        localStorage.setItem('reserva', reservaJSON);
    }

    function cargarReserva() {
        // Recuperar la reserva guardada del localStorage
        const reserva = localStorage.getItem('reserva');

        if (reserva !== null) {
            const reservaObj = JSON.parse(reserva);

            // Cargar los datos de la reserva en el formulario
            document.getElementById('reservaNombre').value = reservaObj.vehiculo;
            document.getElementById('nombreCliente').value = reservaObj.nombreCliente;
            document.getElementById('emailCliente').value = reservaObj.email;
            document.getElementById('fechaReserva').value = reservaObj.fecha;
        }
    }

    /*****************************************************
    * CRUD
    *****************************************************/
    // Función para crear un nuevo coche
    function crearCoche() {
        // Obtener valores del formulario
        const marca = document.getElementById('marca').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const año = parseInt(document.getElementById('año').value);
        const km = parseInt(document.getElementById('km').value);
        const precio = parseFloat(document.getElementById('precio').value);

        // Validar campos
        if (!validarFormularioCRUD(marca, modelo, año, km, precio)) {
            return;
        }

        // Crear nuevo objeto coche
        const nuevoCoche = {
            id: generarIdUnico(), // Generar ID único
            marca: marca,
            modelo: modelo,
            año: año,
            km: km,
            precio: precio
        };

        // Agregar al array manipulable
        cochesGuardados.push(nuevoCoche);

        // Actualizar arrays de respaldo
        cochesOriginales = [...cochesGuardados];
        cochesOrdenados = [...cochesGuardados];

        // Guardar en localStorage
        localStorage.setItem('coches', JSON.stringify(cochesGuardados));

        // Actualizar la vista
        mostrarDatos(cochesGuardados);

        // Regenerar autocomplete con nuevos datos
        generarAutocomplete(cochesGuardados);


        // Mostrar mensaje de éxito
        mostrarMensaje('Coche agregado correctamente', 'success');
    }
    /*****************************************************
    * EVENTS
    *****************************************************/
    function prepararEvents() {
        // Ací jo relacione botons amb funcions
        // TOTS els IDs s'han d'adaptar a l'HTML real de l'examen

        // Al hacer clic en el botón de orden ascendente
        document.querySelector('#sortAsc').addEventListener('click', () => ordenarPorPrecio('ascendente'));
        // Al hacer clic en el botón de orden descendente
        document.querySelector('#sortDesc').addEventListener('click', () => ordenarPorPrecio('descendente'));
        // Al hacer clic en el botón de relevancia (restaurar listado original)
        document.querySelector('#sortRel').addEventListener('click', restaurarListado);

        document.querySelector('#btnFiltrar').addEventListener('click', filtrarCoches);

        document.querySelector('#btnFiltrar').addEventListener('click', validarAños);

        document.querySelector('#btnEliminarFiltros').addEventListener('click', eliminarFiltros);

        document.querySelector("#btnReservar").addEventListener("click", validarFormulario);

        document.querySelector("#btnReservar").addEventListener("click", reservar);
        document.querySelector("#agregarCoche").addEventListener("click", crearCoche);

    }

    /*****************************************************
    * CRIDAR FUNCIONS
    *****************************************************/
    cargarDatos();
    rellenarAños();
    rellenarKilómetros();
    prepararEvents();
}



//CRUD
/*document.addEventListener("DOMContentLoaded", main);

let coches = [];

// Función principal que carga los datos desde localStorage
function main() {
    cargarCoches();

    // Evento para añadir o editar coches
    document.getElementById('formCoche').addEventListener('submit', (event) => {
        event.preventDefault();

        const coche = {
            id: Date.now(), // Usamos el timestamp como ID único
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            año: document.getElementById('año').value,
            km: document.getElementById('km').value,
            precio: document.getElementById('precio').value
        };

        if (document.getElementById('btnGuardar').textContent === 'Añadir Coche') {
            // Si es añadir coche
            añadirCoche(coche);
        } else {
            // Si es editar coche
            const cocheId = document.getElementById('btnGuardar').dataset.cocheId;
            editarCoche(cocheId, coche);
        }

        // Limpiar el formulario
        document.getElementById('formCoche').reset();
        document.getElementById('btnGuardar').textContent = 'Añadir Coche'; // Volver al texto original
    });
}

// Función para cargar los coches desde localStorage
function cargarCoches() {
    const cochesGuardados = JSON.parse(localStorage.getItem('coches'));
    if (cochesGuardados) {
        coches = cochesGuardados;
        mostrarCoches(coches);
    }
}

// Función para mostrar los coches en la página
function mostrarCoches(coches) {
    const contenedorCoches = document.getElementById('contenedorCoches');

    // Limpiar el contenedor sin usar innerHTML
    while (contenedorCoches.firstChild) {
        contenedorCoches.removeChild(contenedorCoches.firstChild);
    }

    coches.forEach(coche => {
        const cocheDiv = document.createElement('div');
        cocheDiv.classList.add('coche'); // Agregar clase para estilo

        // Crear el texto con la información del coche usando createTextNode
        const cocheInfo = document.createElement('p');
        const textoInfo = document.createTextNode(`${coche.marca} ${coche.modelo} (${coche.año}) - ${coche.km} km - ${coche.precio} €`);
        cocheInfo.appendChild(textoInfo);
        cocheDiv.appendChild(cocheInfo);

        // Crear un botón de reserva
        const botonReserva = document.createElement("button");
        const textoBoton = document.createTextNode("Reservar");
        botonReserva.appendChild(textoBoton);

        // Añadir el evento al botón de reserva
        botonReserva.addEventListener("click", () => rellenarFormulario(coche));

        // Añadir el botón al div
        cocheDiv.appendChild(botonReserva);

        // Añadir el div con la información y el botón al contenedor
        contenedorCoches.appendChild(cocheDiv);
    });
}

// Función para añadir un coche
function añadirCoche(coche) {
    coches.push(coche);
    localStorage.setItem('coches', JSON.stringify(coches));
    mostrarCoches(coches);
}

// Función para eliminar un coche
function eliminarCoche(id) {
    coches = coches.filter(coche => coche.id !== id);
    localStorage.setItem('coches', JSON.stringify(coches));
    mostrarCoches(coches);
}

// Función para rellenar el formulario con los datos de un coche (editar)
function rellenarFormulario(coche) {
    document.getElementById('marca').value = coche.marca;
    document.getElementById('modelo').value = coche.modelo;
    document.getElementById('año').value = coche.año;
    document.getElementById('km').value = coche.km;
    document.getElementById('precio').value = coche.precio;

    document.getElementById('btnGuardar').textContent = 'Guardar Cambios';
    document.getElementById('btnGuardar').dataset.cocheId = coche.id; // Guardar el ID del coche para editar
}

// Función para editar un coche
function editarCoche(id, cocheActualizado) {
    const indice = coches.findIndex(coche => coche.id === id);
    coches[indice] = cocheActualizado;
    localStorage.setItem('coches', JSON.stringify(coches));
    mostrarCoches(coches);
}*/

//JSON
/*[
    {
        "marca": "Toyota",
        "modelo": "Corolla",
        "año": 2020,
        "km": 15000,
        "precio": 18000
    },
    {
        "marca": "Honda",
        "modelo": "Civic",
        "año": 2021,
        "km": 10000,
        "precio": 20000
    },
    {
        "marca": "Ford",
        "modelo": "Focus",
        "año": 2019,
        "km": 25000,
        "precio": 16000
    },
    {
        "marca": "BMW",
        "modelo": "Serie 3",
        "año": 2018,
        "km": 30000,
        "precio": 25000
    },
    {
        "marca": "Mercedes",
        "modelo": "Clase A",
        "año": 2022,
        "km": 5000,
        "precio": 28000
    }
]*/


//HTML GUIA
/*<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Examen JS - Gestión Coches</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
</head>

<body>

    <header>
        <h1>Venta de Vehículos</h1>
    </header>

    <div class="controls">
        <fieldset>
            <legend>Filtros</legend>
            <label>Buscar (Marca/Modelo): <input type="text" id="buscador" placeholder="Ej: Toyota"></label>

            <label>Año Desde: <select id="añoDesde"></select></label>
            <label>Año Hasta: <select id="añoHasta"></select></label>

            <label>Kilómetros: <select id="kmFiltro"></select></label>

            <button id="btnFiltrar">Filtrar</button>
            <button id="btnEliminarFiltros">Eliminar Filtros</button>
        </fieldset>

        <fieldset>
            <legend>Ordenación</legend>
            <button id="sortAsc">Precio Ascendente</button>
            <button id="sortDesc">Precio Descendente</button>
            <button id="sortRel">Relevancia (Original)</button>
        </fieldset>
    </div>

    <table id="contenedorCoches" class="tabla-coches">
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Kilómetros</th>
                <th>Precio</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <!-- Las filas se agregarán dinámicamente desde el JS -->
        </tbody>
    </table>

    <hr>

    <section id="zonaReserva">
        <h2>Formulario de Reserva</h2>
        <form id="formReserva" novalidate>
            <label>Vehículo: <input type="text" id="reservaNombre" required readonly></label>

            <label>Nombre Cliente:
                <input type="text" id="nombreCliente" required pattern="[A-Za-z\s]{3,}" title="Mínimo 3 letras">
            </label>

            <label>Correo Electrónico:
                <input type="email" id="emailCliente" required>
            </label>

            <label>Fecha Reserva:
                <input type="date" id="fechaReserva" required>
            </label>

            <button type="button" id="btnReservar">Confirmar Reserva</button>
        </form>
        <div id="mensajesError" class="error-msg"></div>
    </section>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <script src="app3.js"></script>
</body>

</html>*/