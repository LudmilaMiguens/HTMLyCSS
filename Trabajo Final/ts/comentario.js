// arreglo de tareas
let tareas = []

// elementos

const formulario = document.getElementById("formulario");
const ventanaEmergente = document.getElementById("ventanaEmergente");
const formularioVentana = document.getElementById("formularioVentana");
const borrarBtn = document.getElementById("borrar-btn");
const cambiarEstadoBtn =document.getElementById("cambiarEstado-btn");
const cerrarBtn = document.getElementById("cerrar-btn");

//escuchar eventos

formulario.addEventListener("submit", agregarTodoAlFormularioEnviar);
formularioVentana.addEventListener("submit", manejarBtnActualizarVentana);
borrarBtn.addEventListener("click", manejarBtnBorarVentana);
cambiarEstadoBtn.addEventListener("click",manejarBtnCambiarEstadoVentana);
cerrarBtn.addEventListener("click", () => ventanaEmergente.close());


//funciones
function agregarTodoAlFormularioEnviar(e){
    e.preventDefault();
    const comentarioInput = formulario.querySelector("#comentarios");
    const nuevoComentario = comentarioInput.value.trim();
    if (nuevoComentario !== ""){
        const nuevaTarea = {
            nComentarios: generarNumerosComentarios(),
            comentarios: nuevoComentario,
            estado: false,
        };
        tareas.push(nuevaTarea);
        completarTabla();
        formulario.reset();
    }
}

function generarNumerosComentarios(){
    if (tareas.length === 0){
        return 1;
    } else {
        const ultimaTarea = tareas[tareas.length -1];
        return ultimaTarea.nComentarios +1;
    }
}

function completarTabla(){
    const cuerpoTabla = document.querySelector("#tabla tbody");
    cuerpoTabla.innerHTML = "";
    tareas.forEach((tarea) =>{
        const row = document.createElement("tr");
        row.setAttribute("data-todo-nComentarios", tarea.nComentarios);
        row.addEventListener("click", escucharClikFila);

        const nComentariosCelda = document.createElement("td");
        nComentariosCelda.textContent = tarea.nComentarios;
        row.appendChild(nComentariosCelda);

        const ComentariosCelda = document.createElement("td");
        ComentariosCelda.textContent = tarea.comentarios;
        row.appendChild(ComentariosCelda);

        const estadoCelda = document.createElement("td");
        estadoCelda.textContent = tarea.estado? "Leido" : "Pendiente";
        estadoCelda.classList.add(tarea.estado ? "leido" : "pendiente");
        row.appendChild(estadoCelda);
        cuerpoTabla.appendChild(row);
        row.classList.add("colorFila");
    })  
}

function escucharClikFila(e) {
    const tareasNumComentarios = e.currentTarget.getAttribute("data-todo-nComentarios");
    const tarea = tareas.find((tarea) => tarea.nComentarios === Number(tareasNumComentarios));

    const tareaNComentarioVentana = formularioVentana.querySelector("#nComentarioVentana");
    const tareaComentarioVentana = formularioVentana.querySelector("#comentarioVentana");
    const tareaEstadoVentana = document.getElementById("estadoVentana");

    tareaNComentarioVentana.value = tarea.nComentarios;
    tareaComentarioVentana.value = tarea.comentarios;

    if (tarea.estado){
        tareaEstadoVentana.textContent = " Leido";
        tareaEstadoVentana.classList.add("estado-leido")
        tareaEstadoVentana.classList.remove("estado-pendiente")
    } else{
        tareaEstadoVentana.textContent = " Pendiente";
        tareaEstadoVentana.classList.add("estado-pendiente")
        tareaEstadoVentana.classList.remove("estado-leido")
    }
    ventanaEmergente.showModal();
};

function manejarBtnActualizarVentana(e){
    e.preventDefault();
    const comentarioVentana = formularioVentana.querySelector("#comentarioVentana");
    const tareaNComentarios = Number (formularioVentana.querySelector("#nComentarioVentana").value);
    const tareaNueva = tareas.find(tareaNueva => tareaNueva.nComentarios === tareaNComentarios);
    tareaNueva.comentarios = comentarioVentana.value;
    ventanaEmergente.close();
    completarTabla();
}

function manejarBtnBorarVentana(){
    const tareaNComentarios = Number (formularioVentana.querySelector("#nComentarioVentana").value);
    tareas = tareas.filter(tarea => tarea.nComentarios !== tareaNComentarios);
    ventanaEmergente.close();
    completarTabla();
}

function manejarBtnCambiarEstadoVentana(){
    const tareaNComentarios = Number (formularioVentana.querySelector("#nComentarioVentana").value);
    const tareaNueva = tareas.find(tareaNueva => tareaNueva.nComentarios === tareaNComentarios);
    if (tareaNueva.estado === true){
        tareaNueva.estado = false;
    } else{
        tareaNueva.estado = true;
    }
    ventanaEmergente.close();
    completarTabla();
}



