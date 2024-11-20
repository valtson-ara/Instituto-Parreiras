import { postNonCompliance } from "./script.js"
import { createList } from "./table.js"

/* Faz a validação das informações inseridas nos inputs*/
export async function validation (resultTitle, resultDescription, resultOrigin, resultDepartment, resultSeverity, title, description, origin, department, severity) {
    /* obtém a data atual */
    const now = new Date()
    const dataFormatada = now.toLocaleString('sv-SE').replace(' ', 'T')

    if (!resultTitle && !resultDescription && !resultOrigin && !resultDepartment && !resultSeverity) {

        let departmentValue = false

        let nameSeverity
        if (severity.value === 'verde') {
            nameSeverity = 'pouco severo'
        } else if (severity.value === 'amarelo') {
            nameSeverity = 'severo'
        } else if (severity.value === 'vermelho') {
            nameSeverity = 'muito severo'
        }

        const responseDepartment = await fetch("http://localhost:8080/api/departamentos", {
            method: "GET",
            credentials: 'include'
        })

        /*salva os tipos de não conformidades*/
        const responseType = await fetch("http://localhost:8080/api/tipos-nao-conformidade", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    descricao: description
                }
            )
        })
        
        /* Salva os status das não conformidades */
        const responseStatus = await fetch("http://localhost:8080/api/status-nao-conformidades", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: title,
                    descricao: description
                }
            )
        })

        /* Salva os graus de severidade das não conformidades */
        const responseSeverity = await fetch("http://localhost:8080/api/graus-severidade", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                cor: severity.value,
                nome: nameSeverity,
                descricao: description
            })
        })

        let indiceDepartment 

        const resultDepartment = await responseDepartment.json().then(res => res)
        const resultStatus = await responseStatus.json().then(res => res)
        const resultType = await responseType.json().then(res => res)
        const resultSeverity = await responseSeverity.json().then(res => res)

        resultDepartment.forEach((value, i) => {
            if (value.nome === department.toLowerCase()) {
                departmentValue = true
                indiceDepartment = i

            }
        })
        
        if (departmentValue) {

            const dataObject = {
                assunto: 1,
                departamentoId: resultDepartment[indiceDepartment].id,
                descricao: description,
                dataAbertura: dataFormatada,
                grausSeveridadeId: resultSeverity.id,
                origemNaoConformidade: origin,
                tipoNaoConformidadeId: resultType.id,
                statusId: resultStatus.id
            }

            postNonCompliance(dataObject)

            setTimeout(() => {
                createList()
            }, 1000 * 3)

        } else {
            document.getElementById("invalid-department").style.display = "inline"
            document.getElementById("department-non-compliance").style.border = "1px solid red"
        }

    }

    if (resultTitle) {
         document.getElementById("invalid-title").style.display = "inline"
         document.getElementById("title-non-compliance").style.border ="1px solid red"
    }

    if (resultDescription) {
        document.getElementById("invalid-description").style.display = "inline"
        document.getElementById("description-non-compliance").style.border = "1px solid red"
    }

    if (resultOrigin) {
         document.getElementById("invalid-origin").style.display = "inline"
         document.getElementById("origin-non-compliance").style.border = "1px solid red"
    }

    if (resultDepartment) {
        document.getElementById("invalid-department").style.display = "inline"
        document.getElementById("department-non-compliance").style.border = "1px solid red"
   }

    if (resultSeverity) {
        document.getElementById("invalid-severity").style.display = "inline"
   }
}







