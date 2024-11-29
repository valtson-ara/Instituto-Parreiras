
const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (usuarioLogado) {
   
    document.getElementById('nome').textContent = usuarioLogado.fullName;
    document.getElementById('email').textContent = usuarioLogado.email;
    document.getElementById('telefone').textContent = usuarioLogado.phone;
    document.getElementById('endereco').textContent = usuarioLogado.location;
    document.getElementById('nascimento').textContent = usuarioLogado.birthDate;


    document.getElementById('editNome').value = usuarioLogado.fullName;
    document.getElementById('editEmail').value = usuarioLogado.email;
    document.getElementById('editTelefone').value = usuarioLogado.phone;
    document.getElementById('editEndereco').value = usuarioLogado.location;
    document.getElementById('editNascimento').value = usuarioLogado.birthDate;
} else {

    window.location.href = "../tela-de-login/index.html";
}

document.getElementById('editarPerfilBtn').addEventListener('click', function() {
    
    document.getElementById('editForm').style.display = 'block';
});


function salvarEdicoes() {
    const nome = document.getElementById('editNome').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const telefone = document.getElementById('editTelefone').value.trim();
    const endereco = document.getElementById('editEndereco').value.trim();
    const nascimento = document.getElementById('editNascimento').value.trim();


    document.getElementById('nome').textContent = nome;
    document.getElementById('email').textContent = email;
    document.getElementById('telefone').textContent = telefone;
    document.getElementById('endereco').textContent = endereco;
    document.getElementById('nascimento').textContent = nascimento;

    usuarioLogado.fullName = nome;
    usuarioLogado.email = email;
    usuarioLogado.phone = telefone;
    usuarioLogado.location = endereco;
    usuarioLogado.birthDate = nascimento;

    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    // Também atualiza as informações no localStorage para persistência
    atualizarUsuarioNoLocalStorage(usuarioLogado);


    document.getElementById('editForm').style.display = 'none';
}

function atualizarUsuarioNoLocalStorage(usuarioAtualizado) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const indiceUsuario = usuariosRegistrados.findIndex(user => user.email === usuarioAtualizado.email);

    if (indiceUsuario !== -1) {
        usuariosRegistrados[indiceUsuario] = usuarioAtualizado;
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    }
}


function cancelarEdicao() {
    document.getElementById('editForm').style.display = 'none';
}


document.getElementById('limparHistoricoBtn').addEventListener('click', function() {
    const notificacoes = document.querySelectorAll('.Notificações h3');
    notificacoes.forEach(function(notificacao) {
        notificacao.style.display = 'none'; // Esconde as notificações
    });
    this.style.display = 'none'; // Esconde o botão de limpar histórico
});

