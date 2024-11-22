// Função para mostrar o formulário de edição de perfil
document.getElementById('editarPerfilBtn').addEventListener('click', function() {
    // Mostrar o formulário de edição
    document.getElementById('editForm').style.display = 'block';
});

// Função para salvar as edições feitas no formulário
function salvarEdicoes() {
    const nome = document.getElementById('editNome').value;
    const email = document.getElementById('editEmail').value;
    const telefone = document.getElementById('editTelefone').value;
    const endereco = document.getElementById('editEndereco').value;
    const nascimento = document.getElementById('editNascimento').value;

    // Atualizar as informações no perfil
    document.getElementById('nome').textContent = nome;
    document.getElementById('email').textContent = email;
    document.getElementById('telefone').textContent = telefone;
    document.getElementById('endereco').textContent = endereco;
    document.getElementById('nascimento').textContent = nascimento;

    // Fechar o formulário de edição
    document.getElementById('editForm').style.display = 'none';
}

// Função para cancelar a edição e fechar o formulário
function cancelarEdicao() {
    document.getElementById('editForm').style.display = 'none';
}

// Função para limpar histórico de notificações
document.getElementById('limparHistoricoBtn').addEventListener('click', function() {
    const notificacoes = document.querySelectorAll('.Notificações h3');
    notificacoes.forEach(function(notificacao) {
        notificacao.style.display = 'none'; // Esconde as notificações
    });
    this.style.display = 'none'; // Esconde o botão de limpar histórico
});
