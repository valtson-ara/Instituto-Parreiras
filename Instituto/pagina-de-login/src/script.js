


function cadastrarUsuario() {
    // Novos campos
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone');
    const birthDateInput = document.getElementById('birth-date');
    const locationInput = document.getElementById('location');

    // Campos existentes
    const emailInput = document.getElementById('e-mail');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password-confirm');

    // Valores dos campos
    const fullName = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const birthDate = birthDateInput.value.trim();
    const location = locationInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validações adicionais podem ser feitas aqui

    if (password.length < 6 || password !== confirmPassword) {
        alert("As senhas devem ter no mínimo 6 caracteres e precisam ser iguais.");
        return;
    }

    // Recupera usuários registrados
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuariosRegistrados.some(user => user.email === email)) {
        alert("Este e-mail já está registrado!");
        return;
    }

    // Adiciona o novo usuário com todas as informações
    usuariosRegistrados.push({
        fullName,
        phone,
        birthDate,
        location,
        email,
        password
    });

    // Salva no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    alert("Usuário cadastrado com sucesso!");

    // Redireciona para a tela de login
    window.location.href = "../tela-de-login/index.html";
}



function logar() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuariosRegistrados.find(user => user.email === email && user.password === password);

    if (usuarioValido) {
        // Armazena o usuário logado no sessionStorage
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));

        alert("Login realizado com sucesso!");
        window.location.href = "../../usuario administrador/Residencia HOME/home.html";
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = "block";
        errorMessage.textContent = "E-mail ou senha inválidos.";
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const cadastroButton = document.getElementById('btn-form');
    const loginButton = document.querySelector('.button');

    if (cadastroButton) {
        cadastroButton.addEventListener('click', event => {
            event.preventDefault(); 
            cadastrarUsuario();
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', event => {
            event.preventDefault(); 
            logar();
        });
    }
});

