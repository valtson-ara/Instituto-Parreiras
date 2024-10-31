import { postNonCompliance } from "./script.js"

/* Faz a validação das informações inseridas nos inputs*/
export async function validation (resultTitle, resultDescription,resultOrigin, title, description, origin) {
    /* obtém a data atual */
    const hoje = new Date()
    const dia = String(hoje.getDate()).padStart(2, '0')
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const ano = hoje.getFullYear()
    const dataFormatada = `${dia}/${mes}/${ano}`


    if (!resultTitle && !resultDescription && !resultOrigin) {

        /*salva os tipos de não conformidades*/
        const responseType = await fetch("http://localhost:3000/tipos_nao_conformidades", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: title
                }
            )
        })
        
        /* Salva os status das não conformidades */
        const responseStatus = await fetch("http://localhost:3000/status_nao_conformidades", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    nome: "pendente"
                }
            )
        })
    
        const resultStatus = await responseStatus.json()
        const resultType = await responseType.json()

        const dataObject = {
            assunto: title,
            descricao: description,
            data_abertura: dataFormatada,
            origem_nao_conformidade: origin,
            tipo_nao_conformidade_id: resultType.id,
            status_id: resultStatus.id
        }

        postNonCompliance(dataObject)
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
}







