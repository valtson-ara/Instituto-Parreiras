function createElements (informacoes) {
    let arr = []
    let tr = document.createElement('tr')

    for (let i = 0; i < 5; i++) {
        arr.push(document.createElement('td'))
    }

    informacoes.forEach((value, i) => {
        if (i < 4) {
            arr[i].textContent = value
        } else {
            arr[i].appendChild(value)
        }
    })

    arr.forEach(value => {
        tr.appendChild(value)
    })

    document.querySelector('tbody').appendChild(tr)
}


async function requisicao() {
    const response = await fetch('http://localhost:8080/api/nao-conformidades', {
        method: 'GET',
        credentials: 'include'
    })

    const resultNaoConformidades = await response.json().then(res => res)

    resultNaoConformidades.forEach( async value => {
        const responseStatus = await fetch(`http://localhost:8080/api/status-nao-conformidades/${value.statusId}`, {
            method: 'GET',
            credentials: 'include'
        })
    
        const responseDepartamentos = await fetch(`http://localhost:8080/api/departamentos/${value.departamentoId}`, {
            method: 'GET',
            credentials: 'include'
        })
    
    
        const resultDepartamentos = await responseDepartamentos.json().then(res => res)
        const resultStatus = await responseStatus.json().then(res => res)
        const button = document.createElement('button')
        button.id = value.id
        button.textContent = 'excluir'
            button.addEventListener('click', async () => {
                const responseDelete = await fetch(`http://localhost:8080/api/nao-conformidades/${value.id}`, {
                    method: 'DELETE', 
                    credentials: 'include'
                })

                location.reload()
            })
    
    
        const arr = [value.id, value.descricao, resultDepartamentos.nome, resultStatus.nome, button]
        createElements(arr)

    })
    
}

requisicao()