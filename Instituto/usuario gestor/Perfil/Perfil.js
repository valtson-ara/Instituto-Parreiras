// Vanilla JavaScript
document.getElementById('editarPerfilBtn').addEventListener('click', function() {
    document.getElementById('editForm').style.display = 'block';
});

function salvarEdicoes() {
    const nome = document.getElementById('editNome').value;
    const email = document.getElementById('editEmail').value;
    const telefone = document.getElementById('editTelefone').value;
    const endereco = document.getElementById('editEndereco').value;
    const nascimento = document.getElementById('editNascimento').value;

    document.getElementById('nome').textContent = nome;
    document.getElementById('email').textContent = email;
    document.getElementById('telefone').textContent = telefone;
    document.getElementById('endereco').textContent = endereco;
    document.getElementById('nascimento').textContent = nascimento;

    document.getElementById('editForm').style.display = 'none';
}

function cancelarEdicao() {
    document.getElementById('editForm').style.display = 'none';
}

document.getElementById('limparHistoricoBtn').addEventListener('click', function() {
    const notificacoes = document.querySelectorAll('.Notificações h3');
    notificacoes.forEach(function(notificacao) {
        notificacao.style.display = 'none';
    });
    this.style.display = 'none';
});

document.getElementById('sair').addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// jQuery
$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('#mobile_menu, #mobile_btn').length) {
            $('#mobile_menu').removeClass('active');
        }
    });

    $('.profile-header').on('click', function() {
        $('.profile-dropdown').toggleClass('active');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.profile-dropdown').length) {
            $('.profile-dropdown').removeClass('active');
        }
    });

    $('.link-branco').on('click', function(e) {
        e.preventDefault();
        $('#profile-options-modal').fadeIn(300);
    });

    $(document).on('click', function(e) {
        if ($(e.target).hasClass('profile-options-modal')) {
            $('#profile-options-modal').fadeOut(300);
        }
    });
});