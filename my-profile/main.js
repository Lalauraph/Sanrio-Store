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

    // Update the HTML with the current user information
    const nameElement = document.querySelector("h1");
    const emailElement = document.querySelector("p");
    nameElement.textContent = usuarioActual.name;
    emailElement.textContent = usuarioActual.email;

    // Add event listener to the "Edit Profile" button
    const editProfileButton = document.querySelector(".edit-profile-button");

    editProfileButton.addEventListener("click", () => {
        // Prompt the user to enter new information
        const newName = prompt("Enter your new name:");
        const newEmail = prompt("Enter your new email:");

        // Update the information of the current user in the list of users
        usuarios[usuarioActualIndex] = {
            ...usuarioActual,
            name: newName,
            email: newEmail
        };

        // Guardar los usuarios actualizados en el local storage
        guardarUsuarios(usuarios);

        // Update the HTML with the new information
        nameElement.textContent = newName;
        emailElement.textContent = newEmail;

        // Update the current user object in memory
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

    // Crear una instancia de la clase Personaje con los datos del primer personaje favorito
    const personaje = new Personaje(
        primerPersonajeFavorito.name,
        primerPersonajeFavorito.description,
        primerPersonajeFavorito.image,
        primerPersonajeFavorito.favorito
    );

    // Obtener el elemento HTML del primer personaje favorito utilizando el método render()
    const elementoPersonaje = personaje.render();
    
    // Obtener el elemento <div class="abajo__caja">
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