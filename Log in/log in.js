import { iniciarSesion, obtenerUsuarioActual } from "../utils.js";

const render = () => {
    const usuarioActual = obtenerUsuarioActual();

    if(usuarioActual !== null) {
        window.location.href = "main.html";
        return;
    }

    const loginForm = document.querySelector("#login");
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const usuario = iniciarSesion( email, password);

        if (usuario === null) {
            alert('Nombre de usuario y/o contraseña incorrectos');
            console.log(usuario);
            return;
        }
        console.log("estoy enviando a main" );
        window.location.href = "main.html";
        console.log("estoy enviando" );

    });
}

window.onload = render;
    //cargar el javascript cuando ya se tiene todo en html y en css
    window.onload = render;