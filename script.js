
// Clase asistente
class Sujeto {
    /* nombre, tipo (cargado o vivo), donde vive, desde cuando fue descargado (sólo si es un descargado), posible culpabilidad (posible cooperador, cooperador o delincuente), una url con la imagen del sujeto si lo hay (si no, en el listado aparecerá una imagen indicativa de que no hay foto), y un campo de comentarios.*/
    constructor(id, nombre, tipo, domicilio, f_descargado, culpabilidad, foto, comentarios) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.domicilio = domicilio;
        this.f_descargado = f_descargado;
        this.culpabilidad = culpabilidad;
        this.foto = foto;
        this.comentarios = comentarios;
    }
}

// instanciar array
const ArraySujeto = [];

// David Choak
if (!localStorage.getItem("1")) {

    const Choak = new Sujeto("1", "David Choak", "Cargado", "Lake View", "2018-07-22", "Delincuente", "images/choak.jpg", "Está mayor");  
    const sujetoJSON = JSON.stringify(Choak);
    localStorage.setItem("1", sujetoJSON);
}

// meter sujetos local en array
const local = Object.keys(localStorage);
local.forEach(key => {

    const sujetoStorage = JSON.parse(localStorage.getItem(key));
    ArraySujeto.push(sujetoStorage);
})

// función mostrar listado 
function mostrarSujetos() {

    const lista = document.getElementById("lista"); 

    lista.innerHTML = "";

    ArraySujeto.forEach(Sujeto => {

        const li = document.createElement("li");
        const img = document.createElement("img");

        img.src = Sujeto.foto;
        img.alt = Sujeto.nombre;
        img.width = 150;
        img.height = 150;
        
        img.addEventListener("click", () => cargar(Sujeto));
        img.onerror = function() {

            img.src = "images/anonimo.jpg";
        };

        const p = document.createElement("p");
        p.textContent = Sujeto.nombre;

        li.appendChild(img);
        li.appendChild(p);

        lista.appendChild(li);

        /*  borde verde si es un "descargado" y un borde rojo si es un humano vivo. Así mismo, debe aparecer el nombre del sujeto, en verde si es un posible candidato, en naranja si si sabe que ha colaborado en el delito, y en rojo si se sabe que ha sido uno de los perpetradores */
        if (Sujeto.tipo == "Cargado") img.className = "borde_verde";
        if (Sujeto.tipo == "Vivo") img.className = "borde_rojo";
        if (Sujeto.culpabilidad == "Posible_cooperador") p.className = "color_verde";
        if (Sujeto.culpabilidad == "Cooperador") p.className = "color_naranja";
        if (Sujeto.culpabilidad == "Delincuente") p.className = "color_rojo";

        /* url con la imagen del sujeto si lo hay (si no, en el listado aparecerá una imagen indicativa de que no hay foto) */
        if (Sujeto.foto == "") {
            img.src = "images/anonimo.jpg";
            img.alt = "desconocido";
        }
    });
}

// cargar sujetos
function cargar(Sujeto) {

    // coger contenido
    const main = document.getElementById("contenido");
    const btnAñadir = document.getElementById("añadir");
    const formulario = document.getElementById("formulario");
    const btnAgregar = document.getElementById("agregar");
    const btnEditar = document.getElementById("editar");

    // ocultar contenido
    main.style.display = "none";
    btnAñadir.style.display = "none";
    btnAgregar.style.display = "none";
    btnEditar.style.display = "inline";

    // mostrar formulario
    formulario.style.display = "block";

    // coger datos del formulario
    const id = document.getElementById("id");
    const nombre = document.getElementById("nombre");
    const tipo = document.getElementById("tipo");
    const domicilio = document.getElementById("domicilio");
    const f_descargado = document.getElementById("f_descargado");
    const culpabilidad = document.getElementById("culpabilidad");
    const foto = document.getElementById("foto");
    const comentarios = document.getElementById("comentarios");

    // reflejar los datos cogidos en el formulario
    id.value = Sujeto.id;
    nombre.value = Sujeto.nombre;
    tipo.value = Sujeto.tipo;

    // para que se deshabilite el campo fecha si se cambia el tipo de cargado a vivo de un sujeto
    if (tipo.value === "Vivo") {

        f_descargado.value = "";
        f_descargado.disabled = true;

    } else {

        f_descargado.value = Sujeto.f_descargado;
    }

    domicilio.value = Sujeto.domicilio;
    culpabilidad.value = Sujeto.culpabilidad;
    foto.value = Sujeto.foto;
    comentarios.value = Sujeto.comentarios;
}

// ocultar fondo
function ocultar() {

    // coger contenido
    const main = document.getElementById("contenido");
    const btnOcultar = document.getElementById("ocultar");
    const btnRestablecer = document.getElementById("restablecer");
    const btnAñadir = document.getElementById("añadir");
    const formulario = document.getElementById("formulario");

    // ocultar contenido
    main.style.display = "none";
    btnOcultar.style.display = "none";
    btnRestablecer.style.display = "inline";
    btnAñadir.style.display = "none";
    formulario.style.display = "none";

    // establecer fondo
    document.body.style.backgroundImage = "url('images/lakeview.jpg')";
    document.body.style.backgroundSize = "cover";
}

// restablecer fondo
function restablecer() {
    
    // coger contenido
    const main = document.getElementById("contenido");
    const btnOcultar = document.getElementById("ocultar");
    const btnRestablecer = document.getElementById("restablecer");
    const btnAñadir = document.getElementById("añadir");
    const formulario = document.getElementById("formulario");

    // ocultar contenido
    main.style.display = "block";
    btnOcultar.style.display = "inline";
    btnRestablecer.style.display = "none";
    btnAñadir.style.display = "inline";
    formulario.style.display = "none";

    // resetear fondo
    document.body.style.backgroundImage = "";
}

// añadir sujeto
function añadir() {

    // coger contenido
    const main = document.getElementById("contenido");
    const btnAñadir = document.getElementById("añadir");
    const formulario = document.getElementById("formulario");
    const btnEditar = document.getElementById("editar");

    // ocultar contenido
    main.style.display = "none";
    btnAñadir.style.display = "none";
    btnEditar.style.display = "none";

    // importar formulario
    formulario.style.display = "block";
}

// funcion coger id
function getID() {

    const local = Object.keys(localStorage);

    if (local.length === 0) return 0 // si está vacío que no lo coja

    const ultimoID = Math.max(...local.map (Number));
    return ultimoID // devolver ID
}

// agregar sujeto
function agregarSujeto() {

    if (!validar()) return;

    // coger datos del formulario
    const id = getID() + 1; // autoincrementar id
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const domicilio = document.getElementById("domicilio").value;
    const f_descargado = document.getElementById("f_descargado").value;
    const culpabilidad = document.getElementById("culpabilidad").value;
    const foto = document.getElementById("foto").value;
    const comentarios = document.getElementById("comentarios").value;

    // instanciar nuevo sujeto con dichos datos
    const nuevoSujeto = new Sujeto(id, nombre, tipo, domicilio, f_descargado, culpabilidad, foto, comentarios);   

    // meter el sujeto en el localstorage
    const sujetoJSON = JSON.stringify(nuevoSujeto);
    localStorage.setItem(id, sujetoJSON);

    // indicar que la operación se ha ejecutado con éxito
    alert("Sujeto agregado correctamente.");

    // funciones
    validar(); // validar formulario
    restablecer(); // para 'salir' del formulario
    window.location.reload(); // actualizar página
}

// función editar
function editarSujeto() {

    if (!validar()) return;

    // coger datos del formulario
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const domicilio = document.getElementById("domicilio").value;
    const f_descargado = document.getElementById("f_descargado").value;
    const culpabilidad = document.getElementById("culpabilidad").value;
    const foto = document.getElementById("foto").value;
    const comentarios = document.getElementById("comentarios").value;

    // instanciar nuevo sujeto con dichos datos
    const nuevoSujeto = new Sujeto(id, nombre, tipo, domicilio, f_descargado, culpabilidad, foto, comentarios);   

    // funciones
    validar(); // validar formulario
    restablecer(); // para 'salir' del formulario
    window.location.reload(); // actualizar página
}

// validaciones formulario
function validar() {
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const domicilio = document.getElementById("domicilio").value;
    const f_descargado = document.getElementById("f_descargado").value;
    const culpabilidad = document.getElementById("culpabilidad").value;

    // campos por defecto
    if (tipo == "Seleccione un tipo" || culpabilidad == "Culpabilidad") {

        alert("ERROR. Compruebe los campos.");
        return false;
    } 

    // valores numéricos en campos de texto
    if (!isNaN(nombre)) {
        alert("ERROR. Nombre incorrecto");
        return false;
    }

    if (!isNaN(domicilio)) {
        alert("ERROR. Domicilio incorrecto");
        return false;
    }

    // fecha vacía si está cargado
    if (tipo == "Cargado" && f_descargado == "") {
        alert("ERROR. No se ha detectado la fecha");
        return false;
    }

    // fecha válida si está vacía cuando está vivo
    if (tipo == "Vivo" && f_descargado !== "") return false;

    return true;
}

// deshabilitar date si está vivo
function deshabilitarFecha() {

    var tipo = document.getElementById("tipo").value;
    var fecha = document.getElementById("f_descargado");

    fecha.disabled = (tipo === "Vivo");
    fecha.value = "";
}

document.getElementById("tipo").addEventListener("change", deshabilitarFecha);

// ejecutar función mostrar listado cada vez que se recargue la página
document.addEventListener("DOMContentLoaded", function() {

    mostrarSujetos();
});