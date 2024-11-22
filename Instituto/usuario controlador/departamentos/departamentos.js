document.addEventListener('DOMContentLoaded', function() {
    // User Permissions Modal
    const modal = document.getElementById('userPermissionsModal');
    const btnLogin = document.querySelector('.btn-login');
    const span = document.getElementsByClassName('close')[0];
    const profileOptionsModal = document.getElementById('profile-options-modal');
    const linkBranco = document.querySelector('.link-branco');

    let users = [
        { id: 1, name: 'João Silva', type: 'Administrador', status: 'Ativo' },
        { id: 2, name: 'Maria Santos', type: 'Usuário', status: 'Ativo' },
        { id: 3, name: 'Pedro Oliveira', type: 'Moderador', status: 'Inativo' }
    ];

    // User Permissions Modal Functionality
    if (btnLogin) {
        btnLogin.onclick = function() {
            modal.style.display = 'block';
            renderUsers(users);
        }
    }

    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    const searchInput = document.getElementById('searchUser');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.type.toLowerCase().includes(searchTerm) ||
                user.status.toLowerCase().includes(searchTerm)
            );
            renderUsers(filteredUsers);
        });
    }

    function renderUsers(usersToRender) {
        const tbody = document.querySelector('#userTable tbody');
        if (tbody) {
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

    // New Mobile Menu Functionality
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';

        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Profile Options Modal
    if (linkBranco && profileOptionsModal) {
        linkBranco.addEventListener('click', function(e) {
            e.preventDefault();
            profileOptionsModal.style.display = 'flex';
        });

        document.addEventListener('click', function(e) {
            if (e.target === profileOptionsModal) {
                profileOptionsModal.style.display = 'none';
            }
        });
    }
});
