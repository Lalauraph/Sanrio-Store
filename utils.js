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
  name="";
  description="";  
  image="";
fav = false;
  constructor(name, description, image, fav) {
      this.name = name;
      this.description = description;
      this.image = image;
      this.fav = fav;
    }
  
    

      render() {
        const li = document.createElement("li");
        const a = document.createElement("a");

        li.appendChild(a)

        const img = document.createElement("img");
      
        img.src = this.image;

        a.appendChild(img);

        const content = this.#renderContent();

        li.appendChild(content);

        return li;
    }


    #renderContent(){
        const div = document.createElement("div");
        div.classList.add("popup")
      

        const button = document.createElement("button");
        const icon = document.createElement("i");
        icon.classList.add("bx");
        icon.classList.add("bx-heart");

        button.appendChild(icon);
        div.appendChild(button);

        const container = document.createElement("div");
        container.classList.add("popup__txt");

        const titulo = document.createElement("h2");
        const contenido = document.createElement ("p");

        titulo.textContent =this.name;
        contenido.textContent =this.description;

        container.appendChild(titulo);
        container.appendChild(contenido);


        div.appendChild(container);

        return div;

    }
 

}


export const obtenerUrl = async () => {
const response = await fetch ("https://raw.githubusercontent.com/Lalauraph/Sanrio-Store/main/data.json");
const data = response.json();
console.log (data);
return data;
}
const obtenerUsuarios = () => {
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