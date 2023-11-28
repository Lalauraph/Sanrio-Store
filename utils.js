//Imágenes carrusel
export class Image {
    id=0;
    url="";

    constructor(id, url) {
        this.id = id;
        this.url = url;
      }
    
      render() {

        const image = document.createElement("img");
        image.src = this.url;
        image.classList.add("img-array")
        return image;
      }

}

//equipo de trabajo
export class Team {
  name="";
  role="";  
  url="";

  constructor( name, role, url) {
      this.name = name;
      this.role = role;
      this.url = url;
    }
  
    render() {


      const div = document.createElement("div");
      div.classList.add("card");

      const image = document.createElement("img");
      image.classList.add("card__img");

      const nombre = document.createElement("h2");
     nombre.classList.add("card__title");
      const cargo = document.createElement("p");
      cargo.classList.add("card__subtitle");


      image.src = this.url;
      nombre.textContent =this.name;
      cargo.textContent =this.role;

      div.appendChild(image);
      div.appendChild(nombre);
      div.appendChild(cargo);
      return div;
    }

}

//personajes

export class Personaje {
  name = "";
  description = "";
  image = "";
  favorito = false;

  constructor(name, description, image, favorito) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.favorito = favorito;
  }

  render() {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.appendChild(a);

    const img = document.createElement("img");

    img.src = this.image;

    a.appendChild(img);

    const content = this.#renderContent();

    li.appendChild(content);

    return li;
  }

  #renderContent() {
    const div = document.createElement("div");
    div.classList.add("popup");

    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("bx");
    icon.classList.add(this.favorito ? "bxs-heart" : "bx-heart"); // Agregar clase CSS según el estado del personaje
    button.appendChild(icon);
    div.appendChild(button);

    const container = document.createElement("div");
    container.classList.add("popup__txt");

    const titulo = document.createElement("h2");
    const contenido = document.createElement("p");

    titulo.textContent = this.name;
    contenido.textContent = this.description;

    container.appendChild(titulo);
    container.appendChild(contenido);

    div.appendChild(container);

    // Agregar evento de clic al botón de "Agregar a favoritos"
    button.addEventListener("click", () => {
      this.favorito = !this.favorito; // Cambiar el estado del personaje
      icon.classList.toggle("bxs-heart"); // Actualizar la clase CSS del botón
      icon.classList.toggle("bx-heart"); // Actualizar la clase CSS del botón

      // Agregar lógica para guardar el estado del personaje en el localstorage
      const usuarioActual = obtenerUsuarioActual();
      const favoritos = obtenerFavoritos(usuarioActual);
      const index = favoritos.findIndex(personaje => personaje.name === this.name);
      if (index !== -1) {
        favoritos.splice(index, 1);
      }
      if (this.favorito) {
        favoritos.push(this);
        button.style.backgroundColor = "pink"; // Establecer el color rosa al botón si es un favorito
      } else {
        button.style.backgroundColor = ""; // Remover el color rosa si no es un favorito
      }
      guardarFavoritos(usuarioActual, favoritos);
    });

    // Validar si el personaje está en la lista de favoritos y aplicar estilo de color rosa al botón
    const usuarioActual = obtenerUsuarioActual();
    const favoritos = obtenerFavoritos(usuarioActual);
    if (favoritos.some(personaje => personaje.name === this.name)) {
      button.style.backgroundColor = "pink";
    }

    return div;
  }
}



export class Opinion {
 
  texto="";  
  autor="";
  

  
    constructor( texto, autor) {
        this.texto = texto;
        this.autor = autor;
      
      }
}


export const obtenerUrl = async () => {
const response = await fetch ("https://raw.githubusercontent.com/Lalauraph/Sanrio-Store/main/data.json");
const data = response.json();
console.log (data);
return data;
}

export const obtenerUsuarios = () => {
  const usuarios = localStorage.getItem("usuarios");

  if(usuarios === null) {
      return [];
  }

  return JSON.parse(usuarios);
}

export const usuarioExiste = (email) => {
  const usuarios = obtenerUsuarios();

  for (const usuario of usuarios) {
      if(usuario.email === email) {
          return true;
      }
  }

  return false;
}

export const registrarUsuario = (name, email, password) => {
  const usuarios = obtenerUsuarios();

  const usuario = {
      name: name,
      email: email,
      password: password
  }

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

export const iniciarSesion = (email, password) => {
  const usuarios = obtenerUsuarios();

  for (const usuario of usuarios) {
      if ( usuario.email === email && usuario.password === password) {
          localStorage.setItem("usuarioActual", usuario.name);
          return usuario;
      }
  }

  return null;
}

export const obtenerUsuarioActual = () => {
  const email = localStorage.getItem("usuarioActual");
  return email;
}



export const cerrarSesion = () => {
  localStorage.removeItem("usuarioActual");
}

export const obtenerFavoritos = (usuario) => {
  // Obtener los favoritos del usuario desde el localstorage (si no hay datos, devolver un array vacío)
  const favoritos = localStorage.getItem(usuario) || '[]';

  // Convertir los datos obtenidos del localstorage a un array
  return JSON.parse(favoritos);
}

// Función para guardar los favoritos de un usuario en el localstorage
export const guardarFavoritos = (usuario, favoritos) => {
  // Convertir los favoritos a formato JSON
  const favoritosJSON = JSON.stringify(favoritos);

  // Guardar los favoritos en el localstorage asociados al usuario correspondiente
  localStorage.setItem(usuario, favoritosJSON);
}

export const  guardarUsuarios = (usuarios) => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

