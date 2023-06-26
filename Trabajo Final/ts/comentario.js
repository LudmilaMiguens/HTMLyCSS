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
function manejarBtnActualizarVentana(){}
function manejarBtnBorarVentana(){}
function manejarBtnCambiarEstadoVentana(){}

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
        estadoCelda.textContent = tarea.estado? "leido" : "pendiente";
        row.appendChild(estadoCelda);
        cuerpoTabla.appendChild(row);
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

    ventanaEmergente.showModal();

};

function generarNumerosComentarios(){
    if (tareas.length === 0){
        return 1;
    } else {
        const ultimaTarea = tareas[tareas.length -1];
        return ultimaTarea.nComentarios +1;
    }
}

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