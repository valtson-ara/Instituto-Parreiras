import { postValues } from "./script.js"

/* validar as informações inseridas nos inputs*/
export async function validation (password, email, resultEmail, resultPasword,analiseEmail) {

    try {
        const response = await fetch("http://localhost:8080/api/users", {
            method: 'GET',
            credentials: 'include'
        })

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        const invalidEmail = document.getElementById("invalid-email")
        const invalidPassword = document.getElementById("invalid-password")
        const invalidPasswordConfirm = document.getElementById("invalid-confirm-password")
        
        if (email !== "") {
            resultEmail = email.match(/\S+@\S+\.\S+/)[0].length !== 0

            response.json().then(res => {
                
                res.forEach(value => {

                    if (value.email === email) {
                         analiseEmail = false
                    }

                 })

                 if (resultPasword && resultEmail && analiseEmail) {
            
                    postValues(formData)
                } 

                if (!resultEmail || !analiseEmail) {
                    invalidEmail.style.display = "inline"
                    document.getElementById("e-mail").style.border = "1px solid #c01405"
                }
            })

        } else {
            document.getElementById("invalid-email").style.display = "inline"
        }
        
        if (!resultPasword) {
            invalidPassword.style.display = "inline"
            document.getElementById("password").style.border = "1px solid #c01405"
            invalidPasswordConfirm.style.display = "inline"
            document.getElementById("password-confirm").style.border = "1px solid #c01405"
        }
        
    } catch (error) {
        console.log(`Ocorreu um ${error}`)
    }
}