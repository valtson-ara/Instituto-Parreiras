import { validation } from "./validation.js"

/* Obtém os valores dos inputs e faz parte da validação */
function getValues () {
    document.getElementById("invalid-title").style.display = "none"
    document.getElementById("invalid-description").style.display = "none"
    document.getElementById("invalid-origin").style.display = "none"
    document.getElementById("invalid-department").style.display = "none"
    document.getElementById("invalid-severity").style.display = "none"

    document.getElementById("title-non-compliance").style.border =""
    document.getElementById("description-non-compliance").style.border = ""
    document.getElementById("origin-non-compliance").style.border = ""
    document.getElementById("department-non-compliance").style.border = ""

    const title = document.getElementById("title-non-compliance").value
    const description = document.getElementById("description-non-compliance").value
    const origin = document.getElementById("origin-non-compliance").value
    const department = document.getElementById("department-non-compliance").value
    const severity = document.querySelector('input[name="severidade"]:checked')
    
    const resultSeverity = severity === null
    const resultTitle = title === ""
    const resultDescription = description === ""
    const resultOrigin = origin === ""
    const resultDepartment = department === ""

    validation(resultTitle, resultDescription, resultOrigin, resultDepartment, resultSeverity, title, description, origin, department, severity)
}

/* Salva as não conformidades */
export async function postNonCompliance (dataObject) {
    const response = await fetch("http://localhost:8080/api/nao-conformidades", {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataObject)
    })
}

/* Adiciona o evento no formulário*/
document.querySelector("form").addEventListener("submit", (ev) => {
    ev.preventDefault()

    getValues()
})
