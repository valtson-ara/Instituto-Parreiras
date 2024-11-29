/* Cria os elementos da tabela das não conformidades registradas */
export async function createList () {

    document.querySelectorAll('table tr td').forEach(value => {
        value.remove()
    })

    const responseNonCompliance = await fetch("http://localhost:8080/api/nao-conformidades", {
        method: 'GET',
        credentials: 'include'
    })

    const dataObject = await responseNonCompliance.json().then(res => res)
    console.log(dataObject)

    dataObject.forEach(async (value) => {
        const response = await fetch(`http://localhost:8080/api/status-nao-conformidades/${value.statusId}`, {
            method: 'GET',
            credentials: 'include'
        })

        const resultStatus = await response.json().then(res => res)
        

        const tr = document.createElement("tr")
        let arr = []
        for (let i = 1; i < 6; i++) {
            arr.push(document.createElement("td"))
        }

        arr[0].textContent = value.assunto
        arr[1].textContent = value.descricao
        arr[2].textContent = value.dataAbertura
        arr[3].textContent = resultStatus.nome

        arr.forEach((valueTag) => {
            return tr.append(valueTag)
        })

        document.querySelector("table tbody").append(tr)
    })

}



