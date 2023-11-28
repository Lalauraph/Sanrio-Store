import { obtenerUsuarioActual, obtenerUsuarios, guardarUsuarios, obtenerFavoritos, Personaje, cerrarSesion } from '../utils.js'; // Importar las funciones necesarias de tus utilidades

// Obtener el nombre de usuario actual del local storage
const nombreUsuarioActual = obtenerUsuarioActual();

// Obtener la lista completa de usuarios
const usuarios = obtenerUsuarios();

// Buscar el usuario actual en la lista de usuarios utilizando el nombre de usuario
const usuarioActualIndex = usuarios.findIndex(usuario => usuario.name === nombreUsuarioActual);

// Verificar si se encontró el usuario actual
if (usuarioActualIndex !== -1) {
    // Obtener el objeto del usuario actual
    const usuarioActual = usuarios[usuarioActualIndex];

    // Actualizar HTML con info del usuario actual
    const nameElement = document.querySelector("h1");
    const emailElement = document.querySelector("p");
    nameElement.textContent = usuarioActual.name;
    emailElement.textContent = usuarioActual.email;

    // event listener para boton de editar perfil
    const editProfileButton = document.querySelector(".edit-profile-button");

    editProfileButton.addEventListener("click", () => {
        // Editar perfil: cambiar email y nombre
        const newName = prompt("Enter your new name:");
        const newEmail = prompt("Enter your new email:");

        
        usuarios[usuarioActualIndex] = {
            ...usuarioActual,
            name: newName,
            email: newEmail
        };

        // Guardar los usuarios actualizados en el local storage
        guardarUsuarios(usuarios);

        // actualizar html con nueva info del usuario
        nameElement.textContent = newName;
        emailElement.textContent = newEmail;

        usuarioActual.name = newName;
        usuarioActual.email = newEmail;
    });
} else {
    console.log(`No se encontró el usuario ${nombreUsuarioActual}`);
}

// Obtener los personajes favoritos del usuario actual
const favoritos = obtenerFavoritos(nombreUsuarioActual);

// Verificar si hay algún personaje favorito
if (favoritos.length > 0) {

    // Obtener el primer personaje favorito
    const primerPersonajeFavorito = favoritos[0];

    // Crear un nuevo personaje de la clase Personaje con los datos del primer personaje favorito
    const personaje = new Personaje(
        primerPersonajeFavorito.name,
        primerPersonajeFavorito.description,
        primerPersonajeFavorito.image,
        primerPersonajeFavorito.favorito
    );

    // Obtener el elemento HTML del primer personaje favorito utilizando el método render()
    const elementoPersonaje = personaje.render();
    
    // Obtener el elemento <div class="abajo__caja"> donde va a ir el personaje
    const abajoCajaElement = document.querySelector(".abajo__caja");
    
    // Agregar el elemento del primer personaje favorito al elemento <div class="abajo__caja">
    abajoCajaElement.appendChild(elementoPersonaje);
    const deleteInfo = document.querySelector(".popup__txt>p");
    deleteInfo.style.display = "none";
    const deleteInfo2 = document.querySelector(".popup>button");
    deleteInfo2.style.display = "none";
}

const btnCerrarSesion = document.querySelector("#cerrarSesion");

btnCerrarSesion.addEventListener("click", () => {
    cerrarSesion();
    window.location.href = "landing.html";
});

window.onload = render;