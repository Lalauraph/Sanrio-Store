import {obtenerUrl, Image} from "./utils.js";

const render = async () => {
   
    const data = await obtenerUrl();
    console.log(data);

    const images = data.images;
    const contenedor = document.querySelector(".center-images__images-container");

    for (const image of images){
        const imageObj = new Image (image.id, image.url);
        const img = imageObj.render();
        contenedor.appendChild(img);
    }

}
window.onload = render;