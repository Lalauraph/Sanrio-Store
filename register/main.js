import { usuarioExiste, registrarUsuario, obtenerUsuarioActual } from "../utils.js";
 
const render = () => {
    const usuarioActual = obtenerUsuarioActual();

    if(usuarioActual !== null) {
        window.location.href = "cayendo.html";
        return;
    }
    
    const formulario = document.querySelector('#registro');
    console.log(formulario);
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
       /*  const confirmPassword = e.target.confirmPassword.value; */

       /*  if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        } */

        /* if(usuarioExiste(email) === true) {
            alert('El usuario ya existe');
            return;
        } */

        registrarUsuario(name, email, password);

        alert('Usuario registrado con éxito');

        window.location.href = "log.html";
    });
}

window.onload = render;