import {obtenerUrl, Image, Team} from "../utils.js";

const render = async () => {
   
    const data = await obtenerUrl();
    console.log(data);

    const images = data.images;
    const contenedor = document.querySelector(".center-images__images-container");

    const colaboradores = data.team;
    const contenedorAboutUs = document.querySelector(".about-us__background-container");

    for (const image of images){
        const imageObj = new Image (image.id, image.url);
        const img = imageObj.render();
        contenedor.appendChild(img);
    }

    for(const colaborador of colaboradores){
        const integrante = new Team(colaborador.name, colaborador.role, colaborador.url );
        contenedorAboutUs.appendChild(integrante.render());
    }

}
window.onload = render;