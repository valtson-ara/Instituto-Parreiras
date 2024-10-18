import { postValues } from "./script.js"

/* validar as informações inseridas nos inputs*/
export async function validation (name, password, email, department, resultEmail, resultPasword, rersultName, resultDepartment) {

    const response = await fetch("http://localhost:3000/department").then((v) => v.json())
    response.forEach(value => {
        if (value.name === department.toLowerCase()) {
            resultDepartment = value.name === department.toLowerCase()
        }
        return resultDepartment
     })
     
     console.log(resultDepartment)

     const invalidName = document.getElementById("invalid-name")
     const invalidDepartment =  document.getElementById("invalid-department")
     const invalidEmail = document.getElementById("invalid-email")
     const invalidPassword = document.getElementById("invalid-password")
     const invalidPasswordConfirm = document.getElementById("invalid-confirm-password")
    
    if (email !== "") {
        resultEmail = email.match(/\S+@\S+\.\S+/)[0].length !== 0
    } else {
        document.getElementById("invalid-email").style.display = "inline"
    }

    if (resultPasword && rersultName && resultEmail && resultDepartment) {

        const dataObject = {
            name: name,
            password: password,
            email: email,
            department: department
        }
        
        postValues(dataObject)

    } else if (!resultPasword) {
        invalidPassword.style.display = "inline"
        document.getElementById("password").style.border = "1px solid #c01405"
        invalidPasswordConfirm.style.display = "inline"
        document.getElementById("password-confirm").style.border = "1px solid #c01405"
    }

    if (!resultEmail) {
        invalidEmail.style.display = "inline"
        document.getElementById("e-mail").style.border = "1px solid #c01405"
    }

    if (!rersultName) {
        invalidName.style.display = "inline"
        document.getElementById("name-complet").style.border = "1px solid #c01405"
    }

    if (!resultDepartment) {
         invalidDepartment.style.display = "inline"
         document.getElementById("department").style.border = "1px solid #c01405"
    }
}