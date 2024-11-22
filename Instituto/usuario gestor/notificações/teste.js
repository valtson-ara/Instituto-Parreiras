document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');
    const btnLogin = document.querySelector('.btn-login');
    const linkBranco = document.querySelector('.link-branco');
    const profileModal = document.getElementById('profile-options-modal');

    // Configuração do menu mobile
    mobileBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu mobile quando clicar fora
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Função para mostrar o modal de perfil
    function showProfileModal() {
        profileModal.style.display = 'block';
        
        // Posicionar o modal abaixo do botão de usuário
        const btnRect = btnLogin.getBoundingClientRect();
        profileModal.style.top = (btnRect.bottom + window.scrollY) + 'px';
        profileModal.style.right = '20px'; // Ajuste conforme necessário
    }

    // Função para esconder o modal de perfil
    function hideProfileModal() {
        profileModal.style.display = 'none';
    }

    // Evento de clique no botão de login
    btnLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showProfileModal();
    });

    // Evento de clique no link "Olá, Administrador"
    linkBranco.addEventListener('click', function(e) {
        e.preventDefault();
        showProfileModal();
    });

    // Fechar o modal quando clicar fora dele
    document.addEventListener('click', function(event) {
        if (!profileModal.contains(event.target) && 
            !btnLogin.contains(event.target) && 
            !linkBranco.contains(event.target)) {
            hideProfileModal();
        }
    });

    // Adicionar eventos de clique nas opções do perfil
    const profileOptions = document.querySelectorAll('.profile-options li');
    profileOptions.forEach(option => {
        option.addEventListener('click', function() {
            switch(this.textContent) {
                case 'Meu Perfil':
                    // Implementar ação para Meu Perfil
                    console.log('Acessando Meu Perfil');
                    break;
                case 'Configurações':
                    // Implementar ação para Configurações
                    console.log('Acessando Configurações');
                    break;
                case 'Sair':
                    // Implementar ação para Sair
                    if(confirm('Deseja realmente sair?')) {
                        window.location.href = 'pagina-de-login.html'; // Ajuste o URL conforme necessário
                    }
                    break;
            }
            hideProfileModal();
        });
    });

    // Adicionar hover effect nas opções do perfil
    profileOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.cursor = 'pointer';
        });
        option.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Prevenir que o modal feche quando clicar dentro dele
    profileModal.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Tornar os itens do menu clicáveis
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                alert('Esta página está em construção');
            }
        });
    });
});

// Adicionar funcionalidade de responsividade
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobile_menu');
    if (window.innerWidth > 768) { // Ajuste este valor conforme seu breakpoint
        mobileMenu.classList.remove('active');
    }
});