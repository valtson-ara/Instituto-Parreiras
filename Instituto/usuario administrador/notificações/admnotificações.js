const form = document.querySelector('.box-preferencia form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Validação dos campos (exemplo)
  const email = document.getElementById('email').value;
  if (!isValidEmail(email)) {
    alert('Por favor, insira um endereço de e-mail válido.');
    return;
  }

  // Envia os dados do formulário para o servidor (se necessário)
  // ...
});
function adicionarNotificacao(tipo, data, descricao) {
    // Cria um novo elemento div para representar a notificação
    const novaNotificacao = document.createElement('div');
    novaNotificacao.classList.add('notificacao');
    // ... (adiciona o conteúdo da notificação ao elemento)
    // Adiciona a nova notificação a um container específico
    const containerNotificacoes = document.getElementById('container-notificacoes');
    containerNotificacoes.appendChild(novaNotificacao);
  }
  function marcarComoLida(notificacao) {
    notificacao.classList.add('lida');
    // ... (atualiza o status da notificação no banco de dados, se necessário)
  }
  function filtrarNotificacoes(filtro) {
    const todasNotificacoes = document.querySelectorAll('.notificacao');
    todasNotificacoes.forEach(notificacao => {
      if (notificacao.dataset.tipo === filtro) {
        notificacao.style.display = 'block';
      } else {
        notificacao.style.display = 'none';
      }
    });
  }
  // ... (código JavaScript existente)

// Função para carregar as notificações do servidor (simulando aqui)
function carregarNotificacoes() {
    // ... (lógica para buscar as notificações no servidor)
    const notificacoes = [
      { tipo: 'alta', data: '2023-11-23', descricao: 'Notificação de alta prioridade' },
      // ...
    ];
  
    // Adiciona as notificações ao DOM
    notificacoes.forEach(notificacao => {
      adicionarNotificacao(notificacao.tipo, notificacao.data, notificacao.descricao);
    });
  }
  
  // Carrega as notificações ao carregar a página
  carregarNotificacoes();
  
  // ... (outros event listeners e funções)