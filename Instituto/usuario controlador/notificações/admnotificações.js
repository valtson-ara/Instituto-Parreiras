document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileBtn.querySelector('i').classList.toggle('fa-bars');
            mobileBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when clicking outside
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
    const profileOptionsBtn = document.getElementById('profile-options-btn');
    const profileOptionsModal = document.getElementById('profile-options-modal');
    const linkBranco = document.querySelector('.link-branco');

    function toggleProfileModal() {
        profileOptionsModal.style.display = 
            profileOptionsModal.style.display === 'flex' ? 'none' : 'flex';
    }

    if (profileOptionsBtn) {
        profileOptionsBtn.addEventListener('click', toggleProfileModal);
    }

    if (linkBranco) {
        linkBranco.addEventListener('click', toggleProfileModal);
    }

    // Close modal when clicking outside
    if (profileOptionsModal) {
        profileOptionsModal.addEventListener('click', function(e) {
            if (e.target === profileOptionsModal) {
                profileOptionsModal.style.display = 'none';
            }
        });
    }

    // Profile Option Handlers
    const profileOptions = {
        'theme-option': () => alert('Funcionalidade de alteração de tema em desenvolvimento'),
        'profile-settings': () => alert('Configurações de perfil em desenvolvimento'),
        'notification-preferences': () => alert('Preferências de notificação em desenvolvimento'),
        'manage-permissions': () => alert('Gerenciamento de permissões em desenvolvimento'),
        'logout': () => alert('Funcionalidade de logout em desenvolvimento')
    };

    Object.entries(profileOptions).forEach(([id, handler]) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', handler);
        }
    });

    // Notification Form Handling
    const highPriorityForm = document.getElementById('high-priority-form');
    
    if (highPriorityForm) {
        highPriorityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const notificationText = document.getElementById('notificacao-alta').value;
            const notificationDate = document.getElementById('data-alta').value;
            const notificationDesc = document.getElementById('descricao-alta').value;
            
            if (!notificationText || !notificationDate || !notificationDesc) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Basic form submission simulation
            const notification = {
                text: notificationText,
                date: notificationDate,
                description: notificationDesc,
                priority: 'alta'
            };

            console.log('Notificação de alta prioridade:', notification);
            alert('Notificação enviada com sucesso!');
            highPriorityForm.reset();
        });
    }
});