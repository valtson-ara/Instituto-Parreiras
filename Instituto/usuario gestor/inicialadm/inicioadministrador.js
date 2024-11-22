document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('userPermissionsModal');
    const btnLogin = document.querySelector('.btn-login');
    const span = document.getElementsByClassName('close')[0];

    let users = [
        { id: 1, name: 'João Silva', type: 'Administrador', status: 'Ativo' },
        { id: 2, name: 'Maria Santos', type: 'Usuário', status: 'Ativo' },
        { id: 3, name: 'Pedro Oliveira', type: 'Moderador', status: 'Inativo' }
    ];

    btnLogin.onclick = function() {
        modal.style.display = 'block';
        renderUsers(users);
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.getElementById('searchUser').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.type.toLowerCase().includes(searchTerm) ||
            user.status.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    function renderUsers(usersToRender) {
        const tbody = document.querySelector('#userTable tbody');
        tbody.innerHTML = '';

        usersToRender.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.type}</td>
                <td class="status-${user.status.toLowerCase()}">${user.status}</td>
                <td class="user-actions">
                    <button class="btn-edit" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.editUser = function(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        const newType = prompt('Novo tipo de usuário:', user.type);
        const newStatus = prompt('Novo status (Ativo/Inativo):', user.status);

        if (newType && newStatus) {
            user.type = newType;
            user.status = newStatus;
            renderUsers(users);
        }
    }

    window.deleteUser = function(userId) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            users = users.filter(u => u.id !== userId);
            renderUsers(users);
        }
    }
});

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


document.getElementById('sair').addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: 'include',
    })
})