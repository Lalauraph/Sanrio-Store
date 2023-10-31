
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

      const image = document.createElement("img");
      image.src = this.url;
      image.classList.add("img-array")
      return image;
    }

}

export const obtenerUrl = async () => {
const response = await fetch ("https://raw.githubusercontent.com/Lalauraph/Sanrio-Store/main/data.json");
const data = response.json();
return data;
}