 async function alterarStatus(status) {
  let idUser

  const email = document.getElementById('email').value

  const responseUser = await fetch("http://localhost:8080/api/users", {
    method: 'GET',
    credentials: 'include'
  })

  const resultUser = await responseUser.json().then(res => res) 

  resultUser.forEach(value => {
    if (value.email === email) {
      idUser = value.id
    } 
  })

  if (idUser === undefined) {
    alert('usuário não existe!')
  } else {

    const response = await fetch(`http://localhost:8080/api/users/${idUser}/roles`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify([
        "ADMIN"
      ])
    })
  
    console.log(response)
  
    document.getElementById('email').value = ''

  }

}


document.getElementById('efetivo1L').addEventListener('click', () => {
  alterarStatus()
})