import { validation } from "./validation.js"

/* Obtém os valores dos inputs e faz parte da validação */
function getValues () {
    document.getElementById("invalid-title").style.display = "none"
    document.getElementById("invalid-description").style.display = "none"
    document.getElementById("invalid-origin").style.display = "none"

    document.getElementById("title-non-compliance").style.border =""
    document.getElementById("description-non-compliance").style.border = ""
    document.getElementById("origin-non-compliance").style.border = ""

    const title = document.getElementById("title-non-compliance").value
    const description = document.getElementById("description-non-compliance").value
    const origin = document.getElementById("origin-non-compliance").value

    const resultTitle = title === ""
    const resultDescription = description === ""
    const resultOrigin = origin === ""

    validation(resultTitle, resultDescription, resultOrigin, title, description, origin)
}

/* Salva as não conformidades */
export async function postNonCompliance (dataObject) {
    const response = await fetch("http://localhost:3000/nao_conformidades", {
        method: "POST",
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
