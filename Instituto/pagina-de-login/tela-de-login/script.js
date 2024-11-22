function carregarEmail() {
    var emailSalvo = localStorage.getItem("email");
    if (emailSalvo) {
        document.getElementById("email").value = emailSalvo;
    }
}


async function logar() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var errorMessage = document.getElementById("error-message");

    const data = new URLSearchParams()
    data.append('username', email);
    data.append('password', senha);

    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })

    response.json().then(() => {

        console.log('deu certo')

    }).catch(() => {

        errorMessage.style.display = "block";
        errorMessage.innerText = "Email ou senha está incorreto.";

    })

    

    
        localStorage.setItem("email", email);

        window.location.href = "../Instituto/usuario-administrador/inicialadm/inicioadministrador.html"
}


