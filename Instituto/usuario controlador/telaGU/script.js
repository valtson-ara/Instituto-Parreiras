function alterarStatus(status) {
  // Aqui podemos enviar a escolha para o backend com uma requisição
  // fetch('/api/alterarStatus', { method: 'POST', body: JSON.stringify({ status }) });

  // Exibe mensagem na página sobre a ação escolhida
    // Mensagem que indica o status do usuário
    const mensagemStatus = document.getElementById('mensagemStatus');
    // Verifica o status e exibe a mensagem apropriada
    if (status === 'ativo') {
      mensagemStatus.textContent = "Usuário ativado com sucesso! ✓";
      mensagemStatus.style.color = "green";
    } else {
      mensagemStatus.textContent = "Usuário desativado com sucesso! ✗";
      mensagemStatus.style.color = "red";
    }
  }

// Funcionalidade do menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.getElementById('mobile_btn');
  const mobileMenu = document.getElementById('mobile_menu');
  
  mobileBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
      if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
      }
  });
});

// Funcionalidade do modal de perfil
document.addEventListener('DOMContentLoaded', function() {
  const btnLogin = document.querySelector('.btn-login');
  const profileModal = document.getElementById('profile-options-modal');
  const btnSair = document.getElementById('sair');

  btnLogin.addEventListener('click', function(e) {
      e.preventDefault();
      profileModal.style.display = 'flex';
  });

  // Fechar modal ao clicar fora
  profileModal.addEventListener('click', function(e) {
      if (e.target === profileModal) {
          profileModal.style.display = 'none';
      }
  });

  // Funcionalidade de logout
  btnSair.addEventListener('click', function(e) {
      e.preventDefault();
      // Aqui você pode adicionar a lógica de logout
      window.location.href = 'pagina-de-login.html';
  });
});

// Gerenciamento de usuários
class UserManager {
  constructor() {
      this.users = [];
  }

  addUser(nome, funcao, descricao, efetivo) {
      const user = {
          id: Date.now(),
          nome,
          funcao,
          descricao,
          efetivo,
          ativo: true
      };
      this.users.push(user);
      this.saveUsers();
      return user;
  }

  updateUser(id, userData) {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
          this.users[index] = { ...this.users[index], ...userData };
          this.saveUsers();
          return true;
      }
      return false;
  }

  deleteUser(id) {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
          this.users.splice(index, 1);
          this.saveUsers();
          return true;
      }
      return false;
  }

  getUsers() {
      return this.users;
  }

  saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users));
  }

  loadUsers() {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
          this.users = JSON.parse(savedUsers);
      }
  }
}

// Inicializar gerenciamento de usuários
const userManager = new UserManager();
userManager.loadUsers();

// Adicionar eventos aos formulários
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(form);
          
          userManager.addUser(
              formData.get('nome'),
              formData.get('funcao'),
              formData.get('descricao'),
              formData.get('efetivo') === 'true'
          );
          
          form.reset();
      });
  });
});
