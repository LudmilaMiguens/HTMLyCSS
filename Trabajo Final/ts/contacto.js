const formulario = document.querySelector("form");
const input = document.querySelectorAll("input");

const evento = {
    nombre: "",
    apellido:"",
    fecha:"",
    email:"",
};

formulario.addEventListener("submit", eventoclick);


function eventoclick(e){
    e.preventDefault();
    evento.nombre = input[0].value;
    evento.apellido = input[1].value;
    evento.fecha = input[2].value;
    evento.email = input[3].value;
    console.log(evento);
}
