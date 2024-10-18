import { validation } from "./validation.js"

/* Obter os inputs e fazer parte do processo de validação*/
function getValues () {
    document.getElementById("invalid-password").style.display = "none"
    document.getElementById("invalid-confirm-password").style.display = "none"
    document.getElementById("invalid-email").style.display = "none"
    document.getElementById("invalid-name").style.display = "none"
    document.getElementById("invalid-department").style.display = "none"
    document.getElementById("name-complet").style.border = ""
    document.getElementById("password").style.border = ""
    document.getElementById("e-mail").style.border = ""
    document.getElementById("password-confirm").style.border = ""
    document.getElementById("department").style.border = ""

    const name = document.getElementById("name-complet").value
    const password = document.getElementById("password").value
    const email = document.getElementById("e-mail").value
    const passwordConfirm = document.getElementById("password-confirm").value
    const department = document.getElementById("department").value
    const resultPasword = password === passwordConfirm && password.length > 5
    const rersultName = name.length !== 0
    let resultEmail
    let resultDepartment = false
    
    validation(name, password, email, department, resultEmail, resultPasword, rersultName, resultDepartment)
}

/* salvar as informações no banco de dados */
export async function postValues (dataObject) {
    const response = await fetch("http://localhost:3000/usuarios", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataObject)
    })
    
}

/* adicionar o evento submit no formulário */
document.querySelector("form").addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    getValues()
})