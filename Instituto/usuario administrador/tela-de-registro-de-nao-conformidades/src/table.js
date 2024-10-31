/* Cria os elementos da tabela das não conformidades registradas */
export async function createList () {

    const responseNonCompliance = await fetch("http://localhost:3000/nao_conformidades")
    const dataObject = await responseNonCompliance.json()

    dataObject.forEach(async (value) => {
        const response = await fetch(`http://localhost:3000/status_nao_conformidades/${value.status_id}`)
        const resultStatus = await response.json()
        

        const tr = document.createElement("tr")
        let arr = []
        for (let i = 1; i < 6; i++) {
            arr.push(document.createElement("td"))
        }

        arr[0].textContent = value.assunto
        arr[1].textContent = value.descricao
        arr[2].textContent = value.data_abertura
        arr[3].textContent = resultStatus.nome

        arr.forEach((valueTag) => {
            return tr.append(valueTag)
        })

        document.querySelector("table tbody").append(tr)
    })

}



