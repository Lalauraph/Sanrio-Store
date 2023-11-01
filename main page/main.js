import {obtenerUrl,Personaje} from "../utils.js";

const render = async () => {
   
    const data = await obtenerUrl();
    console.log(data);

    const personajes = data.personajes;
    const contenedor = document.querySelector("#characters_container");
   
console.log(personajes);
    for (const personaje of personajes){
        const personajeObj = new Personaje(personaje.name, personaje.description, personaje.image);
        contenedor.appendChild(personajeObj.render());
       
       console.log(personajeObj);
       
    //    contenedor.style.overflowX = "auto";

    } 

}
window.onload = render;