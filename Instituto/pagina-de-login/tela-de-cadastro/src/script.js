import { validation } from "./validation.js"

/* Inicia a sessão */
const data = new URLSearchParams()
data.append('username', 'adm@adm');
data.append('password', '123');

async function authorization () {
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })

    console.log(response)
}

authorization()

/* Obter os inputs e fazer parte do processo de validação*/
function getValues () {
    document.getElementById("invalid-password").style.display = "none"
    document.getElementById("invalid-confirm-password").style.display = "none"
    document.getElementById("invalid-email").style.display = "none"
    document.getElementById("password").style.border = ""
    document.getElementById("e-mail").style.border = ""
    document.getElementById("password-confirm").style.border = ""

    const password = document.getElementById("password").value
    const email = document.getElementById("e-mail").value
    const passwordConfirm = document.getElementById("password-confirm").value
    const resultPasword = password === passwordConfirm && password.length > 5
    let resultEmail
    let analiseEmail = true
    
    validation(password, email, resultEmail, resultPasword, analiseEmail)
}

/* salvar as informações no banco de dados */
export async function postValues (dataObject) {

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: 'POST',
            credentials: 'include',
            body: dataObject
        })

        const responseLogout = await fetch("http://localhost:8080/logout", {
            method: 'POST',
            credentials: 'include',
        })

        window.location.href = "../tela-de-login/index.html"

    } catch (error) {
        console.log(`Ocorreu um ${error}`)
    }

}

/* adicionar o evento submit no formulário */
document.querySelector("form").addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    getValues()
})



