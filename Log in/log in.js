const render = () => {
    const formulario = document.querySelector("#iniciar-sesion");
    
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log (email,password);
    });
    
    const inputEmail = document.querySelector("#email");
    inputEmail.addEventListener("input", (e) => {
        console.log(e.target.value);  //capturar un evento en vivo
    })
    
    }
    
    //cargar el javascript cuando ya se tiene todo en html y en css
    window.onload = render;