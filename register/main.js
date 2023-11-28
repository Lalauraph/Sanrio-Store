import { usuarioExiste, registrarUsuario, obtenerUsuarioActual } from "../utils.js";
 
const render = () => {
    const usuarioActual = obtenerUsuarioActual();

    if(usuarioActual !== null) {
        window.location.href = "landing.html";
        return;
    }
    
    const formulario = document.querySelector('#registro');
    console.log(formulario);
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
       
        console.log(name);
        if(usuarioExiste(email) === true) {
            alert('El usuario ya existe');
            return;
        }

        registrarUsuario(name, email, password);

        alert('Usuario registrado con éxito');

        window.location.href = "log.html";
    });
}

window.onload = render;